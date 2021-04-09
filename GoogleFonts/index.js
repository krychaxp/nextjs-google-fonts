const { createElement, Fragment } = require("react");
const { googleFonts } = require("../data.json");

exports.GoogleFonts = () =>
  createElement(
    Fragment,
    null,
    googleFonts.fonts.map((v) =>
      createElement("link", {
        key: v,
        rel: "preload",
        href: v,
        as: "font",
        type: "font/ttf",
        crossOrigin: "",
      })
    ),
    googleFonts.style.map((v) =>
      createElement(
        Fragment,
        {
          key: v,
        },
        createElement("link", {
          rel: "stylesheet",
          href: v,
        }),
        createElement("link", {
          rel: "preload",
          as: "style",
          href: v,
        })
      )
    )
  );
