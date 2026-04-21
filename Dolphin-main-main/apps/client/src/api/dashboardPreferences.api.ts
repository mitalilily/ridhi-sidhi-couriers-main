import axiosInstance from './axiosInstance'

export interface DashboardPreferences {
  widgetVisibility: Record<string, boolean>
  widgetOrder: string[]
  layout: {
    columns?: number
    spacing?: number
    cardStyle?: 'default' | 'compact' | 'spacious'
    showGridLines?: boolean
  }
  dateRange: {
    defaultRange?: '7days' | '30days' | '90days' | 'custom'
    customStart?: string
    customEnd?: string
  }
}

const fallbackDashboardPreferences: DashboardPreferences = {
  widgetVisibility: {},
  widgetOrder: [
    'quickStats',
    'quickActions',
    'insights',
    'actionItems',
    'performanceMetrics',
    'ordersTrend',
    'financialHealth',
    'recentActivity',
    'todaysOperations',
    'orderStatusChart',
    'courierComparison',
    'metricsOverview',
    'courierPerformance',
    'topDestinations',
  ],
  layout: {
    columns: 12,
    spacing: 3,
    cardStyle: 'default',
    showGridLines: false,
  },
  dateRange: {
    defaultRange: '30days',
  },
}

export const getDashboardPreferences = async (): Promise<DashboardPreferences> => {
  try {
    const { data } = await axiosInstance.get('/dashboard/preferences')
    return data.success ? { ...fallbackDashboardPreferences, ...data.data } : fallbackDashboardPreferences
  } catch {
    return fallbackDashboardPreferences
  }
}

export const saveDashboardPreferences = async (
  preferences: Partial<DashboardPreferences>,
): Promise<DashboardPreferences> => {
  const { data } = await axiosInstance.post('/dashboard/preferences', preferences)
  return data.success ? data.data : ({} as DashboardPreferences)
}

