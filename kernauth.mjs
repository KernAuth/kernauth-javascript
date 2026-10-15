export function checkBody(appId, licenseKey) {
  return {
    protocol_version: 1,
    public_app_id: appId,
    client_version: "1.0.0",
    license_key: licenseKey,
  };
}

export function apiMessage(payload, fallback) {
  const message = payload?.error?.message;
  return typeof message === "string" && message !== "" ? message : fallback;
}

export class KernAuth {
  constructor(api, appId) {
    this.api = api;
    this.appId = appId;
    this.message = "";
    this.expiresAt = null;
  }

  async check(licenseKey) {
    const response = await fetch(`${this.api}/v1/client/check`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(checkBody(this.appId, licenseKey)),
    });
    const payload = await response.json().catch(() => null);
    if (!response.ok || payload?.valid !== true) {
      this.message = apiMessage(payload, `check failed (${response.status})`);
      this.expiresAt = null;
      return false;
    }
    this.message = "License is active";
    this.expiresAt = typeof payload.expires_at === "string" ? payload.expires_at : null;
    return true;
  }
}
