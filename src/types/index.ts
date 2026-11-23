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
