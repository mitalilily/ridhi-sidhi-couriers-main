const parseBooleanEnv = (value: string | undefined, defaultValue = false) => {
  if (value === undefined) return defaultValue
  return value === 'true'
}

const legacyTestMode = parseBooleanEnv(process.env.TEST_AUTH_MODE, false)

/**
 * Central toggle for auth bypasses used in local/testing environments.
 *
 * `TEST_MODE` wins, but we keep the older `TEST_AUTH_MODE` fallback so
 * existing local setups do not break immediately.
 */
export const TEST_MODE = parseBooleanEnv(process.env.TEST_MODE, legacyTestMode)

export const isTestModeEnabled = () => TEST_MODE

export const normalizeEmail = (value: string) => value.trim().toLowerCase()

export const emptyStringToNull = (value: unknown) => {
  if (value === undefined || value === null) return null
  if (typeof value !== 'string') return value
  const trimmed = value.trim()
  return trimmed === '' ? null : trimmed
}

