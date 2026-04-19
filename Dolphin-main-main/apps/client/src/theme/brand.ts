import { alpha } from '@mui/material/styles'

export const brand = {
  ink: '#3F2818',
  inkSoft: '#7A5A43',
  page: '#FFF8EA',
  cream: '#FFF1D6',
  sky: '#F3DDB0',
  aqua: '#FFF4DC',
  accent: '#F0CA73',
  gold: '#CD7637',
  line: '#E5C884',
  surface: '#FFFCF6',
  surfaceGlass: 'rgba(255,255,255,0.86)',
  success: '#56C0A5',
  warning: '#CD7637',
  danger: '#D14343',
  shadow: '0 24px 60px rgba(122, 68, 27, 0.14)',
}

export const brandFonts = {
  body: '"Poppins", ui-sans-serif, system-ui, sans-serif',
  display: '"Poppins", ui-sans-serif, system-ui, sans-serif',
}

export const brandGradients = {
  page: `
    radial-gradient(circle at 0% 0%, rgba(243, 209, 131, 0.34), transparent 28%),
    radial-gradient(circle at 100% 0%, rgba(205, 118, 55, 0.18), transparent 30%),
    linear-gradient(180deg, #FFF7E8 0%, #FFFCF6 30%, #FFF6E4 72%, #FFFDF8 100%)
  `,
  button: 'linear-gradient(135deg, #F3D183 0%, #CD7637 100%)',
  hero: 'linear-gradient(135deg, rgba(255, 247, 229, 0.95) 0%, rgba(255, 255, 255, 0.96) 46%, rgba(240, 202, 115, 0.56) 100%)',
  surface: 'linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(255,248,233,0.97) 100%)',
  softSurface: 'linear-gradient(180deg, rgba(255,255,255,0.94) 0%, rgba(255,244,220,0.96) 100%)',
  analytics: 'linear-gradient(145deg, rgba(255,241,214,0.84) 0%, rgba(255,255,255,0.94) 52%, rgba(243,209,131,0.64) 100%)',
}

export const brandEffects = {
  ring: `0 0 0 4px ${alpha(brand.sky, 0.34)}`,
  border: `1px solid ${alpha(brand.line, 0.92)}`,
  focusBorder: `1px solid ${alpha(brand.ink, 0.34)}`,
  mutedBorder: `1px solid ${alpha(brand.ink, 0.08)}`,
}
