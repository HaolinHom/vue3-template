/// <reference types="vite/client" />

interface ImportMeta {
  readonly env: {
    readonly MODE: string;
    readonly BASE_URL: string;
    readonly PROD: string;
    readonly DEV: string;
    readonly APP_BASE_URL: string;
    readonly APP_OBS_BUCKET: string;
    readonly APP_CDN_URL: string;
    readonly APP_STATIC_RESOURCES: string;
    readonly APP_CLIENT_ID: string;
    readonly APP_CLIENT_SECRET: string;
    readonly APP_BAIDU_MAP_AK: string;
    readonly APP_YSF_KEY: string;
  };
}
