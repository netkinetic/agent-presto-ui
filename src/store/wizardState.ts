// store/wizardState.ts
import { create } from 'zustand';

interface WizardState {
  industry: string;
  businessType: string;
  goal: string;
  setIndustry: (industry: string) => void;
  setBusinessType: (type: string) => void;
  setGoal: (goal: string) => void;
}

export const useWizardState = create<WizardState>((set) => ({
  industry: '',
  businessType: '',
  goal: '',
  setIndustry: (industry) => set({ industry }),
  setBusinessType: (type) => set({ businessType: type }),
  setGoal: (goal) => set({ goal }),
}));
