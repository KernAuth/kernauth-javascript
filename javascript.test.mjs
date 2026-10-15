import assert from "node:assert/strict";
import { test } from "node:test";
import { apiMessage, checkBody } from "./kernauth.mjs";

test("JavaScript check body", () => {
  assert.deepEqual(checkBody("pub_harbor_desktop", "KERN-ABCD-EFGH-IJKL-MNOP"), {
    protocol_version: 1,
    public_app_id: "pub_harbor_desktop",
    client_version: "1.0.0",
    license_key: "KERN-ABCD-EFGH-IJKL-MNOP",
  });
  assert.equal(apiMessage({ error: { message: "Update required" } }, "no"), "Update required");
  assert.equal(apiMessage({}, "no"), "no");
});
