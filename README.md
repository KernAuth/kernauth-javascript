# KernAuth JavaScript example

Paste the public app ID from Developers into `index.mjs`. Node.js 20 or newer.

## Start

```js
const app = new KernAuth("https://api.kernauth.com", "__PUBLIC_APP_ID__");
```

Type the license at the prompt. `KERN_LICENSE_KEY` skips the prompt. The program checks that the key is valid and prints when it expires. It does not save a computer.

## Run

```
node --test javascript.test.mjs
node index.mjs
```

A modified program can still skip the check.

Documentation: https://kernauth.apidog.io
