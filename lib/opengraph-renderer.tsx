import { ImageResponse } from 'next/og'
import fs from 'fs'
import path from 'path'

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export async function createImageResponse(t: any) {
  const imagePath = path.join(process.cwd(), 'public', 'martijn-portrait-work.png')
  const imageBuffer = fs.readFileSync(imagePath)
  const base64Image = imageBuffer.toString('base64')
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
                fontSize: '38px',
                fontWeight: 600,
                lineHeight: 1.2,
                color: '#6a462b',
                marginBottom: '28px',
                display: 'flex',
              }}
            >
              {t.profile.role}
            </div>

            {/* Skills badges (site style) */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                marginBottom: '28px',
              }}
            >
              {t.profile.skills.map((skill: string) => (
                <div
                  key={skill}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '4px 12px',
                    backgroundColor: 'rgba(106, 70, 43, 0.1)',
                    borderRadius: '9999px',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#6a462b',
                  }}
                >
                  {skill}
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div
              style={{
                display: 'flex',
                padding: '12px 24px',
                backgroundColor: '#f37d07',
                borderRadius: '8px',
                fontSize: '18px',
                fontWeight: 600,
                color: '#ffffff',
                alignSelf: 'flex-start',
                boxShadow:
                  '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
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
