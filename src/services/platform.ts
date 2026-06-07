export interface PlatformSummary {
  isLinux: boolean;
  label: string;
}

export function platformSummary(): PlatformSummary {
  const platform = window.blitz?.platform;

  if (!platform) {
    return {
      isLinux: false,
      label: "Browser preview"
    };
  }

  return {
    isLinux: platform.isLinux,
    label: platform.isLinux ? `Linux ${platform.release}` : `${platform.os} preview`
  };
}
