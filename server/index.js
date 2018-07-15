const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const config = require("./config");
const accessService = require("./lib/access-service");
const Web3Service = require("./lib/web3-service");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/access", (req, res, next) => {
  let address = req.body.address;
  accessService
    .checkAccess(address)
    .then(data => {
      console.log("acess ok", data);
      if (data) {
        res.json({
          allowed: true,
          msg: "Allowed"
        });
      } else {
        res.json({
          allowed: false,
          msg: "Denied"
        });
      }
    })
    .catch(err => {
      console.log("access err", err);
      res.json({
        allowed: false,
        msg: "Denied"
      });
    });
});

app.listen(5577, () => {
  console.log("> Adethum server listening on port 8080");
});

Web3Service.init(
  config.CONTRACT_ADDR,
  `${config.NODE_ADDR}:${config.NODE_PORT}`
);
