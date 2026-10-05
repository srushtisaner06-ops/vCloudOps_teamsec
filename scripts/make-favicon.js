import sharp from 'sharp'

async function generateFavicons() {
  const svgBadge = `
<svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <rect x="1" y="1" width="62" height="62" rx="14" fill="#0B132B" stroke="#FF9900" stroke-width="2" stroke-opacity="0.8"/>
</svg>
`

  const resizedLogo = await sharp('public/Logo/aws-logo-white.png')
    .resize(48, 48, { fit: 'inside' })
    .toBuffer()

  await sharp(Buffer.from(svgBadge))
    .composite([{ input: resizedLogo, gravity: 'center' }])
    .png()
    .toFile('public/Logo/aws-favicon-badge.png')

  await sharp('public/Logo/aws-logo-white.png')
    .resize(32, 32, { fit: 'inside' })
    .png()
    .toFile('public/Logo/aws-favicon-32.png')

  console.log('Favicons generated successfully!')
}

generateFavicons().catch(console.error)
