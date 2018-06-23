import { StackNavigator } from "react-navigation";
import LaunchScreen from "../Containers/LaunchScreen";
import App from "../Containers/App";

import styles from "./Styles/NavigationStyles";

// Manifest of possible screens
const PrimaryNav = StackNavigator(
  {
    LaunchScreen: { screen: LaunchScreen }
  },
  {
    App: { screen: App }
  },
  {
    // Default config for all screens
    headerMode: "none",
    initialRouteName: "App",
    navigationOptions: {
      headerStyle: styles.header
    }
  }
);

export default PrimaryNav;
