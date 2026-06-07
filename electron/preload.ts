import { contextBridge } from "electron";
import os from "node:os";

contextBridge.exposeInMainWorld("blitz", {
  platform: {
    os: process.platform,
    arch: process.arch,
    release: os.release(),
    isLinux: process.platform === "linux"
  },
  versions: {
    node: process.versions.node,
    chrome: process.versions.chrome,
    electron: process.versions.electron
  }
});
