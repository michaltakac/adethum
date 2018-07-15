# Adethum

Pay to access. Bill the usage. Automate your local hackerspace. Whatever you imagine to restrict access to.

### Usage

1.  Set the first part of ENS - `appName` in `dao/arapp.json` to some unique name:

```
"appName": "something.aragonpm.eth"
```

1.  Compile the contracts, build and run the DAO:

```
cd dao
npm i
npm run compile
npm run build
npm start
```

Aragon will do everything for you, and you'll be provided with the nice front-end of aragonOS app (it will open automatically, just follow information in command line).

In the DAO app, you can grant access to some ETH addresses. You can add one from your Metamask and print the QR code of it to test later.

1.  Update the `CONTRACT_ADDR` and `NODE_ADDR` in `server/config.js` with the contract address to your Adethum app (`http://localhost:3000/#/{DAO_ADDRESS}/{ADETHUM_CONTRACT_ADDRESS}`) and IP of your node (usualy it's the machine where DAO is running)

1.  Run the Adethum access granting service

```
cd server
npm i
npm start
```

1.  Run the client (on your PC or RaspberryPI with monitor and camera)

```
cd client
npm i
npm start
```

Client will be running at http://localhost:4000. Flash the QR code of your ETH address in front of the camera to see magic.
