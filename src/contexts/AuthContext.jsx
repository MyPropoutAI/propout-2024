import { useReducer, createContext, useEffect } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        user: action.payload,
      };
    case "LOGOUT":
      return {
        user: null,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [auth, dispatch] = useReducer(authReducer, {
    isLoggedIn: false,
    user: null,
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    //console.log(user);
    if (user) {
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);
  console.log(auth);
  return (
    <AuthContext.Provider value={{ ...auth, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
