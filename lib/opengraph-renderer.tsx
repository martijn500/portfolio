import { ImageResponse } from 'next/og'

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export async function createImageResponse(t: any, baseUrl?: string) {
  let base64Image: string

  if (baseUrl) {
    // Edge runtime: fetch the public asset and convert to base64 using Web APIs
    const res = await fetch(`${baseUrl}/martijn-portrait-work.png`)
    const arrayBuffer = await res.arrayBuffer()
    // convert ArrayBuffer -> base64 (works in edge / browser)
    let binary = ''
    const bytes = new Uint8Array(arrayBuffer)
    const len = bytes.byteLength
    for (let i = 0; i < len; i++) binary += String.fromCharCode(bytes[i])
    // btoa is available in edge runtime; fallback to Buffer when available
    base64Image = typeof btoa === 'function' ? btoa(binary) : Buffer.from(arrayBuffer).toString('base64')
  } else {
    // Node runtime: read from filesystem (keeps previous behaviour)
    const { readFileSync } = await import('fs')
    const { join } = await import('path')
    const imagePath = join(process.cwd(), 'public', 'martijn-portrait-work.png')
    const imageBuffer = readFileSync(imagePath)
    base64Image = imageBuffer.toString('base64')
  }
  const dataUrl = `data:image/png;base64,${base64Image}`

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f0fff6',
          padding: '60px',
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#d7eee1',
            borderRadius: '24px',
            padding: '60px',
            width: '100%',
            height: '100%',
            boxShadow: 'inset 0 0 40px rgba(0, 0, 0, 0.08)',
          }}
        >
          {/* Left content: work heading, badges, CTA */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              maxWidth: '600px',
            }}
          >
            {/* Work heading (single line) */}
            <div
              style={{
                fontSize: '48px',
                fontWeight: 700,
                lineHeight: 1.15,
                color: '#6a462b',
                marginBottom: '36px',
                display: 'flex',
              }}
            >
              {t.profile.role}
            </div>

            {/* CTA Button (larger) */}
            <div
              style={{
                display: 'flex',
                padding: '18px 40px',
                backgroundColor: '#f37d07',
                borderRadius: '10px',
                fontSize: '28px',
                fontWeight: 700,
                color: '#ffffff',
                alignSelf: 'flex-start',
                boxShadow:
                  '0 8px 14px -4px rgba(0, 0, 0, 0.12), 0 4px 8px -4px rgba(0, 0, 0, 0.06)',
              }}
            >
              {t.hero?.ctaWork ?? 'View my work'}
            </div>
          </div>

          {/* Right - Portrait image */}
          <img
            src={dataUrl}
            alt={t.profile.name}
            width="450"
            height="630"
            style={{
              objectFit: 'contain',
              objectPosition: 'bottom',
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}

export default createImageResponse
