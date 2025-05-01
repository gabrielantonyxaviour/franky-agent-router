import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Interface for the Agent response
interface Agent {
  id: string
  subname: string
  device_address: string
  // Add other fields as needed
}

// Interface for the Device response
interface Device {
  address: string
  ngrokUrl: string
  // Add other fields as needed
}

export async function middleware(request: NextRequest) {
  // Get hostname (e.g. subdomain.frankyagent.xyz)
  const hostname = request.headers.get('host') || ''
  
  // Check if we're on the main domain without subdomain
  if (hostname === 'frankyagent.xyz' || hostname === 'www.frankyagent.xyz') {
    return NextResponse.next()
  }

  try {
    // Extract subdomain
    const subdomain = hostname.split('.frankyagent.xyz')[0]
    
    if (!subdomain) {
      return NextResponse.next()
    }

    // 1. First fetch agent details using the subdomain
    const agentResponse = await fetch(
      `https://franky-hedera.vercel.app/api/db/agents?subname=${subdomain}`,
      { method: 'GET' }
    )

    if (!agentResponse.ok) {
      console.error(`Failed to fetch agent: ${agentResponse.statusText}`)
      return new NextResponse('Agent not found', { status: 404 })
    }

    const agent: Agent = await agentResponse.json()
    
    if (!agent || !agent.device_address) {
      console.error(`No agent found with subname: ${subdomain}`)
      return new NextResponse('Agent not found', { status: 404 })
    }

    // 2. Then fetch device details using the device address
    const deviceResponse = await fetch(
      `https://franky-hedera.vercel.app/api/db/devices?address=${agent.device_address}`,
      { method: 'GET' }
    )

    if (!deviceResponse.ok) {
      console.error(`Failed to fetch device: ${deviceResponse.statusText}`)
      return new NextResponse('Device not found', { status: 404 })
    }

    const device: Device = await deviceResponse.json()

    if (!device || !device.ngrokUrl) {
      console.error(`No device found with address: ${agent.device_address}`)
      return new NextResponse('Device not found', { status: 404 })
    }

    // Handle based on request method
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
            </style>
          </head>
          <body>
            <div class="container">
              <h1>Agent Interaction Instructions</h1>
              <p>To interact with this agent, please use Postman or any API client to make a POST request to:</p>
              <code>${device.ngrokUrl}</code>
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
    } else if (request.method === 'POST') {
      // For POST requests, proxy to the ngrok URL
      const response = await fetch(device.ngrokUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...request.headers,
        },
        body: request.body,
      })

      return response
    }

    // For other methods, return method not allowed
    return new NextResponse('Method not allowed', { status: 405 })

  } catch (error) {
    console.error('Middleware error:', error)
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