const fs = require("fs");
const path = require("path");
const axios = require("axios");
const log = (a) => console.log("> [nextjs-google-fonts] " + a);

const fetcher = (url, prev) =>
  axios({
    url,
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36",
    },
    ...prev,
  });

const downloadFonts = async ({
  fonts = [],
  publicFolder = "public",
  fontsFolder = "fonts",
  prevent = true,
  remove = true,
}) => {
  if (fonts.length == 0) {
    log("None Google Fonts Downloaded (Array is empty)");
    return;
  }
  const publicPath = path.resolve(publicFolder);
  const fontsPath = path.join(publicPath, fontsFolder);
  const dataPath = path.join(fontsPath, "data.json");
  const fontsArray = [];
  let styles = "";

  if (fs.existsSync(dataPath)) {
    const lastFile = fs.readFileSync(dataPath, "utf8");
    fs.writeFileSync(path.join(__dirname, "data.json"), lastFile);
    if (prevent) {
      const last = JSON.parse(lastFile);
      if (last.arguments.fonts.join() == fonts.join()) {
        log("(Prevent download again) - Fonts have been already saved");
        return;
      }
      if (remove) {
        fs.rmdirSync(fontsPath, { recursive: true });
      }
    }
  }

  /********* */
  for (let i = 0; i < fonts.length; i++) {
    const currentFontUrl = fonts[i];
    try {
      const { data } = await fetcher(currentFontUrl);
      const urls = data.match(/url([^)]*)/g).map((v) => v.slice(4));
      const newData = data
        .replace(/https:\/\/fonts\.gstatic\.com/g, `/${fontsFolder}`)
        .replace(/[\n ]/g, "");
      styles += newData;
      for (let j = 0; j < urls.length; j++) {
        const va = urls[j];
        const name = va.replace("https://fonts.gstatic.com/", "");
        fs.mkdirSync(
          path.join(fontsPath, name.split("/").slice(0, -1).join("/")),
          { recursive: true }
        );
        const { data } = await fetcher(va, { responseType: "arraybuffer" });
        fs.writeFileSync(path.join(fontsPath, name), data);
        fontsArray.push(`/${fontsFolder}/${name}`);
      }
    } catch (e) {
      log(`Cannot download following font:${currentFontUrl}`);
    }
  }

  const output = {
    googleFonts: { fonts: fontsArray, style: styles },
    arguments: {
      fonts,
      publicFolder,
      fontsFolder,
      prevent,
      remove,
    },
    buildTime: new Date().toISOString(),
  };

  const end = JSON.stringify(output, null, 2);
  fs.writeFileSync(dataPath, end);
  fs.writeFileSync(path.join(__dirname, "data.json"), end);
  log("Successfully end!");
};

exports.withGoogleFonts = (config) => {
  const { googleFonts } = config;
  if (!googleFonts) {
    log(`You didn't add 'googleFonts' into 'next.config.js'`);
    return config;
  }
  try {
    downloadFonts(googleFonts);
  } catch (error) {
    log("Unexpected error when downloading Google Fonts");
  } finally {
    return config;
  }
};
