import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Menu } from "../../components/Menu";
import { useSelector, useDispatch } from "react-redux";
import { useUsers } from "../../contexts/hooks/useGetAllUsers";
import jwt from "jsonwebtoken";
import InfoBar from "../../components/InforBar";
import { OnboardingModal } from "../../components/onboarding/OnboardingModal";
import { useEffect } from "react";
import { openOnboarding } from "../../redux/features/onboardingSlice";

const Root = () => {
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
    // Show onboarding modal only on first visit when status is false
    if (userData?.status === false && !hasSeenOnboarding) {
      dispatch(openOnboarding(userData?.role?.toLowerCase())); // Pass user role as userType
    }
  }, [userData, hasSeenOnboarding, dispatch]);

  return (

    <div className="overflow-x-hidden">
      {/* Show InfoBar only if status is false and user has seen onboarding */}
      {userData?.status === false && hasSeenOnboarding ? <InfoBar /> : null}
      <Header />
      <div className="min-h-[60vh]">
        <Outlet />
      </div>
      <div className="fixed top-[40%] -translate-y-1/2 right-4">
        <Menu />
      </div>
      <OnboardingModal />
      <Footer />
    </div>
  );
};

export default Root;
