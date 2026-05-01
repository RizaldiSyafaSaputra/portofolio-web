import { ImageResponse } from 'next/og';
import { SITE_CONFIG } from '@/lib/utils/constants';

export const runtime = 'edge';
export const alt = SITE_CONFIG.name;
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
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000',
          backgroundImage: 'radial-gradient(circle at 25% 25%, #083344 0%, transparent 50%), radial-gradient(circle at 75% 75%, #1e1b4b 0%, transparent 50%)',
        }}
      >
        {/* Border Glow */}
        <div
          style={{
            position: 'absolute',
            inset: '40px',
            border: '2px solid rgba(34, 211, 238, 0.2)',
            borderRadius: '40px',
            display: 'flex',
          }}
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '80px',
            textAlign: 'center',
          }}
        >
          {/* Logo / Initial */}
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '20px',
              background: 'linear-gradient(to bottom right, #06b6d4, #2563eb)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '40px',
              fontWeight: '900',
              color: 'white',
              marginBottom: '40px',
              boxShadow: '0 20px 50px rgba(6, 182, 212, 0.3)',
            }}
          >
            R
          </div>

          <h1
            style={{
              fontSize: '70px',
              fontWeight: '900',
              color: 'white',
              marginBottom: '20px',
              letterSpacing: '-0.05em',
              lineHeight: 1.1,
            }}
          >
            {SITE_CONFIG.name}
          </h1>

          <p
            style={{
              fontSize: '32px',
              color: '#94a3b8',
              maxWidth: '800px',
              lineHeight: 1.4,
              fontWeight: '500',
            }}
          >
            {SITE_CONFIG.title}
          </p>

          <div
            style={{
              marginTop: '60px',
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
            }}
          >
            <div style={{ color: '#06b6d4', fontSize: '20px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
              {SITE_CONFIG.url.replace('https://', '')}
            </div>
          </div>
        </div>

        {/* Decorative Tech Elements */}
        <div style={{ position: 'absolute', bottom: '60px', left: '80px', width: '100px', height: '2px', background: 'rgba(34, 211, 238, 0.3)' }} />
        <div style={{ position: 'absolute', bottom: '60px', left: '80px', width: '2px', height: '40px', background: 'rgba(34, 211, 238, 0.3)' }} />
        <div style={{ position: 'absolute', top: '60px', right: '80px', width: '100px', height: '2px', background: 'rgba(34, 211, 238, 0.3)' }} />
        <div style={{ position: 'absolute', top: '60px', right: '80px', width: '2px', height: '40px', background: 'rgba(34, 211, 238, 0.3)' }} />
      </div>
    ),
    {
      ...size,
    }
  );
}
