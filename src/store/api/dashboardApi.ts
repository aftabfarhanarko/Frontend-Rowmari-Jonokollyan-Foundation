import { baseApi } from './baseApi';
import { API_ENDPOINTS } from './endpoints';

export interface ExecutiveDashboard {
  financials: {
    totalDonationsReceived: number;
    totalExpensesDisbursed: number;
    netOperationalBalance: number;
    currency: string;
  };
  assistance: {
    totalApplicationsSubmitted: number;
    applicationsApproved: number;
  };
  bloodNetwork: {
    registeredDonors: number;
    availableDonors: number;
    totalBloodRequests: number;
    fulfilledBloodRequests: number;
  };
  volunteers: {
    activeApprovedVolunteers: number;
  };
  timestamp: string;
}

export interface PublicSummary {
  totalDonationsReceived: number;
  totalDonorsCount: number;
  totalApplications: number;
  applicationsApproved: number;
  registeredBloodDonors: number;
  totalBloodRequests: number;
  fulfilledBloodRequests: number;
  activeVolunteers: number;
  currency: string;
  timestamp: string;
}

export interface BackendApplication {
  id: string;
  referenceCode: string;
  applicantName: string;
  applicantPhone: string;
  category: string;
  requestedAmount?: number;
  approvedAmount?: number;
  status: string;
  district?: string;
  upazila?: string;
  createdAt: string;
  assignedTo?: { id: string; fullName: string };
  documents?: Array<{ id: string; fileName: string; fileUrl: string }>;
  statusHistory?: Array<{ id: string; toStatus: string; remarks?: string; createdAt: string }>;
}

export interface BackendDonation {
  id: string;
  donorName?: string;
  donorPhone?: string;
  amount: number;
  paymentMethod: string;
  transactionReference?: string;
  createdAt: string;
  campaign?: { id: string; title: string };
  receipt?: { id: string; receiptNumber: string; downloadUrl?: string };
}

export interface BackendExpense {
  id: string;
  title: string;
  amount: number;
  category: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  expenseDate: string;
  vendorName?: string;
  description?: string;
  createdAt: string;
}

export interface BackendVolunteer {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  skills?: string;
  isApproved: boolean;
  availabilityHoursPerWeek: number;
  upazila?: string;
  createdAt: string;
}

export interface BackendUser {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  isActive: boolean;
  roles: Array<{ id: string; name: string }>;
  createdAt: string;
}

export interface BackendNotification {
  id: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
}

export interface BackendBloodRequest {
  id: string;
  patientName: string;
  bloodGroup: string;
  unitsNeeded: number;
  unitsFulfilled?: number;
  hospitalName: string;
  requiredDate: string;
  urgency: string;
  contactPerson: string;
  contactPhone: string;
  status: string;
  createdAt: string;
  matches?: Array<{ id: string; status: string; donorProfile?: { fullName: string; phone: string } }>;
}

