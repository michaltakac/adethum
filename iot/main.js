const electron = require("electron");
const http = require("http");
const EthCrypto = require("eth-crypto");
const express = require("express");
const bodyParser = require("body-parser");
const config = require("./config");
const accessService = require("./providers/accessService");
const responseService = require("./providers/responseService");
const myWeb3 = require("./providers/myWeb3");

const ipcMain = electron.ipcMain;
const BrowserWindow = electron.BrowserWindow;
const app = electron.app;

myWeb3.init(config.CONTRACT_ADDR, config.NODE_ADDR);

const expressApp = express();
expressApp.use(bodyParser.urlencoded({ extended: false }));
expressApp.use(bodyParser.json());

let mainWindow;
let appStatus;

function initApp() {
  initAdethumService();
  createWindow();
}

function initAdethumService() {
  ipcMain.on("scan-initiated", (event, arg) => {
    let address = arg;
    accessService
      .checkAccess(address)

      .then(data => {
        console.log("acess ok", data);
        if (data) {
          appStatus = {
            allowed: true,
            msg: "Allowed"
          };
          event.sender.send("asynchronous-reply", appStatus);
        } else {
          appStatus = {
            allowed: false,
            msg: "Denied"
          };
          event.sender.send("asynchronous-reply", appStatus);
        }
      })
      .catch(err => {
        console.log("access err", err);
        responseService.error(err, res);
        appStatus = {
          allowed: false,
          msg: "Denied"
        };
        event.sender.send("asynchronous-reply", appStatus);
      });
  });

  ipcMain.on("asynchronous-message", (event, arg) => {
    if (appStatus !== undefined) {
      console.log("responding message appStatus:", appStatus);
      event.sender.send("asynchronous-reply", appStatus);
      appStatus = undefined;
    }
  });
}

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({ width: 800, height: 600 });

  // TODO: fullscreen only in IoT - mainWindow.setFullScreen(true);
  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // Emitted when the window is closed.
  mainWindow.on("closed", function() {
    mainWindow = null;
  });

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

app.on("ready", initApp);

app.on("window-all-closed", function() {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function() {
  if (mainWindow === null) {
    createWindow();
  }
});
