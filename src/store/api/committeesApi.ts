import { baseApi } from './baseApi';
import { API_ENDPOINTS } from './endpoints';

export interface CommitteeItem {
  id: string;
  name: string;
  year: string;
  type: string;
  termTitle: string | null;
  startDate: string | null;
  endDate: string | null;
  description: string | null;
  featuredImage: string | null;
  isCurrent: boolean;
  status: string;
  displayOrder: number;
  memberships?: CommitteeMembershipItem[];
}

export interface DesignationItem {
  id: string;
  titleBn: string;
  titleEn: string;
  slug: string;
  description: string | null;
  priority: number;
  isActive: boolean;
}

export interface MemberItem {
  id: string;
  memberId: string;
  nameBn: string;
  nameEn: string;
  photoUrl: string | null;
  phoneNumber: string;
  email: string | null;
  village: string | null;
  unionName: string | null;
  upazila: string;
  district: string;
  bio: string | null;
  occupation: string | null;
  status: string;
  memberships?: CommitteeMembershipItem[];
}

export interface CommitteeMembershipItem {
  id: string;
  memberId: string;
  committeeId: string;
  designationId: string;
  status: string;
  member?: MemberItem;
  committee?: CommitteeItem;
  designation?: DesignationItem;
}

export interface VerifiedMemberProfile {
  memberId: string;
  nameBn: string;
  nameEn: string;
  photoUrl: string | null;
  village: string | null;
  unionName: string | null;
  upazila: string;
  district: string;
  bio: string | null;
  status: string;
  committees: Array<{
    committeeName: string;
    committeeYear: string;
    committeeType: string;
    designationBn: string;
    designationEn: string;
    status: string;
  }>;
}

export const committeesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPublicCommittees: builder.query<CommitteeItem[], void>({
      query: () => ({ url: API_ENDPOINTS.committees.publicList }),
      providesTags: ['Committees'],
    }),

    getPublicDesignations: builder.query<DesignationItem[], void>({
      query: () => ({ url: API_ENDPOINTS.committees.publicDesignations }),
      providesTags: ['Committees'],
    }),

    verifyMemberById: builder.query<VerifiedMemberProfile, string>({
      query: (id) => ({ url: API_ENDPOINTS.committees.verifyMember(id) }),
      providesTags: ['Committees'],
    }),

    getAdminCommittees: builder.query<CommitteeItem[], void>({
      query: () => ({ url: API_ENDPOINTS.committees.adminAll }),
      providesTags: ['Committees'],
    }),

    getAdminMembers: builder.query<{ items: MemberItem[]; total: number; page: number; limit: number }, { search?: string; page?: number; limit?: number } | void>({
      query: (params) => ({
        url: API_ENDPOINTS.committees.adminMembers,
        params: params || {},
      }),
      providesTags: ['Committees'],
    }),

    getAdminMemberById: builder.query<any, string>({
      query: (id) => ({ url: API_ENDPOINTS.committees.adminMemberById(id) }),
      providesTags: (_res, _err, id) => [{ type: 'Committees', id }],
    }),

    createCommittee: builder.mutation<CommitteeItem, Partial<CommitteeItem>>({
      query: (data) => ({ url: API_ENDPOINTS.committees.adminCommittee, method: 'POST', data }),
      invalidatesTags: ['Committees'],
    }),
    updateCommittee: builder.mutation<CommitteeItem, { id: string; data: Partial<CommitteeItem> }>({
      query: ({ id, data }) => ({ url: API_ENDPOINTS.committees.adminCommitteeById(id), method: 'PUT', data }),
      invalidatesTags: ['Committees'],
    }),
    deleteCommittee: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({ url: API_ENDPOINTS.committees.adminCommitteeById(id), method: 'DELETE' }),
      invalidatesTags: ['Committees'],
    }),

    createDesignation: builder.mutation<DesignationItem, Partial<DesignationItem>>({
      query: (data) => ({ url: API_ENDPOINTS.committees.adminDesignation, method: 'POST', data }),
      invalidatesTags: ['Committees'],
    }),

    createMember: builder.mutation<MemberItem, any>({
      query: (data) => ({ url: API_ENDPOINTS.committees.adminMember, method: 'POST', data }),
      invalidatesTags: ['Committees'],
    }),

    assignMembership: builder.mutation<CommitteeMembershipItem, any>({
      query: (data) => ({ url: API_ENDPOINTS.committees.adminMembership, method: 'POST', data }),
      invalidatesTags: ['Committees'],
    }),
    removeMembership: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({ url: API_ENDPOINTS.committees.adminMembershipById(id), method: 'DELETE' }),
      invalidatesTags: ['Committees'],
    }),
  }),
});

export const {
  useGetPublicCommitteesQuery,
  useGetPublicDesignationsQuery,
  useVerifyMemberByIdQuery,
  useLazyVerifyMemberByIdQuery,
  useGetAdminCommitteesQuery,
  useGetAdminMembersQuery,
  useGetAdminMemberByIdQuery,
  useCreateCommitteeMutation,
  useUpdateCommitteeMutation,
  useDeleteCommitteeMutation,
  useCreateDesignationMutation,
  useCreateMemberMutation,
  useAssignMembershipMutation,
  useRemoveMembershipMutation,
} = committeesApi;
