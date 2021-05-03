const React = require("react");
const { googleFonts } = require("../data.json");
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
