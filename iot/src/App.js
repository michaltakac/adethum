import React, { Component } from "react";
import Instascan from "instascan";
import "./App.css";

let timeout;

function startTimeout() {
  timeout = setTimeout(function() {
    goHome();
  }, 3000);
}

let scanner = new Instascan.Scanner({
  video: document.getElementById("preview")
});

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
}

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

class App extends Component {
  componentDidMount() {
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

    scanner.addListener("scan", content => {
      fetch(`http://192.168.1.21:8080/access`, {
        method: "POST",
        body: JSON.stringify({
          address: content.split(":")[1]
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(res => {
          this.updateUI(res);
        })
        .catch(e => console.log(e));
    });
  }

  updateUI = arg => {
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
  };

  render() {
    return (
      <div className="App">
        <div id="waiting-message">
          <p className="status">Please Scan Your QR Code</p>
          <p className="tip">
            Use Adethum mobile app to reveal QR code for your address and move
            it in front of the camera so we can scan it!
          </p>
        </div>
        <div id="in-message">
          <p className="status">Access granted!</p>
        </div>
        <div id="out-message">
          <p className="status">Access denied!</p>
        </div>
      </div>
    );
  }
}

export default App;
