import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";
import welcomeAnimation from "../../assets/animation/welcome.json";
import surveyAnimation from "../../assets/animation/survey.json";
import successAnimation from "../../assets/animation/success.json";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  nextStep,
  prevStep,
  setHowHeardAbout,
  updateLawyerProfile,
  updateSurveyorProfile,
  closeOnboarding,
} from "../../redux/features/onboardingSlice";

export const OnboardingModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    isModalOpen,
    currentStep,
    userType,
    howHeardAbout,
    lawyerProfile,
    surveyorProfile,
  } = useSelector((state) => state.onboarding);
  const userId = useSelector((state) => state.auth.user?.id);

  const handleLawyerSubmit = async () => {
    try {
      const response = await fetch(
        "https://proput-db-4vtf.onrender.com/lawyer_signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...lawyerProfile, user_id: userId }),
        }
      );

      if (!response.ok) throw new Error("Failed to submit lawyer profile");
      dispatch(nextStep());
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  const handleSurveyorSubmit = async () => {
    try {
      const response = await fetch(
        "https://proput-db-4vtf.onrender.com/surveyor_signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...surveyorProfile, user_id: userId }),
        }
      );

      if (!response.ok) throw new Error("Failed to submit surveyor profile");
      dispatch(nextStep());
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <WelcomeStep
            userType={userType}
            onNext={() => dispatch(nextStep())}
          />
        );
      case 1:
        return (
          <HowHeardStep
            value={howHeardAbout}
            onChange={(value) => dispatch(setHowHeardAbout(value))}
            onNext={() => dispatch(nextStep())}
          />
        );
      case 2:
        switch (userType) {
          case "lawyer":
            return (
              <LawyerProfileStep
                profile={lawyerProfile}
                onChange={(values) => dispatch(updateLawyerProfile(values))}
                onSubmit={handleLawyerSubmit}
              />
            );
          case "surveyor":
            return (
              <SurveyorProfileStep
                profile={surveyorProfile}
                onChange={(values) => dispatch(updateSurveyorProfile(values))}
                onSubmit={handleSurveyorSubmit}
              />
            );
          default:
            return (
              <CompleteProfileStep
                onNext={() => {
                  dispatch(closeOnboarding());
                  navigate("/dashboard/setting/profile");
                }}
              />
            );
        }
      case 3:
        return (
          <CompleteProfileStep
            onNext={() => {
              dispatch(closeOnboarding());
              navigate("/dashboard/setting/profile");
            }}
          />
        );
      default:
        return null;
    }
  };

  if (!isModalOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
        >
          {renderStep()}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

// Step Components
const WelcomeStep = ({ userType, onNext }) => (
  <div className="text-center">
    <Lottie
      animationData={welcomeAnimation}
      loop={true}
      className="w-64 h-64 mx-auto"
    />
    <h2 className="text-2xl font-bold mb-4">
      Welcome to ProPut, {userType}!
    </h2>
    <p className="text-gray-600 mb-6">
      We're excited to have you join our community. Let's get you started!
    </p>
    <Button onClick={onNext} className="w-full">
      Get Started
    </Button>
  </div>
);

const HowHeardStep = ({ value, onChange, onNext }) => (
  <div>
    <Lottie
      animationData={surveyAnimation}
      loop={true}
      className="w-48 h-48 mx-auto"
    />
    <h2 className="text-2xl font-bold mb-4">How did you hear about us?</h2>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-2 border rounded-md mb-4"
    >
      <option value="">Select an option</option>
      <option value="social">Social Media</option>
      <option value="friend">Friend/Colleague</option>
      <option value="search">Search Engine</option>
      <option value="other">Other</option>
    </select>
    <Button onClick={onNext} disabled={!value} className="w-full">
      Next
    </Button>
  </div>
);

// Continue with LawyerProfileStep, SurveyorProfileStep, and CompleteProfileStep... 