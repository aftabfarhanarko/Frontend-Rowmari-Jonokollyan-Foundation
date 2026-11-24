export type Language = 'bn' | 'en';

export type ActivityCategory = 'all' | 'winter' | 'medical' | 'education' | 'food' | 'emergency';

export interface ActivityItem {
  id: string;
  category: 'winter' | 'medical' | 'education' | 'food' | 'emergency';
  titleBn: string;
  titleEn: string;
  categoryBn: string;
  categoryEn: string;
  dateBn: string;
  dateEn: string;
  descriptionBn: string;
  descriptionEn: string;
  locationBn: string;
  locationEn: string;
  beneficiariesCount: number;
  imageUrl?: string;
  featured?: boolean;
}

export interface CampaignItem {
  id: string;
  titleBn: string;
  titleEn: string;
  targetAmount: number;
  raisedAmount: number;
  deadlineBn: string;
  deadlineEn: string;
  donorsCount: number;
  descriptionBn: string;
  descriptionEn: string;
  status: 'ongoing' | 'completed' | 'upcoming';
  category: string;
  imageUrl?: string;
}

export interface GalleryItem {
  id: string;
  category: string;
  titleBn: string;
  titleEn: string;
  dateBn: string;
  dateEn: string;
  tagBn: string;
  tagEn: string;
  imageUrl?: string;
  locationBn?: string;
  locationEn?: string;
}

export interface NewsItem {
  id: string;
  type: 'news' | 'event';
  titleBn: string;
  titleEn: string;
  dateBn: string;
  dateEn: string;
  locationBn: string;
  locationEn: string;
  summaryBn: string;
  summaryEn: string;
  imageUrl?: string;
}

export interface ApplicationTrackingStatus {
  id: string;
  applicantName: string;
  categoryBn: string;
  categoryEn: string;
  submittedDateBn: string;
  submittedDateEn: string;
  status: 'pending' | 'under_review' | 'approved' | 'rejected' | 'completed';
  statusNoteBn: string;
  statusNoteEn: string;
  assignedOfficerBn?: string;
  amountOrSupportBn?: string;
}

export type UserRole =
  | 'SUPER_ADMIN'
  | 'ADMIN'
  | 'BLOOD_COORDINATOR'
  | 'MEDICAL_COORDINATOR'
  | 'EDUCATION_COORDINATOR'
  | 'VOLUNTEER_MANAGER'
  | 'VOLUNTEER_COORDINATOR'
  | 'CONTENT_MANAGER'
  | 'FINANCE_MANAGER'
  | 'CASE_WORKER'
  | 'COMMUNITY_MEMBER';

export interface DashboardNavItem {
  id: string;
  titleBn: string;
  titleEn: string;
  href: string;
  iconName: string;
  badge?: string | number;
  roles: UserRole[]; // Which roles can see this route
  category?: 'main' | 'operations' | 'management' | 'personal' | 'settings';
}

export interface RoleMeta {
  role: UserRole;
  titleBn: string;
  titleEn: string;
  descriptionBn: string;
  colorScheme: {
    bg: string;
    text: string;
    border: string;
  };
}

