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
  initHttpApp();
  createWindow();
}

function initHttpApp() {
  expressApp.post("/", function(req, res) {
    console.log("got request");
    // console.log(req);
    let signature = req.body.signature;
    let address = req.body.address;
    let message = req.body.message;

    const signer = EthCrypto.recover(
      signature,
      EthCrypto.hash.keccak256(message)
    );

    if (signer == address) {
      console.log("Signature validated!", address);

      accessService
        .checkAccess(address)

        .then(data => {
          console.log("acess ok", data);
          if (data) {
            responseService.respond("{}", res);
            appStatus = {
              allowed: true,
              msg: "Allowed"
            };
          } else {
            responseService.error(null, res);
            appStatus = {
              allowed: false,
              msg: "Not on blockchain"
            };
          }
        })
        .catch(err => {
          console.log("acess err", err);
          responseService.error(err, res);
          appStatus = {
            allowed: false,
            msg: "Not on blockchain"
          };
        });
    } else {
      // signature validation failed
      appStatus = {
        allowed: false,
        msg: "Signature validation failed"
      };

      responseService.error(err, res);
    }

    // res.send('Ok');
  });

  expressApp.listen(8000, function() {
    console.log("Example app listening on port 8000!");
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

  mainWindow.setFullScreen(true);
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
