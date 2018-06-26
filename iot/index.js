const { ipcRenderer } = require("electron");
var QRCode = require("qrcode");
const Instascan = require("instascan");
let interval, timeout;

let scanner = new Instascan.Scanner({
  video: document.getElementById("preview")
});

scanner.addListener("scan", function(content) {
  console.log(content);
  ipcRenderer.send("scan-initiated", content.split(":")[1]);
});

Instascan.Camera.getCameras()
  .then(function(cameras) {
    if (cameras.length > 0) {
      scanner.start(cameras[0]);
    } else {
      console.error("No cameras found.");
    }
  })
  .catch(function(e) {
    console.error(e);
  });

function ready(fn) {
  if (
    document.attachEvent
      ? document.readyState === "complete"
      : document.readyState !== "loading"
  ) {
    fn();
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

function runInterval() {
  interval = setInterval(function() {
    ipcRenderer.send("asynchronous-message", "ping");
  }, 1000);
}

function startTimeout() {
  timeout = setTimeout(function() {
    goHome();
  }, 3000);
}

function goHome() {
  console.log("going home");

  let body = document.querySelectorAll("body")[0];
  let waitingMessage = document.querySelectorAll("#waiting-message")[0];
  waitingMessage.style.display = "block";

  let outMessage = document.querySelectorAll("#out-message")[0];
  outMessage.style.display = "none";

  let inMessage = document.querySelectorAll("#in-message")[0];
  inMessage.style.display = "none";

  removeClass(body, "out-bg");
  removeClass(body, "in-bg");

  // addClass(body, 'tip');
}

ready(runInterval);

ipcRenderer.on("asynchronous-reply", (event, arg) => {
  console.log("Msg response received: " + arg.allowed);
  clearTimeout(timeout);
  startTimeout();
  // clearInterval(interval)
  let body = document.querySelectorAll("body")[0];

  // update UI
  if (arg.allowed) {
    let waitingMessage = document.querySelectorAll("#waiting-message")[0];
    waitingMessage.style.display = "none";

    let inMessage = document.querySelectorAll("#in-message")[0];
    inMessage.style.display = "block";

    addClass(body, "in-bg");
  } else {
    let waitingMessage = document.querySelectorAll("#waiting-message")[0];
    waitingMessage.style.display = "none";

    let outMessage = document.querySelectorAll("#out-message")[0];
    outMessage.style.display = "block";

    addClass(body, "out-bg");
  }
});

function addClass(el, className) {
  if (el.classList) {
    el.classList.add(className);
  } else {
    el.className += " " + className;
  }
}

function removeClass(el, className) {
  if (el.classList) {
    el.classList.remove(className);
  } else {
    el.className -= " " + className;
  }
}
