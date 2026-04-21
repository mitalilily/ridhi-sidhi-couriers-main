import { Box, Button, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import AuthShell from '../../components/auth/AuthShell'
import CredentialAuthForm from '../../components/auth/CredentialAuthForm'
import OtpLoginPanel from '../../components/auth/OtpLoginPanel'
import FullScreenLoader from '../../components/UI/loader/FullScreenLoader'
import { useAuth } from '../../context/auth/AuthContext'
import { brand, brandGradients } from '../../theme/brand'
import { FiShield } from 'react-icons/fi'
import { TbChartBar, TbTruckDelivery } from 'react-icons/tb'

export default function Login() {
  const { loading } = useAuth()
  const [mode, setMode] = useState<'otp' | 'password'>('otp')

  if (loading) return <FullScreenLoader />

  return (
    <AuthShell
      eyebrow="Seller Login"
      title="Secure access to your shipping control center"
      subtitle="Sign in to the RS Express dashboard and manage your logistics operations with speed, security, and complete visibility."
      helperTitle="Manage shipping with confidence"
      helperText="Access orders, pickups, returns, and live tracking updates anytime from one powerful platform."
      pills={['Built for growing ecommerce brands', 'Fast and secure login', 'Smarter shipping decisions']}
      highlights={[
        {
          title: 'Everything in one dashboard',
          text: 'Handle orders, pickups, courier assignments, tracking updates, returns, billing, and support from a single easy-to-use workspace.',
          icon: <TbTruckDelivery size={18} />,
        },
        {
          title: 'Fast and secure login',
          text: 'Use OTP or password sign-in for quick, reliable access so your team can stay focused on daily operations.',
          icon: <FiShield size={18} />,
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
            Use OTP or password sign-in to access your dashboard quickly and securely.
          </Typography>
        </Stack>

        <Box
          sx={{
            p: 0.6,
            borderRadius: 3,
            backgroundColor: 'rgba(198,231,255,0.18)',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 0.6,
          }}
        >
          {[
            { value: 'otp', label: 'Email OTP' },
            { value: 'password', label: 'Password' },
          ].map((item) => (
            <Button
              key={item.value}
              type="button"
              onClick={() => setMode(item.value as 'otp' | 'password')}
              sx={{
                borderRadius: 3,
                py: 1.2,
                background: mode === item.value ? brandGradients.button : 'transparent',
                color: brand.ink,
                fontWeight: 700,
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>

        {mode === 'otp' ? <OtpLoginPanel /> : <CredentialAuthForm mode="login" />}

        <Typography sx={{ color: brand.inkSoft, textAlign: 'center', fontSize: '0.88rem' }}>
          New to RS Express?{' '}
          <Box component={RouterLink} to="/signup" sx={{ color: brand.ink, fontWeight: 700 }}>
            Create an account
          </Box>
        </Typography>
      </Stack>
    </AuthShell>
  )
}
