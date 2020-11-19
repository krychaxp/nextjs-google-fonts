# nextjs-google-fonts

## Why nextjs-google-fonts ?

This plugin download google fonts locally, so your next.js app doesn't want to download google fonts data from every enter to your page.

## Installing

Using npm:

```
$ npm install nextjs-google-fonts
```

## How to use

Firstly, you must create new file e.g.: `./scripts/google-fonts.js` on your root path and pase this code:

```js
(async () => {
  const download = require("nextjs-google-fonts");
  const fonts=["https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"]
  const options={
    publicFolder: "public", // next.js 'public' folder
    fontsFolder: "fonts", // folder name where data should be saved (fonts+styles)
    styleFolder: "style", // folder with .css from google fonts url
    resetFolder: true, // delete all files from the "fontsFolder" with downloaded data when downloading fonts again
    prevent: true, // prevent download fonts for every your 'npm run dev'
    outputData: {
      name: "data.json", // name of file where be save your data about fonts (for your preverences ;) )
      //path: '../..' , // the path where 'data.json' will be located. If is empty its return 'publicFolder'+'fontsFolder' destination
    },
  }
  await download(fonts,options);
})();
```

- `fonts` - Array of google fonts urls
- `options` - Object (this parametrs are default, so if you don't want to change something, you can delete this variable):

```bash
.
├── public
│   └── fonts
│        ├── fonts
│        │   ├── ...woff / .ttf
│        ├── style
│        │   ├── Roboto.css
│        └── data.json
├── src
├── .gitignore
├── next.config.js
...
```
    
Next, you must run this code, so enter to `next.config.js` and add this part of code:

```js
module.exports = {
  ...,
  webpack: (config, {isServer}) => {
    if (isServer) {
      require("./scripts/google-fonts");
    }
    return config;
  },
  ...,
};
```

## Example

> Code from :'nextjs-google-fonts/example'

If you font to create your component, name it like `GoogleFonts.js` and paste this code:

```js
import React from "react";
import { googleFonts } from "nextjs-google-fonts/googleFonts";
export default function index() {
  return (
    <>
      {googleFonts.fonts.map((v) => (
        <link
          key={v}
          rel="preload"
          href={v}
          as="font"
          type="font/ttf"
          crossOrigin=""
        />
      ))}
      {googleFonts.style.map((v) => (
        <React.Fragment key={v}>
          <link rel="stylesheet" href={v} />
          <link rel="preload" as="style" href={v} />
        </React.Fragment>
      ))}
    </>
  );
}
```

Then you should add this component into `<Head>` from `next/head`, e.g.:

```js
import React from 'react'
import Head from 'next/head'
import GoogleFonts from './GoogleFonts'
export default function index() {
    return (
        <Head>
            <GoogleFonts/>
        </Head>
    )
}
```

## Resources

* [Github](https://github.com/krychaxp/nextjs-google-fonts)

## Author - Krychaxp

* [Github](https://github.com/krychaxp)
* [Website](https://krychaxp.pl/?ref=nextjs-google-fonts-readme)
 
## License

[MIT](LICENSE)
