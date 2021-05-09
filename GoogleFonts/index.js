const React = require("react");
const { googleFonts } = require("../data.json");
if (googleFonts.fonts.length === 0) {
  console.log(
    "> [nextjs-google-fonts] You dont have any google fonts in your project"
  );
}
exports.GoogleFonts = () =>
  React.createElement(
    React.Fragment,
    null,
    /*#__PURE__*/ React.createElement("style", null, googleFonts.style),
    googleFonts.fonts.map((v) =>
      /*#__PURE__*/ React.createElement("link", {
        key: v,
        rel: "preload",
        href: v,
        as: "font",
        type: "font/woff2",
        crossOrigin: "",
      })
    )
  );
