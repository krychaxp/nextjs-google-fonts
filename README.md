# nextjs-google-fonts

## Why nextjs-google-fonts ?

This plugin download google fonts locally, so your next.js app doesn't want to download google fonts data from every enter to your page.

## Installing

Using npm:

```
$ npm install nextjs-google-fonts
```

# Fast setup

### Add options into `next.config.js`:

```js
const { withGoogleFonts } = require("nextjs-google-fonts");

module.exports = withGoogleFonts({
  googleFonts: {
    fonts: [
      "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap",
    ],
  },
});
```

### Add fonts into `<Head/>`:

```jsx
import Head from "next/head";
import { GoogleFonts } from "nextjs-google-fonts/GoogleFonts";

export default function index() {
  return (
    <Head>
      {GoogleFonts()}
    </Head>
  );
}
```

<br/>
<br/>
<br/>

# Advanced setup

```js
const { withGoogleFonts } = require("nextjs-google-fonts");

module.exports = withGoogleFonts({
  googleFonts: {
    fonts: [], // required
    publicFolder: "public", // optional
    fontsFolder: "fonts", // optional
    prevent: true, // optional
    remove: true, // optional
  },
});
```

- `fonts` - (default []) Array of google fonts urls (required)
- `publicFolder` - (default "public") next.js 'public' folder
- `fontsFolder` - (default "fonts") folder name where data should be saved (fonts+styles)
- `prevent` - (default true) prevent download/update fonts for every your 'npm run dev'
- `remove` - (default true) remove previous fonts if you change something in 'fonts' array (works only if 'prevent' is 'true')

<br/>
<br/>
<br/>

## Structure of downloaded fonts (with default parameters)

```bash
.
├── public
│   └── fonts
│        ├── s
│        │   └── ...woff2
│        └── data.json
├── src
├── .gitignore
├── next.config.js
...
```

## Resources

- [Github](https://github.com/krychaxp/nextjs-google-fonts)

## Author - Krychaxp

- [Github](https://github.com/krychaxp)
- [Website](https://krychaxp.pl/?ref=nextjs-google-fonts-readme)

## License

[MIT](LICENSE)
