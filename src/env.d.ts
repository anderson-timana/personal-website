/// <reference types="astro/client" />

interface Window {
  turnstile: {
    reset: () => void;
    render: (container: string | HTMLElement, options: object) => string;
    getResponse: (widgetId?: string) => string;
    remove: (widgetId?: string) => void;
  };
}

declare module "astro:actions" {
  export const actions: any;
}
