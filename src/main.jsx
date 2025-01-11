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
import { QueryClient, QueryClientProvider } from "react-query";
//import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
     
      refetchOnReconnect: false,
      retry: 3,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThirdwebProvider>
      
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <AuthProvider>
            <QueryClientProvider client={queryClient}>
              <RouterProvider router={router} />
              </QueryClientProvider>
              {/* <ReactQueryDevtools initialIsOpen={false} /> */}
            </AuthProvider>
          </PersistGate>
        </Provider>
     
    </ThirdwebProvider>
  </React.StrictMode>
);
