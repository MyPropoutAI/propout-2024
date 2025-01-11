import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./userSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import userStatusReducer from "./features/userStatusSlice";
import inspectionReducer from "./features/inspectionSlice";
import onboardingReducer from "./features/onboardingSlice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedReducer,
    userStatus: userStatusReducer,
    inspection: inspectionReducer,
    onboarding: onboardingReducer,
  },
});

export const persistor = persistStore(store);
