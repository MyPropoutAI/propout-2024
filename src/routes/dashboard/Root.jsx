import { Outlet } from "react-router-dom";
import Leftsidebar from "./Leftsidebar";
import Rightsidebar from "./Rightsidebar";
import AuthHeader from "../../components/AuthHeader";
import { Toaster } from "../../components/ui/sonner";
import { useSelector, useDispatch } from "react-redux";
import { useUsers } from "../../contexts/hooks/useGetAllUsers";
import jwt from "jsonwebtoken";
import InfoBar from "../../components/InforBar";
import { OnboardingModal } from "../../components/onboarding/OnboardingModal";
import { useEffect } from "react";
import { openOnboarding } from "../../redux/features/onboardingSlice";

const DashboardRoot = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const decodedUser = jwt.decode(user);
  const hasSeenOnboarding = useSelector(
    (state) => state.onboarding.hasSeenOnboarding
  );

  const { data: users } = useUsers();
  const usersData = users ? users.user : [];

  const userData = Array.isArray(usersData)
    ? usersData.find((user) => user.id === decodedUser?.id)
    : null;

  useEffect(() => {
    if (userData?.status === false && !hasSeenOnboarding) {
      dispatch(openOnboarding(userData?.role?.toLowerCase()));
    }
  }, [userData, hasSeenOnboarding, dispatch]);

  return (
    <div>
      {userData?.status === false && hasSeenOnboarding ? <InfoBar /> : null}
      <AuthHeader />
      <div className="flex bg-slate-100 min-h-[calc(100vh-100px)] p-6 gap-10">
        <div className="hidden md:block">
          <Leftsidebar />
        </div>
        <div className="flex-1 flex flex-col w-[90%] lg:w-full justify-center">
          <Outlet />
        </div>
        <div className="hidden lg:block">
          <Rightsidebar />
        </div>
        <Toaster />
      </div>
      <OnboardingModal />
    </div>
  );
};

export default DashboardRoot;
