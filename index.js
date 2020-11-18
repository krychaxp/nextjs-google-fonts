const fs = require("fs-extra");
const path = require("path");
const axios = require("axios");
const del = require("del");
const text = "> [nextjs-google-fonts]";
const http = require("http");
let googleFonts={}
const downloadFonts = async (fonts = [], options = {}) => {
  if (fonts.length == 0) {
    console.log("Nothing Google Fonts Downloaded");
    return;
  }
  /********* */
  options.publicFolder = options.publicFolder || "public";
  options.fontsFolder = options.fontsFolder || "fonts";
  options.styleFolder = options.styleFolder || "style";
  options.resetFolder =
    typeof options.resetFolder === "boolean" ? options.resetFolder : true;
  options.prevent =
    typeof options.prevent === "boolean" ? options.prevent : true;
  options.outputData = options.outputData || {};
  options.outputData.name = options.outputData.name || "data.json";
  options.outputData.path =
    options.outputData.path ||
    path.join(options.publicFolder, options.fontsFolder);
  options.outputData.full = path.join(
    options.outputData.path,
    options.outputData.name
  );
  /********* */
  const output = {
    googleFonts: { fonts: [], style: [] },
    arguments: { fonts: fonts, options: options },
    buildTime: new Date().toISOString(),
  };
  /********* */
  const {
    publicFolder,
    fontsFolder,
    styleFolder,
    resetFolder,
    outputData,
    prevent,
  } = options;
  /********* */
  if (prevent && fs.existsSync(outputData.full)) {
    const last = JSON.parse(fs.readFileSync(outputData.full, "utf8"));
    if (last.arguments.fonts.join() == fonts.join()) {
      console.log(text + " (Prevent download again) - Fonts are already saved");
      return last;
    }
  }
  /********* */
  if (resetFolder) {
    del.sync([path.join(publicFolder, fontsFolder)]);
  }
  /********* */
  for (let i = 0; i < fonts.length; i++) {
    const v = fonts[i];
    try {
      const { data } = await axios.get(v);
      const urls = data.match(/url([^)]*)/g).map((v) => v.slice(4));
      const newData = data.replace(
        /https:\/\/fonts\.gstatic\.com/g,
        `/${fontsFolder}`
      );
      const name = v.match(/\?family=(\w+)/)[1];
      const css = path.join(fontsFolder, styleFolder, name + ".css");
      fs.outputFileSync(path.join(publicFolder, css), newData);
      output.googleFonts.style.push(`/${css}`);
      for (let j = 0; j < urls.length; j++) {
        const va = urls[j];
        const name = va.replace("https://fonts.gstatic.com", "");
        http.get(
          va.replace('s',''),
          function (response) {
            const fp=path.join(process.cwd(),publicFolder,fontsFolder,name)
            fs.outputFileSync(fp,'')
            response.pipe(fs.createWriteStream(fp));
          }
        );
        const font = path.join(fontsFolder, name);
        output.googleFonts.fonts.push(`/${font}`);
      }
    } catch (e) {
      console.log(e);
      console.log(`${text} Cannot download following font:${v}`);
    }
  }
  console.log(text + " Successfully end!");
  let end = JSON.stringify(output, null, 2).replace(/\\\\/g, "/");
  googleFonts=end
  fs.outputFileSync(outputData.full, end);
  fs.outputFileSync('googleFonts/index.json', end);
  return JSON.parse(end);
};
module.exports = downloadFonts;
module.exports.googleFonts = require('./googleFonts').googleFonts;
