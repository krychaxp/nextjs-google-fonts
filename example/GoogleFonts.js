import React from "react";
import { googleFonts } from "../public/fonts/data.json";
export default function index() {
  return (
    <>
      {googleFonts.fonts.map((v) => (
        <link
          key={v}
          rel="preload"
          href={v}
          as="font"
          type="font/ttf"
          crossOrigin=""
        />
      ))}
      {googleFonts.style.map((v) => (
        <React.Fragment key={v}>
          <link rel="stylesheet" href={v} />
          <link rel="preload" as="style" href={v} />
        </React.Fragment>
      ))}
    </>
  );
}
