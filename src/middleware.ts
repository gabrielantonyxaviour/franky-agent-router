import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Interface for the Agent response
interface Agent {
  id: string
  subname: string
  deviceAddress: string
  agentAddress: string  // Added agentAddress field
  // Add other fields as needed
}

// Interface for the Device response
interface Device {
  address: string
  ngrokUrl: string
  status: string
}

export async function middleware(request: NextRequest) {
  try {
    // Get hostname (e.g. subdomain.frankyagent.xyz)
    const hostname = request.headers.get('host') || ''
    const url = request.nextUrl
    
    // Check if we're on the main domain without subdomain
    if (hostname === 'frankyagent.xyz' || hostname === 'www.frankyagent.xyz') {
      return NextResponse.next()
    }

    // Extract subdomain
    const subdomain = hostname.split('.frankyagent.xyz')[0]
    
    if (!subdomain) {
      return NextResponse.next()
    }

    // 1. First fetch agent by subname from Supabase
    const agentResponse = await fetch(
      `https://franky-hedera.vercel.app/api/db/agents?subname=${subdomain}`
    )

    if (!agentResponse.ok) {
      console.error(`Failed to fetch agent: ${agentResponse.status} ${agentResponse.statusText}`)
      return new NextResponse('Failed to fetch agent', { status: 500 })
    }

    const agent: Agent = await agentResponse.json()

    if (!agent || !agent.deviceAddress || !agent.agentAddress) {
      console.error(`No agent found with subname: ${subdomain}`)
      return new NextResponse('Agent not found', { status: 404 })
    }

    // 2. Then fetch device details using the device address
    const deviceResponse = await fetch(
      `https://franky-hedera.vercel.app/api/db/devices?address=${agent.deviceAddress}`
    )

    if (!deviceResponse.ok) {
      console.error(`Failed to fetch device: ${deviceResponse.status} ${deviceResponse.statusText}`)
      return new NextResponse('Failed to fetch device', { status: 500 })
    }

    const device: Device = await deviceResponse.json()

    if (!device || !device.ngrokUrl || device.status !== 'Active') {
      console.error(`Device not found or inactive for agent: ${subdomain}`)
      return new NextResponse('Device not found or inactive', { status: 404 })
    }

    console.log(`Found ngrok URL for ${subdomain}: ${device.ngrokUrl}`)

    if (request.method === 'GET') {
      // For GET requests, show instructions page
      return new NextResponse(
        `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Agent Instructions</title>
            <style>
              body {
                font-family: system-ui, -apple-system, sans-serif;
                max-width: 800px;
                margin: 0 auto;
                padding: 2rem;
                background: black;
                color: #00FF88;
              }
              .container {
                border: 1px solid #00FF88;
                border-radius: 8px;
                padding: 2rem;
                background: rgba(0, 255, 136, 0.05);
              }
              code {
                background: rgba(0, 255, 136, 0.1);
                padding: 0.2rem 0.4rem;
                border-radius: 4px;
                font-family: monospace;
              }
              .note {
                margin-top: 1rem;
                padding-top: 1rem;
                border-top: 1px solid rgba(0, 255, 136, 0.2);
                font-size: 0.9rem;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>Agent Instructions</h1>
              <p>To interact with this agent, please use Postman or any API client to make a POST request to:</p>
              <code>${request.url}</code>
              <p>Include your message in the request body as JSON:</p>
              <pre><code>{
  "message": "Your message here"
}</code></pre>
            </div>
          </body>
        </html>
        `,
        {
          headers: {
            'content-type': 'text/html',
          },
        }
      )
    }

    // For all other requests (POST, etc), rewrite to the ngrok URL
    const rewrittenUrl = new URL(device.ngrokUrl + url.pathname + url.search)

    // Create headers object from original request headers
    const headers = new Headers(request.headers)
    
    // Add or override the agent address header
    headers.set('agent-address', agent.agentAddress)

    // Create the rewrite response with the modified headers
    const response = NextResponse.rewrite(rewrittenUrl, {
      headers: headers,
    })

    return response

  } catch (error) {
    console.error('Error processing request:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * 1. /api/* (API routes)
     * 2. /_next/* (Next.js internals)
     * 3. /_static/* (inside /public)
     * 4. /_vercel/* (Vercel internals)
     * 5. /favicon.ico, /sitemap.xml (static files)
     */
    '/((?!api|_next|_static|_vercel|favicon.ico|sitemap.xml).*)',
  ],
} 