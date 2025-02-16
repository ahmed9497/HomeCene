export {};

declare global {
  interface Window {
    TabbyPromo?: {
      attach: () => void;
    };
  }
}
