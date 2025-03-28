// src/store/wizardState.ts
import { create } from 'zustand';
import { Playbook, CampaignContent, CampaignData } from '@/types';

interface WizardState {
  industry: string;
  businessType: string;
  goal: string;
  playbook: Playbook | null;
  campaignData: CampaignData;
  campaignContent: CampaignContent | null;

  setIndustry: (industry: string) => void;
  setBusinessType: (type: string) => void;
  setGoal: (goal: string) => void;
  setSelectedPlaybook: (pb: Playbook) => void;
  setCampaignData: (data: CampaignData) => void;
  setGeneratedContent: (content: CampaignContent) => void;
}

export const useWizardState = create<WizardState>((set) => ({
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
  },
  campaignContent: null,

  setIndustry: (industry) => set({ industry }),
  setBusinessType: (type) => set({ businessType: type }),
  setGoal: (goal) => set({ goal }),
  setSelectedPlaybook: (pb) => set({ playbook: pb }),
  setCampaignData: (data) => set({ campaignData: data }),
  setGeneratedContent: (content) => set({ campaignContent: content }),
}));
