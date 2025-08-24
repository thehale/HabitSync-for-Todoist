<!--
 Copyright (c) 2025 Joseph Hale
 
 This Source Code Form is subject to the terms of the Mozilla Public
 License, v. 2.0. If a copy of the MPL was not distributed with this
 file, You can obtain one at https://mozilla.org/MPL/2.0/.
-->

## Configuring Aliases

Install `"babel-plugin-module-resolver": "^5.0.2"`

Update `tsconfig.json`
```jsonc
{
    // ...
    "compilerOptions": {
      "paths": {
        "@components/*": ["./lib/components/*"]
      }
    }
}
```

Update `babel.config.js`
```js
module.exports = {
  // ...
  plugins: [
    // ...
    [
      'module-resolver',
      {
        extensions: ['.ios.js', '.android.js', '.ios.jsx', '.android.jsx', '.js', '.jsx', '.json', '.ts', '.tsx'],
        root: ['.'],
        alias: {
          '@components': './lib/components',
        },
      },
    ],
  ]   
}
```



## Packages

Dependencies:
```
"@ungap/structured-clone": "^1.3.0",
"lodash": "^4.17.21", // for `debounce`
"color": "^5.0.0",
```

Peer Dependencies:
```
"react": "18.2.0"
"react-native": "0.72.6"
"react-native-safe-area-context": "^4.7.4"
```

Dev Dependencies:
```
"@types/lodash": "^4.17.20",
"@types/ungap__structured-clone": "^1.2.0",
```