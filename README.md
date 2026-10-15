# KernAuth JavaScript example

Example for Node.js 20 or newer. This file calls validate and checks the Ed25519 signature in Node.

## Add it

Paste the public app ID, key ID, and public key from Developers over the placeholders in `javascript.mjs`.

```
node --test javascript.test.mjs
```

Run the example with `KERN_LICENSE_KEY` and `KERN_INSTALLATION_ID` set. Persist one installation ID per device.

## Instance

```js
const app = new KernAuth(
  "https://api.kernauth.com",
  "__PUBLIC_APP_ID__",
  "__KEY_ID__",
  "__PUBLIC_KEY__",
);
```

## Validate

```js
if (!await app.validate(license, installation)) {
  throw new Error(app.message);
}
```

A patched program can still skip the check. These examples do not add anti-debug or anti-VM code.

Documentation: https://kernauth.apidog.io
