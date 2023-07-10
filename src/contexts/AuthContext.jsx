import { createContext, useContext, useReducer } from "react";

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

const AuthContext = createContext();

const reducer = (curState, action) => {
  switch (action.type) {
    case "login":
      return { ...curState, user: action.payload, isLoggedIn: true };
    case "logout":
      return { ...curState, user: null, isLoggedIn: false };

    default:
      return curState;
  }
};
const initialState = {
  user: null,
  isLoggedIn: false,
};

const AuthProvider = ({ children }) => {
  const [{ user, isLoggedIn }, dispatch] = useReducer(reducer, initialState);

  const login = (email, pass) => {
    if (email === FAKE_USER.email && pass === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
    }
  };
  const logout = () => {
    dispatch({ type: "logout" });
  };
  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };
