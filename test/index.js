(async () => {
  const download = require("../");
  const fonts = [
    "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap",
    "https://fonts.googleapis.com/css?family=Montserrat&subset=latin-ext&display=swap",
  ];
  const resp = await download(fonts, {
    publicFolder: "public",
    fontsFolder: "fonts",
    styleFolder: "style",
    resetFolder: true,
    prevent: true,
    outputData: {
      name: "data.json",
    },
  });
  // console.log(resp); //data.json output
})();
