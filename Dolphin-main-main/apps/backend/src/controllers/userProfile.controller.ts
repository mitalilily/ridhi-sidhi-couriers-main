import { NextFunction, Request, Response } from 'express'
import {
  changePassword,
  getProfileByUserId,
  requestProfileEmailVerificationOTP,
  requestProfilePhoneVerificationOTP,
  updateUserProfileService,
  verifyProfileEmailOTP,
  verifyProfilePhoneOTP,
} from '../models/services/userProfile.service'
import { HttpError } from '../utils/classes'
import { isTestModeEnabled } from '../utils/authConfig'

/** GET /user-profiles/me */
export const getUserProfile = async (
  req: any,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
    const userId = req.user!.sub
    if (isTestModeEnabled() && typeof userId === 'string' && userId.startsWith('test-')) {
      const email = `${userId.replace(/^test-/, '')}@test.local`
      return res.json({
        id: userId,
        userId,
        name: 'Test User',
        email,
        onboardingStep: 1,
        monthlyOrderCount: '0-100',
        onboardingComplete: true,
        profileComplete: true,
        salesChannels: {},
        companyInfo: {
          businessName: 'Ridhi Sidhi Couriers',
          contactPerson: 'Test User',
          profilePicture: '',
          companyAddress: 'Test Address',
          companyContactNumber: '',
          pincode: '',
          POCEmailVerified: true,
          POCPhoneVerified: false,
          state: '',
          city: '',
          contactNumber: '',
          contactEmail: email,
          brandName: 'Ridhi Sidhi Couriers',
          companyEmail: email,
          companyLogoUrl: '',
          website: '',
        },
        domesticKyc: { status: 'verified', updatedAt: null },
        bankDetails: { count: 0, primaryAccount: null },
        gstDetails: { gstNumber: '', legalName: '', registrationDate: '', state: '', documentUrl: '' },
        businessType: ['b2c'],
        approved: true,
        approvedAt: new Date().toISOString(),
        rejectionReason: null,
        currentPlanId: null,
        currentPlanName: null,
        submittedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
    }

    const profile = await getProfileByUserId(userId)
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' })
    }
    res.json(profile)
  } catch (err) {
    next(err)
  }
}

export const updateUserProfile = async (req: any, res: Response): Promise<any> => {
  const userId = req.user.sub

  try {
    const updated = await updateUserProfileService(userId, req.body)
    if (!updated) {
      return res.status(404).json({ message: 'User not found' })
    }
    return res.status(200).json({ message: 'Profile updated', user: updated })
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(error.statusCode).json({ message: error.message })
    }

    console.error('Error updating profile:', error)
    return res.status(500).json({ message: 'Failed to update profile' })
  }
}

export const requestEmailVerificationOtp = async (req: any, res: Response): Promise<any> => {
  const userId = req.user.sub
  const { updatedEmail } = req.body

  try {
    await requestProfileEmailVerificationOTP(userId, updatedEmail)
    return res.status(200).json({
      message: isTestModeEnabled() ? 'Verification bypassed in test mode' : 'Verification email sent',
      email: updatedEmail,
    })
  } catch (err) {
    if (err instanceof HttpError) {
      return res.status(err.statusCode).json({ message: err.message })
    }
    console.error('Email OTP error:', err)
    return res.status(500).json({ message: 'Failed to send verification email' })
  }
}

export const verifyProfileEmailOtp = async (req: any, res: Response): Promise<any> => {
  const userId = req.user.sub
  const { otp, email } = req.body

  try {
    const verifiedEmail = await verifyProfileEmailOTP(userId, email, otp)
    return res.status(200).json({ message: 'Email verified successfully', email: verifiedEmail })
  } catch (err) {
    if (err instanceof HttpError) {
      return res.status(err.statusCode).json({ message: err.message })
    }
    console.error('Email OTP verification failed:', err)
    return res.status(500).json({ message: 'Verification failed' })
  }
}

export const requestPhoneVerificationOtp = async (req: any, res: Response): Promise<any> => {
  const userId = req.user.sub
  const { updatedPhone } = req.body

  try {
    await requestProfilePhoneVerificationOTP(userId, updatedPhone)
    return res.status(200).json({
      message: isTestModeEnabled() ? 'Verification bypassed in test mode' : 'Verification code sent',
      phone: updatedPhone,
    })
  } catch (err) {
    if (err instanceof HttpError) {
      return res.status(err.statusCode).json({ message: err.message })
    }
    console.error('Phone OTP error:', err)
    return res.status(500).json({ message: 'Failed to send verification code to phone' })
  }
}

export const verifyProfilePhoneOtp = async (req: any, res: Response): Promise<any> => {
  const userId = req.user.sub
  const { otp, phone } = req.body

  try {
    const verifiedPhone = await verifyProfilePhoneOTP(userId, phone, otp)
    return res.status(200).json({ message: 'Phone verified successfully', phone: verifiedPhone })
  } catch (err) {
    if (err instanceof HttpError) {
      return res.status(err.statusCode).json({ message: err.message })
    }
    console.error('Phone verification failed:', err)
    return res.status(500).json({ message: 'Verification failed' })
  }
}

export async function patchChangePassword(req: any, res: Response): Promise<void> {
  const userId = req.user.sub as string
  const { currentPassword, newPassword } = req.body as {
    currentPassword?: string
    newPassword?: string
  }

  if (!newPassword) {
    return res.status(400).json({ message: 'New password is required' }) as any
  }

  try {
    await changePassword(userId, newPassword, currentPassword)
    res.json({
      message: currentPassword ? 'Password updated successfully' : 'Password set successfully',
    })
  } catch (error: any) {
    res.status(400).json({
      message: error.message ?? 'Password update failed',
    })
  }
}
