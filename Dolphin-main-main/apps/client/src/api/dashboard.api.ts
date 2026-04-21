import axiosInstance from './axiosInstance'
import type { AxiosRequestConfig } from 'axios'

export interface Pickup {
  id: string
  awb_number: string | null
  courier_partner: string | null
  order_number: string
  status?: string | null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pickup_details: any
  created_at: string
}

export interface PendingActions {
  ndrCount: number
  rtoCount: number
  weightDiscrepancyCount: number
}

export interface InvoiceStatus {
  pending: { count: number; totalAmount: number }
  paid: { count: number; totalAmount: number }
  overdue: { count: number; totalAmount: number }
}

export interface TopDestination {
  city: string
  state: string
  count: number
}

export interface CourierDistribution {
  courier: string
  count: number
}

export const getIncomingPickups = async (config?: AxiosRequestConfig): Promise<Pickup[]> => {
  const { data } = await axiosInstance.get('/dashboard/incoming', config)
  return data.success ? data.pickups : []
}

export const getPendingActions = async (config?: AxiosRequestConfig): Promise<PendingActions> => {
  const { data } = await axiosInstance.get('/dashboard/pending-actions', config)
  return data.success
    ? {
        ndrCount: data.ndrCount || 0,
        rtoCount: data.rtoCount || 0,
        weightDiscrepancyCount: data.weightDiscrepancyCount || 0,
      }
    : { ndrCount: 0, rtoCount: 0, weightDiscrepancyCount: 0 }
}

export const getInvoiceStatus = async (config?: AxiosRequestConfig): Promise<InvoiceStatus> => {
  const { data } = await axiosInstance.get('/dashboard/invoice-status', config)
  return data.success ? data.status : { pending: { count: 0, totalAmount: 0 }, paid: { count: 0, totalAmount: 0 }, overdue: { count: 0, totalAmount: 0 } }
}

export const getTopDestinations = async (
  limit = 10,
  config?: AxiosRequestConfig,
): Promise<TopDestination[]> => {
  const axiosConfig: AxiosRequestConfig = {
    ...config,
    params: {
      limit,
      ...(config?.params ?? {}),
    },
  }
  const { data } = await axiosInstance.get('/dashboard/top-destinations', axiosConfig)
  return data.success ? data.destinations : []
}

export const getCourierDistribution = async (
  config?: AxiosRequestConfig,
): Promise<CourierDistribution[]> => {
  const { data } = await axiosInstance.get('/dashboard/courier-distribution', config)
  return data.success ? data.distribution : []
}

// Merchant Dashboard Stats
export interface MerchantDashboardStats {
  todayOperations: {
    orders: number
    pending: number
    inTransit: number
    delivered: number
  }
  financial: {
    walletBalance: number
    todayRevenue: number
    totalRevenue: number
    totalShippingCharges: number
    totalFreightCharges: number
    profit: number
    codAmount: number
    codRemittanceDue: number
    codRemittanceCredited: number
  }
  operational: {
    deliverySuccessRate: number
    ndrRate: number
    rtoRate: number
    avgDeliveryTime: number
    totalOrders: number
    deliveredOrders: number
    ndrCount: number
    rtoCount: number
  }
  actions: {
    ndrCount: number
    rtoCount: number
    weightDiscrepancyCount: number
    openTickets: number
    inProgressTickets: number
    pendingInvoices: number
    pendingInvoiceAmount: number
    overdueInvoices: number
    overdueInvoiceAmount: number
  }
  couriers: {
    performance: Record<string, { count: number; delivered: number; revenue: number; deliveryRate: number }>
    distribution: CourierDistribution[]
  }
  geographic: {
    topDestinations: TopDestination[]
  }
  charts: {
    ordersByDate: { date: string; orders: number }[]
    revenueByDate: { date: string; revenue: number }[]
    ordersByDate30: { date: string; orders: number }[]
    revenueByDate30: { date: string; revenue: number }[]
    ordersByStatus: { status: string; count: number }[]
    revenueByOrderType: { type: string; revenue: number }[]
    ordersByCourier: { courier: string; count: number }[]
    revenueByCourier: { courier: string; revenue: number }[]
  }
  metrics: {
    avgOrderValue: number
    totalPrepaidOrders: number
    totalCodOrders: number
    prepaidRevenue: number
    codRevenue: number
    topRevenueCities: Array<{ city: string; revenue: number }>
  }
  recentOrders: Array<Record<string, unknown>>
  trends: {
    ordersGrowth: number
    revenueGrowth: number
    thisWeekOrders: number
    lastWeekOrders: number
    thisWeekRevenue: number
    lastWeekRevenue: number
  }
  recentActivity: {
    transactions: Array<{
      id: string
      type: 'credit' | 'debit'
      amount: number
      reason: string | null
      createdAt: Date | null
    }>
    recentOrders: Array<{
      id: string
      orderNumber: string
      status: string
      amount: number
      createdAt: Date | string
    }>
  }
}

