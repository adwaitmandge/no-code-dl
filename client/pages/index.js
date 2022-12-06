import Link from "next/link";
import { useContext, useEffect, useState } from "react";

const Home = ({ AuthContext }) => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  const isAuth = async () => {
    try {
      const allCookies = document.cookie.split(";");
      for (let item of allCookies) {
        if (item.startsWith("token=")) {
          localStorage.setItem("token", item.slice(6));
          break;
        }
      }
      const res = await fetch("http://localhost:5000/auth/is-verify", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "jwt-token": localStorage.getItem("token"),
        },
      });
      const result = await res.json();
      result === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    isAuth();
  }, []);

  return (
    <>
      <h1>Home</h1>
      {!isAuthenticated && <Link href="/auth/login">Login</Link>}
      {!isAuthenticated && <Link href="/auth/register">Register</Link>}
    </>
  );
};

export default Home;