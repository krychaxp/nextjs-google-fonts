const { googleFonts } = require("../data.json");
exports.googleFonts = googleFonts;
exports.makeFontType = (a) => "font/" + a.split(".").slice(-1)[0];
