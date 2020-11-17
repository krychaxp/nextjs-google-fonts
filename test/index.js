(async () => {
  const download = require("../");
  const fonts = [
    "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap",
    "https://fonts.googleapis.com/css?family=Montserrat&subset=latin-ext&display=swap",
  ];
  await download(fonts, { prevent: false });
})();
