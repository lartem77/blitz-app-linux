import { app, BrowserWindow, shell } from "electron";
import path from "node:path";

const isDev = Boolean(process.env.VITE_DEV_SERVER_URL);

function assertLinuxRuntime(): void {
  if (process.platform !== "linux" && !process.env.BLITZ_ALLOW_NON_LINUX) {
    throw new Error("Blitz for Linux only runs on Linux. Set BLITZ_ALLOW_NON_LINUX=1 for CI smoke checks.");
  }
}

async function createWindow(): Promise<void> {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 820,
    minWidth: 960,
    minHeight: 640,
    title: "Blitz",
    backgroundColor: "#f7f8fb",
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    }
  });

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    void shell.openExternal(url);
    return { action: "deny" };
  });

  if (isDev && process.env.VITE_DEV_SERVER_URL) {
    await mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    await mainWindow.loadFile(path.join(__dirname, "../renderer/index.html"));
  }
}

app.whenReady().then(async () => {
  assertLinuxRuntime();
  await createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      void createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  app.quit();
});
