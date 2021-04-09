const fs = require("fs-extra");
const path = require("path");
const axios = require("axios");
const http = require("http");
const log = (a) => console.log("> [nextjs-google-fonts] " + a);

const downloadFonts = async ({
  fonts = [],
  publicFolder = "public",
  fontsFolder = "fonts",
  styleFolder = "style",
  prevent = true,
  remove = true,
}) => {
  if (fonts.length == 0) {
    log("None Google Fonts Downloaded (Array is empty)");
    return;
  }

  const dataPath = `/${publicFolder}/${fontsFolder}/data.json`;
  const dataFullPath = path.join(process.cwd(), dataPath);

  const output = {
    googleFonts: { fonts: [], style: [] },
    arguments: { fonts, publicFolder, fontsFolder, styleFolder, prevent },
    buildTime: new Date().toISOString(),
  };

  if (fs.existsSync(dataFullPath)) {
    const lastFile = fs.readFileSync(dataFullPath, "utf8");
    fs.writeFileSync(path.join(__dirname, "data.json"), lastFile);
    if (prevent) {
      const last = JSON.parse(lastFile);
      if (last.arguments.fonts.join() == fonts.join()) {
        log("(Prevent download again) - Fonts have been already saved");
        return;
      }
      if (remove) {
        fs.removeSync(path.join(process.cwd(), publicFolder, fontsFolder));
      }
    }
  }
  /********* */
  for (let i = 0; i < fonts.length; i++) {
    const currentFontUrl = fonts[i];
    try {
      const { data } = await axios.get(currentFontUrl, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36",
        },
      });
      const urls = data.match(/url([^)]*)/g).map((v) => v.slice(4));
      const newData = data.replace(
        /https:\/\/fonts\.gstatic\.com/g,
        `/${fontsFolder}`
      );
      const name = currentFontUrl.match(/\?family=(\w+)/)[1];
      const css = `/${fontsFolder}/${styleFolder}/${name}.css`;
      fs.outputFileSync(path.join(process.cwd(), publicFolder, css), newData);
      output.googleFonts.style.push(css);

      for (let j = 0; j < urls.length; j++) {
        const va = urls[j];
        const name = va.replace("https://fonts.gstatic.com/", "");
        http.get(va.replace("s", ""), function (response) {
          const fp = path.join(process.cwd(), publicFolder, fontsFolder, name);
          fs.outputFileSync(fp, "");
          response.pipe(fs.createWriteStream(fp));
        });
        output.googleFonts.fonts.push(`/${fontsFolder}/${name}`);
      }
    } catch (e) {
      log(`Cannot download following font:${currentFontUrl}`);
    }
  }
  const end = JSON.stringify(output, null, 2);
  fs.outputFileSync(dataFullPath, end);
  fs.writeFileSync(path.join(__dirname, "data.json"), end);
  log("Successfully end!");
};

exports.withGoogleFonts = async (config) => {
  const { googleFonts } = config;
  if (!googleFonts) {
    log(`You didn't add 'googleFonts' into 'next.config.js'`);
    return config;
  }
  try {
    await downloadFonts(googleFonts);
  } catch (error) {
    log("Unexpected error when downloading Google Fonts");
  }
  return config;
};
