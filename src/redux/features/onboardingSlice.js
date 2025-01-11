import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalOpen: false,
  currentStep: 0,
  userType: null, // 'agent', 'lawyer', 'surveyor'
  howHeardAbout: "",
  hasSeenOnboarding: false,
  lawyerProfile: {
    firm_name: "",
    license_number: "",
    bar_association: "",
    professional_email: "",
    phone_number: "",
    website: "",
    specializations: [],
  },
  surveyorProfile: {
    company_name: "",
    license_number: "",
    state_of_licensure: "",
    website: "",
    specializations: [],
    software_used: [],
    professional_affiliations: [],
  },
};

const onboardingSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {
    openOnboarding: (state, action) => {
      state.isModalOpen = true;
      state.userType = action.payload;
    },
    closeOnboarding: (state) => {
      state.isModalOpen = false;
      state.hasSeenOnboarding = true;
    },
    nextStep: (state) => {
      state.currentStep += 1;
    },
    prevStep: (state) => {
      state.currentStep -= 1;
    },
    setHowHeardAbout: (state, action) => {
      state.howHeardAbout = action.payload;
    },
    updateLawyerProfile: (state, action) => {
      state.lawyerProfile = { ...state.lawyerProfile, ...action.payload };
    },
    updateSurveyorProfile: (state, action) => {
      state.surveyorProfile = { ...state.surveyorProfile, ...action.payload };
    },
    resetOnboarding: () => initialState,
  },
});

export const {
  openOnboarding,
  closeOnboarding,
  nextStep,
  prevStep,
  setHowHeardAbout,
  updateLawyerProfile,
  updateSurveyorProfile,
  resetOnboarding,
} = onboardingSlice.actions;

export default onboardingSlice.reducer;
