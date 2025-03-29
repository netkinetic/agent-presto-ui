import { create } from 'zustand';
import { Playbook, CampaignContent, CampaignFormData } from '@/types';

interface WizardState {
  currentStep: number;
  industry: string;
  businessType: string;
  goal: string;
  playbook: Playbook | null;
  campaignData: CampaignFormData & { aiImage?: string };
  campaignContent: CampaignContent | null;
  isLoading: boolean;

  setCurrentStep: (step: number) => void;
  setIndustry: (industry: string) => void;
  setBusinessType: (type: string) => void;
  setGoal: (goal: string) => void;
  setSelectedPlaybook: (pb: Playbook) => void;
  setCampaignData: (data: CampaignFormData & { aiImage?: string }) => void;
  setGeneratedContent: (content: CampaignContent) => void;
  setLoading: (loading: boolean) => void;
}

export const useWizardState = create<WizardState>((set) => ({
  currentStep: 1,
  industry: '',
  businessType: '',
  goal: '',
  playbook: null,
  campaignData: {
    campaignTitle: '',
    businessName: '',
    website: '',
    keywords: '',
    goal: '',
    contentLength: 'short',
    additionalInstructions: '',
    playbookDuration: '30 days',
    businessType: '',
  },
  campaignContent: null,
  isLoading: false,

  setCurrentStep: (step: number) => set({ currentStep: step }),
  setIndustry: (industry: string) => set({ industry }),
  setBusinessType: (type: string) => set({ businessType: type }),
  setGoal: (goal: string) => set({ goal }),
  setSelectedPlaybook: (pb: Playbook) => set({ playbook: pb }),
  setCampaignData: (data) => set({ campaignData: data }),
  setGeneratedContent: (content: CampaignContent) => set({ campaignContent: content }),
  setLoading: (loading: boolean) => set({ isLoading: loading }),
}));
