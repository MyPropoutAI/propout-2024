import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./lib/Router";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { ThirdwebProvider } from "thirdweb/react";
import { AuthProvider } from "./contexts/AuthContext";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThirdwebProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
        </PersistGate>
      </Provider>
    </ThirdwebProvider>
  </React.StrictMode>
);
