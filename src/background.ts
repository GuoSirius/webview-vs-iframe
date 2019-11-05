"use strict";

import { app, protocol, BrowserWindow } from "electron";
import {
  createProtocol,
  installVueDevtools
} from "vue-cli-plugin-electron-builder/lib";
const isDevelopment = process.env.NODE_ENV !== "production";

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win: BrowserWindow | null;

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } }
]);

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1000,
    height: 680,
    title: "Electron",
    // show: false,
    useContentSize: true,
    center: true,
    frame: true,
    titleBarStyle: "hidden", // hidden hiddenInset customButtonsOnHover
    backgroundColor: "#80ffff",
    transparent: true,
    opacity: 1,
    fullscreenWindowTitle: true,
    thickFrame: true,
    webPreferences: {
      devTools: true, // 允许打开开发者工具
      defaultEncoding: "utf-8",
      sandbox: false,
      nodeIntegration: true, // 注意安全
      nodeIntegrationInWorker: true, // XSS 攻击
      // nodeIntegrationInSubFrames: true, // 是否允许在 子页面(iframe) 或者 子窗口(child window) 中集成 Node.js
      enableRemoteModule: true,
      zoomFactor: 1,
      javascript: true,
      webSecurity: false, // 禁用同源策略
      allowRunningInsecureContent: true,
      textAreasAreResizable: true,
      webgl: true,
      plugins: true,
      webviewTag: true,
      safeDialogs: false,
      scrollBounce: true,
      navigateOnDragDrop: false,
      disableHtmlFullscreenWindowResize: true,
      additionalArguments: []
    }
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol("app");
    // Load the index.html when not in development
    win.loadURL("app://./index.html");
  }

  win.on("closed", () => {
    win = null;
  });
}

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    // Devtools extensions are broken in Electron 6.0.0 and greater
    // See https://github.com/nklayman/vue-cli-plugin-electron-builder/issues/378 for more info
    // Electron will not launch with Devtools extensions installed on Windows 10 with dark mode
    // If you are not using Windows 10 dark mode, you may uncomment these lines
    // In addition, if the linked issue is closed, you can upgrade electron and uncomment these lines
    // try {
    //   await installVueDevtools()
    // } catch (e) {
    //   console.error('Vue Devtools failed to install:', e.toString())
    // }
  }
  createWindow();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", data => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}
