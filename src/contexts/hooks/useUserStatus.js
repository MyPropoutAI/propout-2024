import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setUserStatus,
  setKycStatus,
  selectUserStatus,
  selectKycStatus,
  selectIsVerified,
} from "../../redux/features/userStatusSlice";

export const useUserStatus = (userData, safeUserData) => {
  const dispatch = useDispatch();
  const userStatus = useSelector(selectUserStatus);
  const kycStatus = useSelector(selectKycStatus);
  const isVerified = useSelector(selectIsVerified);

  useEffect(() => {
    if (userData?.status) {
      dispatch(setUserStatus(userData.status));
    }
  }, [userData?.status, dispatch]);

  useEffect(() => {
    if (safeUserData?.kyc_status) {
      dispatch(setKycStatus(safeUserData.kyc_status));
    }
  }, [safeUserData?.kyc_status, dispatch]);

  return {
    userStatus,
    kycStatus,
    isVerified,
  };
};
