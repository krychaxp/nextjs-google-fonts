const { createElement, Fragment } = require("react");
const { googleFonts } = require("../data.json");

const makeFontType = (a) => "font/" + a.split(".").slice(-1)[0];

exports.GoogleFonts = () =>
  createElement(
    Fragment,
    null,
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
    ),
    googleFonts.fonts.map((v) =>
      createElement("link", {
        key: v,
        rel: "preload",
        href: v,
        as: "font",
        type: makeFontType(v),
        crossOrigin: "",
      })
    )
  );
