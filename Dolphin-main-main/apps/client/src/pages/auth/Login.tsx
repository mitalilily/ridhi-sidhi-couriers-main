import { Box, Stack, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import AuthShell from '../../components/auth/AuthShell'
import CredentialAuthForm from '../../components/auth/CredentialAuthForm'
import FullScreenLoader from '../../components/UI/loader/FullScreenLoader'
import { useAuth } from '../../context/auth/AuthContext'
import { brand } from '../../theme/brand'
import { TbChartBar, TbShieldLock, TbTruckDelivery } from 'react-icons/tb'

export default function Login() {
  const { loading } = useAuth()

  if (loading) return <FullScreenLoader />

  return (
    <AuthShell
      eyebrow="Seller Login"
      title="Secure access to your shipping control center"
      subtitle="Sign in to the RS Express dashboard and manage your logistics operations with speed, security, and complete visibility."
      helperTitle="Manage shipping with confidence"
      helperText="Access orders, pickups, returns, and live tracking updates anytime from one powerful platform."
      pills={['Built for growing ecommerce brands', 'Instant test access enabled', 'Smarter shipping decisions']}
      highlights={[
        {
          title: 'Everything in one dashboard',
          text: 'Handle orders, pickups, courier assignments, tracking updates, returns, billing, and support from a single easy-to-use workspace.',
          icon: <TbTruckDelivery size={18} />,
        },
        {
          title: 'Instant test access',
          text: 'Testing mode lets any valid email enter immediately without OTP friction so you can exercise the full flow faster.',
          icon: <TbShieldLock size={18} />,
        },
        {
          title: 'Smarter shipping decisions',
          text: 'Track delivery performance, COD remittances, delays, and exceptions with real-time insights that help you improve efficiency.',
          icon: <TbChartBar size={18} />,
        },
      ]}
      footerNote="From dispatch to NDR management, returns handling, and customer support, RS Express helps simplify every step of fulfillment."
      showChrome={false}
    >
      <Stack spacing={2.4}>
        <Stack spacing={0.8}>
          <Typography sx={{ color: brand.ink, fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.05em' }}>
            Login
          </Typography>
          <Typography sx={{ color: brand.inkSoft, lineHeight: 1.72 }}>
            Sign in with email and password, or use any valid email in testing mode for instant access.
          </Typography>
        </Stack>

        <CredentialAuthForm mode="login" />

        <Typography sx={{ color: brand.inkSoft, textAlign: 'center', fontSize: '0.88rem' }}>
          New to RS Express?{' '}
          <Box component={RouterLink} to="/signup" sx={{ color: brand.ink, fontWeight: 700, display: 'inline' }}>
            Create an account
          </Box>
        </Typography>
      </Stack>
    </AuthShell>
  )
}
