import React, { Component } from "react";
import Instascan from "instascan";
import "./App.css";

let timeout;

let scanner = new Instascan.Scanner({});

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
  state = {
    flashing: false,
    canAccess: false
  };

  componentDidMount() {
    // Initialize QR code scanner
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
      // TODO: move URL to config
      fetch(`http://192.168.1.4:5577/access`, {
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

  startTimeout = () => {
    timeout = setTimeout(() => {
      this.setState({ flashing: false });
      const body = document.querySelector("body");
      removeClass(body, "out-bg");
      removeClass(body, "in-bg");
    }, 3000);
  };

  updateUI = arg => {
    console.log("Allowed? " + arg.allowed);
    clearTimeout(timeout);
    this.startTimeout();

    const body = document.querySelector("body");

    if (arg.allowed) {
      this.setState({ flashing: true, canAccess: true });
      addClass(body, "in-bg");
    } else {
      this.setState({ flashing: true, canAccess: false });
      addClass(body, "out-bg");
    }
  };

  mainScreen = () => (
    <div id="waiting-message">
      <p className="status">Please Scan Your QR Code</p>
      <p className="tip">
        Move QR code of your ETH address in front of the camera so we can scan
        it!
      </p>
    </div>
  );

  showAccessGranted = () => (
    <div>
      <p className="status">Access granted!</p>
    </div>
  );

  showAccessDenied = () => (
    <div>
      <p className="status">Access denied!</p>
    </div>
  );

  render() {
    return (
      <div>
        {!this.state.flashing && this.mainScreen()}
        {this.state.flashing &&
          (this.state.canAccess
            ? this.showAccessGranted()
            : this.showAccessDenied())}
      </div>
    );
  }
}

export default App;
