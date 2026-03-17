# Frontend Configuration

This directory contains frontend-level configuration files used at build time or
runtime by the React application. Environment-specific secrets belong in `.env` (never
committed); files here capture non-secret, version-controlled settings.

---

## Files

| File | Purpose |
|------|---------|
| _(none yet)_ | Add shared, non-secret config constants here |

## Usage guidelines

* **Never** store secrets, API keys, or passwords in this directory.
* Values that differ between environments (development / staging / production) belong
  in the corresponding `.env` file.
* TypeScript constants that are truly environment-agnostic (e.g. pagination defaults,
  feature-flag names) can live here and be imported directly.

## Example

```ts
// config/app.config.ts
export const APP_CONFIG = {
  paginationPageSize: 15,
  maxFileUploadMb: 10,
  supportEmail: 'support@neverlandstudio.id',
} as const;
```
