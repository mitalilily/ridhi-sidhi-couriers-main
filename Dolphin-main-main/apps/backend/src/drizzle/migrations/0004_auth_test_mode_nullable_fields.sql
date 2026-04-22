ALTER TABLE "users"
  ALTER COLUMN "phone" DROP NOT NULL,
  ALTER COLUMN "googleId" DROP NOT NULL,
  ALTER COLUMN "pendingEmail" DROP NOT NULL,
  ALTER COLUMN "pendingPhone" DROP NOT NULL,
  ALTER COLUMN "passwordHash" DROP NOT NULL,
  ALTER COLUMN "refreshToken" DROP NOT NULL,
  ALTER COLUMN "previousRefreshToken" DROP NOT NULL,
  ALTER COLUMN "otp" DROP NOT NULL,
  ALTER COLUMN "emailVerificationToken" DROP NOT NULL;

ALTER TABLE "users"
  ALTER COLUMN "refreshTokenExpiresAt" DROP NOT NULL,
  ALTER COLUMN "previousRefreshTokenExpiresAt" DROP NOT NULL,
  ALTER COLUMN "otpExpiresAt" DROP NOT NULL,
  ALTER COLUMN "emailVerificationTokenExpiresAt" DROP NOT NULL,
  ALTER COLUMN "profilePicture" DROP NOT NULL;

UPDATE "users"
SET
  "phone" = NULLIF(BTRIM("phone"), ''),
  "googleId" = NULLIF(BTRIM("googleId"), ''),
  "pendingEmail" = NULLIF(BTRIM("pendingEmail"), ''),
  "pendingPhone" = NULLIF(BTRIM("pendingPhone"), ''),
  "passwordHash" = NULLIF(BTRIM("passwordHash"), ''),
  "refreshToken" = NULLIF(BTRIM("refreshToken"), ''),
  "previousRefreshToken" = NULLIF(BTRIM("previousRefreshToken"), ''),
  "otp" = NULLIF(BTRIM("otp"), ''),
  "emailVerificationToken" = NULLIF(BTRIM("emailVerificationToken"), ''),
  "profilePicture" = NULLIF(BTRIM("profilePicture"), '');
