import { Box, Typography, type BoxProps } from '@mui/material'
import { alpha } from '@mui/material/styles'
import rsExpressLogo from '../../assets/rs-express-logo.png'
import { brand } from '../../theme/brand'

interface BrandLogoProps extends Omit<BoxProps, 'component'> {
  compact?: boolean
}

export default function BrandLogo({ compact = false, sx, ...rest }: BrandLogoProps) {
  if (compact) {
    return (
      <Box
        sx={{
          width: 38,
          height: 38,
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #F3D183 0%, #CD7637 100%)',
          border: `1px solid ${alpha('#FFFFFF', 0.66)}`,
          display: 'grid',
          placeItems: 'center',
          boxShadow: '0 10px 20px rgba(122, 68, 27, 0.16)',
          ...sx,
        }}
        {...rest}
      >
        <Typography sx={{ fontSize: '0.78rem', fontWeight: 800, color: brand.ink, lineHeight: 1 }}>
          RS
        </Typography>
      </Box>
    )
  }

  return (
    <Box
      component="img"
      src={rsExpressLogo}
      alt="RS Express"
      sx={{
        width: { xs: 168, sm: 200 },
        height: 'auto',
        objectFit: 'contain',
        mixBlendMode: 'multiply',
        display: 'block',
        ...sx,
      }}
      {...rest}
    />
  )
}
