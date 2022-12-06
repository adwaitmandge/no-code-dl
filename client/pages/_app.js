import "../styles/globals.css";
import { AppProps } from "next/app";
import { useContext, useState } from "react";
import React from "react";

const AuthContext = React.createContext();

export default function App({ Component, pageProps }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <Component {...pageProps} AuthContext={AuthContext} />
    </AuthContext.Provider>
  );
}
