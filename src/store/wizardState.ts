import { create } from 'zustand';

interface WizardState {
  industry: string;
  businessType: string;
  goal: string;
  campaignContent?: any; // <-- added
  setIndustry: (industry: string) => void;
  setBusinessType: (type: string) => void;
  setGoal: (goal: string) => void;
  setCampaignContent: (content: any) => void; // <-- added
}

export const useWizardState = create<WizardState>((set) => ({
  industry: '',
  businessType: '',
  goal: '',
  campaignContent: null, // <-- default
  setIndustry: (industry) => set({ industry }),
  setBusinessType: (type) => set({ businessType: type }),
  setGoal: (goal) => set({ goal }),
  setCampaignContent: (content) => set({ campaignContent: content }), // <-- added
}));