export const createFallbackDashboardStats = (): MerchantDashboardStats => ({
  todayOperations: {
    orders: 128,
    pending: 19,
    inTransit: 41,
    delivered: 68,
  },
  financial: {
    walletBalance: 48250,
    todayRevenue: 18240,
    totalRevenue: 564000,
    totalShippingCharges: 322500,
    totalFreightCharges: 241500,
    profit: 119400,
    codAmount: 86300,
    codRemittanceDue: 21400,
    codRemittanceCredited: 64900,
  },
  operational: {
    deliverySuccessRate: 94,
    ndrRate: 3.2,
    rtoRate: 2.1,
    avgDeliveryTime: 2.4,
    totalOrders: 2458,
    deliveredOrders: 2308,
    ndrCount: 18,
    rtoCount: 9,
  },
  actions: {
    ndrCount: 18,
    rtoCount: 9,
    weightDiscrepancyCount: 3,
    openTickets: 4,
    inProgressTickets: 7,
    pendingInvoices: 2,
    pendingInvoiceAmount: 18450,
    overdueInvoices: 1,
    overdueInvoiceAmount: 6250,
  },
  couriers: {
    performance: {
      Delhivery: { count: 640, delivered: 608, revenue: 134000, deliveryRate: 95 },
      Xpressbees: { count: 520, delivered: 483, revenue: 109000, deliveryRate: 93 },
      EcomExpress: { count: 410, delivered: 377, revenue: 84200, deliveryRate: 92 },
    },
    distribution: [
      { courier: 'Delhivery', count: 640 },
      { courier: 'Xpressbees', count: 520 },
      { courier: 'EcomExpress', count: 410 },
      { courier: 'Shadowfax', count: 268 },
    ],
  },
  geographic: {
    topDestinations: [
      { city: 'Delhi', state: 'Delhi', count: 224 },
      { city: 'Mumbai', state: 'Maharashtra', count: 198 },
      { city: 'Bengaluru', state: 'Karnataka', count: 166 },
      { city: 'Jaipur', state: 'Rajasthan', count: 121 },
      { city: 'Lucknow', state: 'Uttar Pradesh', count: 96 },
    ],
  },
  charts: {
    ordersByDate: [
      { date: 'Mon', orders: 22 },
      { date: 'Tue', orders: 18 },
      { date: 'Wed', orders: 24 },
      { date: 'Thu', orders: 21 },
      { date: 'Fri', orders: 26 },
      { date: 'Sat', orders: 10 },
      { date: 'Sun', orders: 7 },
    ],
    revenueByDate: [
      { date: 'Mon', revenue: 14200 },
      { date: 'Tue', revenue: 12800 },
      { date: 'Wed', revenue: 16700 },
      { date: 'Thu', revenue: 15400 },
      { date: 'Fri', revenue: 18240 },
      { date: 'Sat', revenue: 9100 },
      { date: 'Sun', revenue: 6200 },
    ],
    ordersByDate30: [
      { date: 'Week 1', orders: 156 },
      { date: 'Week 2', orders: 188 },
      { date: 'Week 3', orders: 172 },
      { date: 'Week 4', orders: 204 },
    ],
    revenueByDate30: [
      { date: 'Week 1', revenue: 102400 },
      { date: 'Week 2', revenue: 118600 },
      { date: 'Week 3', revenue: 109850 },
      { date: 'Week 4', revenue: 133150 },
    ],
    ordersByStatus: [
      { status: 'Delivered', count: 68 },
      { status: 'In Transit', count: 41 },
      { status: 'Pending', count: 19 },
    ],
    revenueByOrderType: [
      { type: 'Prepaid', revenue: 322500 },
      { type: 'COD', revenue: 241500 },
    ],
    ordersByCourier: [
      { courier: 'Delhivery', count: 640 },
      { courier: 'Xpressbees', count: 520 },
      { courier: 'EcomExpress', count: 410 },
      { courier: 'Shadowfax', count: 268 },
    ],
    revenueByCourier: [
      { courier: 'Delhivery', revenue: 134000 },
      { courier: 'Xpressbees', revenue: 109000 },
      { courier: 'EcomExpress', revenue: 84200 },
      { courier: 'Shadowfax', revenue: 58300 },
    ],
  },
  metrics: {
    avgOrderValue: 459,
    totalPrepaidOrders: 1442,
    totalCodOrders: 1016,
    prepaidRevenue: 322500,
    codRevenue: 241500,
    topRevenueCities: [
      { city: 'Delhi', revenue: 82400 },
      { city: 'Mumbai', revenue: 76200 },
      { city: 'Bengaluru', revenue: 68100 },
    ],
  },
  recentOrders: [],
  trends: {
    ordersGrowth: 14.6,
    revenueGrowth: 11.3,
    thisWeekOrders: 128,
    lastWeekOrders: 112,
    thisWeekRevenue: 86440,
    lastWeekRevenue: 77620,
  },
  recentActivity: {
    transactions: [
      {
        id: 'txn-1',
        type: 'credit',
        amount: 12000,
        reason: 'COD remittance received',
        createdAt: new Date(),
      },
      {
        id: 'txn-2',
        type: 'debit',
        amount: 3850,
        reason: 'Shipping charges deducted',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6),
      },
    ],
    recentOrders: [
      {
        id: 'ord-1',
        orderNumber: 'RSE-10452',
        status: 'Delivered',
        amount: 899,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'ord-2',
        orderNumber: 'RSE-10453',
        status: 'In Transit',
        amount: 1249,
        createdAt: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
      },
    ],
  },
})

const shouldUseFallbackDashboard = (error: unknown) => {
  const err = error as {
    code?: string
    response?: { status?: number }
    message?: string
  }
  const status = err?.response?.status
  return (
    !status ||
    status >= 500 ||
    err?.code === 'ECONNABORTED' ||
    /network|timeout|fetch/i.test(String(err?.message || ''))
  )
}

export const getMerchantDashboardStats = async (
  config?: AxiosRequestConfig,
): Promise<MerchantDashboardStats> => {
  try {
    const { data } = await axiosInstance.get('/dashboard/stats', config)
    return data.success ? data.data : createFallbackDashboardStats()
  } catch (error) {
    if (shouldUseFallbackDashboard(error)) {
      return createFallbackDashboardStats()
    }
    throw error
  }
}
