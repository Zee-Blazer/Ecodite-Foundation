import { ImageResponse } from 'next/og'

export const ogImageSize = { width: 1200, height: 630 }
export const ogImageContentType = 'image/png'

const GREEN_900 = '#10291B'
const GREEN_800 = '#17402A'
const SUN_500 = '#EE8B2B'
const CREAM = '#FAF7F0'
const SAGE_100 = 'rgba(227,236,219,0.7)'

async function loadFrauncesFont(text: string): Promise<ArrayBuffer | null> {
  try {
    const cssUrl = `https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600&text=${encodeURIComponent(text)}`
    const css = await fetch(cssUrl).then((res) => res.text())
    const match = css.match(/src: url\(([^)]+)\) format\('(?:opentype|truetype)'\)/)
    if (!match) return null
    const fontResponse = await fetch(match[1])
    if (fontResponse.status !== 200) return null
    return await fontResponse.arrayBuffer()
  } catch {
    return null
  }
}

export async function renderOgImage({
  eyebrow,
  title,
}: {
  eyebrow: string
  title: string
}) {
  const fontData = await loadFrauncesFont(title + eyebrow)

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '80px',
          background: `linear-gradient(135deg, ${GREEN_900} 0%, ${GREEN_800} 100%)`,
        }}
      >
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            top: 80,
            left: 80,
            fontSize: 22,
            fontFamily: 'sans-serif',
            fontWeight: 600,
            letterSpacing: 4,
            textTransform: 'uppercase',
            color: SUN_500,
          }}
        >
          Ecodite Foundation
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 20,
            fontFamily: 'sans-serif',
            fontWeight: 600,
            letterSpacing: 3,
            textTransform: 'uppercase',
            color: SAGE_100,
            marginBottom: 24,
          }}
        >
          {eyebrow}
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 64,
            lineHeight: 1.05,
            fontFamily: fontData ? 'Fraunces' : 'serif',
            fontWeight: 600,
            color: CREAM,
            maxWidth: 980,
          }}
        >
          {title}
        </div>
      </div>
    ),
    {
      ...ogImageSize,
      fonts: fontData
        ? [{ name: 'Fraunces', data: fontData, style: 'normal', weight: 600 }]
        : undefined,
    }
  )
}
