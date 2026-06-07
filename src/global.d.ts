export {};

declare global {
  interface Window {
    blitz?: {
      platform: {
        os: NodeJS.Platform;
        arch: string;
        release: string;
        isLinux: boolean;
      };
      versions: {
        node: string;
        chrome: string;
        electron: string;
      };
    };
  }
}
