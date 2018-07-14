const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const config = require("./config");
const accessService = require("./lib/providers/accessService");
const responseService = require("./lib/providers/responseService");
const myWeb3 = require("./lib/providers/myWeb3");

myWeb3.init(config.CONTRACT_ADDR, `${config.NODE_ADDR}:${config.NODE_PORT}`);

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

app.listen(8080, () => {
  console.log("> Adethum server listening on port 8080");
});
