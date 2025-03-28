// src/types.ts

export interface Deliverable {
  label: string;
  content: string;
  url?: string;
}

export interface Playbook {
  name: string;
  short_desc: string;
  thumbnail_url?: string;
  deliverables: Deliverable[];
}

export interface CampaignFormData {
  campaignTitle: string;
  businessName: string;
  website: string;
  keywords: string;
  goal: string;
  contentLength: 'short' | 'medium' | 'long';
  additionalInstructions: string;
  playbookDuration: string;
  businessType?: string;
}

export interface CampaignContent {
  title: string;
  summary: string;
  deliverables: Deliverable[];
}

export interface StepEightProps {
  mode: 'live' | 'draft' | 'scheduled';
  scheduledDate?: string;
  deliverables: Deliverable[];
  onDownloadPDF?: () => void;
  onSendEmail?: () => void;
  onUpgrade?: () => void;
}

export interface GenerateCampaignRequestPayload {
  campaign_title: string;
  business_name: string;
  website: string;
  keywords: string;
  goal: string;
  content_length: 'short' | 'medium' | 'long';
  additional_instructions: string;
  business: string;
  playbook_duration: string;
}

export interface APIResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

export interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}
