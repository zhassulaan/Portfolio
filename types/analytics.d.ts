// The analytics script (see plugins/analytics.ts) defines window.plausible
// when it loads; before that, or when analytics is switched off, it is
// simply undefined.
export {};

declare global {
  interface Window {
    plausible?: (event_name: string, options?: { props?: Record<string, string | number | boolean> }) => void;
  }
}
