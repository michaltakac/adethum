import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  Platform,
  TouchableOpacity,
  TextInput,
  ScrollView
} from "react-native";
// import QRCode from "qrcode.react";

export default class LaunchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
        {Platform.OS === "ios" && <View style={{ height: 60 }} />}

        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>lol</Text>
        </View>
      </ScrollView>
    );
  }
}
