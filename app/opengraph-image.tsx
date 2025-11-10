import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Martijn van der Wijst - Tech Lead UX & Design Systems';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          backgroundColor: '#d7eee1',
          padding: '80px 100px 80px 220px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          position: 'relative',
        }}
      >
        {/* Decorative element top-left - behind icon */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '400px',
            height: '400px',
            background: 'linear-gradient(135deg, #E5A952 0%, #D4974F 100%)', // primary color gradient
            opacity: 0.15,
            borderRadius: '0 0 200px 0',
            display: 'flex',
          }}
        />

        {/* Decorative element bottom-right */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: '300px',
            height: '300px',
            background: 'linear-gradient(135deg, #C89142 0%, #B88038 100%)', // darker primary tint
            opacity: 0.12,
            borderRadius: '200px 0 0 0',
            display: 'flex',
          }}
        />

        {/* Icon/Badge */}
            {/* Icon - Banana emoji in rounded square */}
            <div
              style={{
                position: 'absolute',
                top: '60px',
                left: '60px',
                width: '120px',
                height: '120px',
                backgroundColor: '#D49C50',
                borderRadius: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '72px',
              }}
            >
              🍌
            </div>        {/* Main heading */}
        <div
          style={{
            fontSize: '72px',
            fontWeight: 700,
            lineHeight: 1.1,
            color: '#6a462b',
            marginBottom: '24px',
            display: 'flex',
            maxWidth: '900px',
            marginTop: '40px',
          }}
        >
          Martijn van der Wijst
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: '40px',
            fontWeight: 500,
            lineHeight: 1.3,
            color: '#6a462b',
            marginBottom: '16px',
            display: 'flex',
            maxWidth: '900px',
            marginTop: '8px',
          }}
        >
          Tech Lead UX, Frontend & Design Systems
        </div>

        {/* Tags */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap',
            marginTop: '8px',
          }}
        >
          {['Design Systems', 'Accessibility', 'Design Tokens', 'UX'].map((tag) => (
            <div
              key={tag}
              style={{
                display: 'flex',
                padding: '4px 12px',
                backgroundColor: 'rgba(106, 70, 43, 0.1)',
                borderRadius: '999px',
                fontSize: '20px',
                fontWeight: 500,
                color: '#6a462b',
                border: 'none',
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