export interface PaginatedResponse<T> {
  items: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
  };
}

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Reports
    getExecutiveDashboard: builder.query<ExecutiveDashboard, void>({
      query: () => ({ url: API_ENDPOINTS.reports.dashboard }),
      providesTags: ['Reports'],
    }),
    getPublicSummary: builder.query<PublicSummary, void>({
      query: () => ({ url: API_ENDPOINTS.reports.publicSummary }),
      providesTags: ['Reports'],
    }),

    // Admin Applications
    getAdminApplications: builder.query<PaginatedResponse<BackendApplication> | BackendApplication[], { status?: string; category?: string; search?: string; page?: number; limit?: number } | void>({
      query: (params) => ({
        url: API_ENDPOINTS.applications.admin,
        params: params || { page: 1, limit: 50 },
      }),
      providesTags: ['Applications'],
    }),
    updateApplicationStatus: builder.mutation<BackendApplication, { id: string; status: string; remarks?: string; approvedAmount?: number }>({
      query: ({ id, ...data }) => ({
        url: API_ENDPOINTS.applications.adminStatus(id),
        method: 'PATCH',
        data,
      }),
      invalidatesTags: ['Applications', 'Reports'],
    }),
    assignApplicationStaff: builder.mutation<BackendApplication, { id: string; staffUserId: string }>({
      query: ({ id, staffUserId }) => ({
        url: API_ENDPOINTS.applications.adminAssign(id),
        method: 'POST',
        data: { staffUserId },
      }),
      invalidatesTags: ['Applications'],
    }),

    // Admin Donations & Expenses
    getAdminDonations: builder.query<PaginatedResponse<BackendDonation> | BackendDonation[], { campaignId?: string; page?: number; limit?: number } | void>({
      query: (params) => ({
        url: API_ENDPOINTS.donations.list,
        params: params || { page: 1, limit: 50 },
      }),
      providesTags: ['Donations'],
    }),
    getAdminExpenses: builder.query<PaginatedResponse<BackendExpense> | BackendExpense[], { status?: string; page?: number; limit?: number } | void>({
      query: (params) => ({
        url: API_ENDPOINTS.expenses.list,
        params: params || { page: 1, limit: 50 },
      }),
      providesTags: ['Expenses'],
    }),
    createExpense: builder.mutation<BackendExpense, { title: string; amount: number; category: string; expenseDate: string; vendorName?: string; description?: string }>({
      query: (data) => ({
        url: API_ENDPOINTS.expenses.create,
        method: 'POST',
        data,
      }),
      invalidatesTags: ['Expenses', 'Reports'],
    }),
    reviewExpense: builder.mutation<BackendExpense, { id: string; status: 'APPROVED' | 'REJECTED'; reviewNotes?: string }>({
      query: ({ id, ...data }) => ({
        url: API_ENDPOINTS.expenses.review(id),
        method: 'PATCH',
        data,
      }),
      invalidatesTags: ['Expenses', 'Reports'],
    }),

    // Admin Volunteers
    getAdminVolunteers: builder.query<PaginatedResponse<BackendVolunteer> | BackendVolunteer[], { isApproved?: boolean; page?: number; limit?: number } | void>({
      query: (params) => ({
        url: API_ENDPOINTS.volunteers.list,
        params: params || { page: 1, limit: 50 },
      }),
      providesTags: ['Volunteers'],
    }),
    approveVolunteer: builder.mutation<BackendVolunteer, { id: string; isApproved: boolean }>({
      query: ({ id, isApproved }) => ({
        url: API_ENDPOINTS.volunteers.approve(id),
        method: 'PATCH',
        data: { isApproved },
      }),
      invalidatesTags: ['Volunteers', 'Reports'],
    }),

    // Admin Users
    getAdminUsers: builder.query<PaginatedResponse<BackendUser> | BackendUser[], { page?: number; limit?: number } | void>({
      query: (params) => ({
        url: API_ENDPOINTS.users.list,
        params: params || { page: 1, limit: 50 },
      }),
      providesTags: ['Users'],
    }),
    updateUserRole: builder.mutation<BackendUser, { id: string; roleNames: string[] }>({
      query: ({ id, roleNames }) => ({
        url: API_ENDPOINTS.users.roles(id),
        method: 'PATCH',
        data: { roleNames },
      }),
      invalidatesTags: ['Users'],
    }),
    updateUserStatus: builder.mutation<BackendUser, { id: string; isActive: boolean }>({
      query: ({ id, isActive }) => ({
        url: API_ENDPOINTS.users.status(id),
        method: 'PATCH',
        data: { isActive },
      }),
      invalidatesTags: ['Users'],
    }),

    // Admin Notifications
    getAdminNotifications: builder.query<BackendNotification[], void>({
      query: () => ({ url: API_ENDPOINTS.notifications.admin }),
      providesTags: ['Notifications'],
    }),

    // Personal / Self-service Records
    getMyApplications: builder.query<PaginatedResponse<BackendApplication> | BackendApplication[], void>({
      query: () => ({ url: API_ENDPOINTS.applications.my }),
      providesTags: ['MyRecords'],
    }),
    getMyDonations: builder.query<PaginatedResponse<BackendDonation> | BackendDonation[], void>({
      query: () => ({ url: API_ENDPOINTS.donations.my }),
      providesTags: ['MyRecords'],
    }),
    getMyBloodRequests: builder.query<PaginatedResponse<BackendBloodRequest> | BackendBloodRequest[], void>({
      query: () => ({ url: API_ENDPOINTS.bloodRequests.my }),
      providesTags: ['MyRecords'],
    }),
  }),
});

export const {
  useGetExecutiveDashboardQuery,
  useGetPublicSummaryQuery,
  useGetAdminApplicationsQuery,
  useUpdateApplicationStatusMutation,
  useAssignApplicationStaffMutation,
  useGetAdminDonationsQuery,
  useGetAdminExpensesQuery,
  useCreateExpenseMutation,
  useReviewExpenseMutation,
  useGetAdminVolunteersQuery,
  useApproveVolunteerMutation,
  useGetAdminUsersQuery,
  useUpdateUserRoleMutation,
  useUpdateUserStatusMutation,
  useGetAdminNotificationsQuery,
  useGetMyApplicationsQuery,
  useGetMyDonationsQuery,
  useGetMyBloodRequestsQuery,
} = dashboardApi;
