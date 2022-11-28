import "../styles/globals.css";
import { AppProps } from "next/app";
import { useContext, useState } from "react";
import React from "react";

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
