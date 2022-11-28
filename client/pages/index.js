import Link from "next/link";
import { useContext, useEffect, useState } from "react";

const Home = () => {
  return (
    <>
      <h1>Home</h1>
      <Link href="/auth/login">Login</Link>
      <Link href="/auth/register">Register</Link>
    </>
  );
};

export default Home;
