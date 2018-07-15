import Aragon from "@aragon/client";

const app = new Aragon();

const initialState = {
  allowedAddresses: []
};
app.store(async (state, event) => {
  if (state === null) state = initialState;

  switch (event.event) {
    case "AccessAllowed":
      return { allowedAddresses: await getAllowedAddresses() };
    case "AccessRevoked":
      return { allowedAddresses: await getAllowedAddresses() };
    default:
      return state;
  }
});

function getAllowedAddresses() {
  // Get allowed addresses from the contract by calling the public getter
  return new Promise(resolve => {
    app
      .call("getAllAllowedAddresses")
      .first()
      .subscribe(resolve);
  });
}
