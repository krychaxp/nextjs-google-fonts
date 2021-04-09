import React from "react";
import Head from "next/head";
import { GoogleFonts } from "nextjs-google-fonts/GoogleFonts";

export default function index() {
  return <Head>{GoogleFonts()}</Head>;
}
