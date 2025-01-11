import { useUserStatus } from "../contexts/hooks/useUserStatus";

const SomeComponent = () => {
  const userData = // ... get user data
  const safeUserData = // ... get safe user data
  
  const { userStatus, kycStatus, isVerified } = useUserStatus(userData, safeUserData);

  return (
    <div>
      {!isVerified && (
        <div className="bg-yellow-100 p-4 rounded-md">
          {userStatus !== "active" && (
            <p>Please verify your account to continue</p>
          )}
          {kycStatus !== "verified" && (
            <p>Please complete KYC verification</p>
          )}
        </div>
      )}
      
      {/* Rest of your component */}
    </div>
  );
}; 