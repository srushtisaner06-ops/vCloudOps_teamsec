import fs from 'fs';
import sharp from 'sharp';

const userUploadedPath = 'C:\\Users\\Sanskar\\.gemini\\antigravity-ide\\brain\\c452d1d1-d203-4593-8987-2baaf5ed4117\\.user_uploaded\\media_1791221859688.png';

// 1. Copy user original to public/Logo/aws-chip-original.png
fs.copyFileSync(userUploadedPath, 'public/Logo/aws-chip-original.png');
console.log('Copied raw uploaded image to public/Logo/aws-chip-original.png');

// 2. Vector SVG with viewBox="0 0 9 9"
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9 9" width="100%" height="100%" fill="none">
  <path fill="#FF9900" fill-rule="evenodd" d="M2 0h1v1h1V0h1v1h1V0h1v2H2V0z M2 7h5v2H6V8H5v1H4V8H3v1H2V7z M2 2v5H0V6h1V5H0V4h1V3H0V2h2z M7 2h2v1H8v1h1v1H8v1h1v1H7V2z"/>
</svg>
`;

fs.writeFileSync('public/Logo/aws-logo.svg', svgContent, 'utf-8');
fs.writeFileSync('public/Logo/aws-favicon.svg', svgContent, 'utf-8');
console.log('Wrote public/Logo/aws-logo.svg and public/Logo/aws-favicon.svg');

// 3. Render 512x512 PNG with a tiny 16px safe margin (viewBox with 3% margin: 9 * 512 / 480 = 9.6)
// To keep 16px transparent margin on a 512px canvas (width 480, margin 16):
// x0 = -16 * 9 / 480 = -0.3, y0 = -0.3, w = 512 * 9 / 480 = 9.6
const paddedSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-0.3 -0.3 9.6 9.6" width="512" height="512">
  <path fill="#FF9900" fill-rule="evenodd" d="M2 0h1v1h1V0h1v1h1V0h1v2H2V0z M2 7h5v2H6V8H5v1H4V8H3v1H2V7z M2 2v5H0V6h1V5H0V4h1V3H0V2h2z M7 2h2v1H8v1h1v1H8v1h1v1H7V2z"/>
</svg>
`;

async function main() {
  const png512 = await sharp(Buffer.from(paddedSvg))
    .resize(512, 512)
    .png()
    .toBuffer();

  fs.writeFileSync('public/Logo/aws-logo-white.png', png512);
  fs.writeFileSync('public/Logo/aws-icon.png', png512);
  console.log('Wrote public/Logo/aws-logo-white.png and public/Logo/aws-icon.png (512x512)');

  // 4. Generate favicons
  const svgBadge = `
<svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <rect x="1" y="1" width="62" height="62" rx="14" fill="#0B132B" stroke="#FF9900" stroke-width="2" stroke-opacity="0.8"/>
</svg>
`;

  const resizedForBadge = await sharp(png512)
    .resize(44, 44, { fit: 'inside' })
    .toBuffer();

  await sharp(Buffer.from(svgBadge))
    .composite([{ input: resizedForBadge, gravity: 'center' }])
    .png()
    .toFile('public/Logo/aws-favicon-badge.png');

  await sharp(png512)
    .resize(32, 32, { fit: 'inside' })
    .png()
    .toFile('public/Logo/aws-favicon-32.png');

  console.log('Generated favicons successfully!');
}

main().catch(console.error);
