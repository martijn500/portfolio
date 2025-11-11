import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Martijn van der Wijst - Tech Lead UX, Frontend & Design Systems';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  // Fetch the portrait image
  const imageUrl = new URL('/martijn-portrait-work.png', 'https://martijnvanderwijst.nl').href;
  const imageData = await fetch(imageUrl).then((res) => res.arrayBuffer());
  const base64Image = Buffer.from(imageData).toString('base64');
  const dataUrl = `data:image/png;base64,${base64Image}`;

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
          fontFamily: 'ui-sans-serif, system-ui, sans-serif',
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
        {/* Left content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '600px',
          }}
        >
          {/* Main heading */}
          <div
            style={{
              fontSize: '72px',
              fontWeight: 600,
              lineHeight: 1.1,
              color: '#6a462b',
              marginBottom: '16px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div style={{ display: 'flex' }}>Hi, I'm Martijn</div>
            <div style={{ display: 'flex' }}>van der Wijst</div>
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: '32px',
              fontWeight: 400,
              lineHeight: 1.3,
              color: '#6a462b',
              opacity: 0.8,
              display: 'flex',
              marginBottom: '24px',
            }}
          >
            Tech Lead UX, Frontend & Design Systems
          </div>

          {/* CTA Button */}
          <div
            style={{
              display: 'flex',
              padding: '12px 24px',
              backgroundColor: '#f37d07',
              borderRadius: '8px',
              fontSize: '20px',
              fontWeight: 600,
              color: '#ffffff',
              alignSelf: 'flex-start',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            }}
          >
            View my work
          </div>
        </div>

        {/* Right - Portrait image */}
        <img
          src={dataUrl}
          alt="Martijn van der Wijst"
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
  );
}
