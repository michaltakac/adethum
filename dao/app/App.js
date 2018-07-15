import React from "react";
import { AragonApp, AppBar, Button, Text, observe, Field } from "@aragon/ui";
import Aragon, { providers } from "@aragon/client";
import styled from "styled-components";

const AppContainer = styled(AragonApp)`
  padding: 30px;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newAddress: ""
    };
    this.handleNewAddress = this.handleNewAddress.bind(this);
    this.handleNewAddressSubmit = this.handleNewAddressSubmit.bind(this);
    this.handleRevokeAccess = this.handleRevokeAccess.bind(this);
  }

  handleNewAddress(event) {
    this.setState({ newAddress: event.target.value });
  }

  handleNewAddressSubmit(event) {
    this.props.app.giveAccess(this.state.newAddress);
    this.setState({ newAddress: "" });
  }

  handleRevokeAccess(addressToRevoke) {
    console.log("revoke", addressToRevoke);
    this.props.app.revokeAccess(addressToRevoke);
  }

  render() {
    const { allowedAddresses } = this.props;
    return (
      <AppContainer>
        <h1 className="app-title">Adethum</h1>
        <h2 className="section-title">DAO Members physical access</h2>
        <div className="form">
          <h2>Allow Access to New Address</h2>
          <Field label="Enter name here:">
            <input
              type="text"
              value={this.state.newAddress}
              onChange={this.handleNewAddress}
            />
          </Field>
          <Button mode="strong" onClick={this.handleNewAddressSubmit}>
            Allow Access
          </Button>
        </div>
        <table className="table">
          <thead>
            <th>Address</th>
            <th>Access</th>
          </thead>
          <tbody>
            {allowedAddresses.map((address, i) => (
              <tr>
                <td>{address}</td>
                <td>
                  <Button
                    onClick={() => this.handleRevokeAccess(address)}
                    mode="outline"
                  >
                    Revoke Access
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </AppContainer>
    );
  }
  renderButton(hasAccess) {
    if (!hasAccess) {
      return <Button mode="secondary">Give Access</Button>;
    } else {
      return <Button mode="outline">Revoke Access</Button>;
    }
  }
}

const ObservedApp = observe(state$ => state$, { allowedAddresses: [] })(App);

export default ObservedApp;
