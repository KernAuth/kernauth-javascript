import { readSync } from "node:fs";
import { KernAuth } from "./kernauth.mjs";

const app = new KernAuth("https://api.kernauth.com", "__PUBLIC_APP_ID__");

function licenseKey() {
  const fromEnv = globalThis.process.env.KERN_LICENSE_KEY?.trim();
  if (fromEnv) return fromEnv;
  if (globalThis.process.stdin.isTTY) globalThis.process.stdout.write("Enter license: ");
  const buffer = Buffer.alloc(256);
  let text = "";
  for (;;) {
    const count = readSync(0, buffer, 0, buffer.length, null);
    if (count === 0) break;
    text += buffer.subarray(0, count).toString("utf8");
    if (text.includes("\n")) break;
  }
  return text.split("\n")[0]?.trim() ?? "";
}

const key = licenseKey();
if (!await app.check(key)) {
  globalThis.console.log(app.message);
  globalThis.process.exit(1);
}
globalThis.console.log("Status: active");
globalThis.console.log(app.expiresAt ? `Expires: ${app.expiresAt}` : "Expires: Lifetime");
