import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from 'react-redux';
import { createStackNavigator, createAppContainer } from "react-navigation";

import Home from "./src/containers/Home";
import ScanItem from "./src/containers/scan-item/ScanItem";
import PostReview from "./src/containers/post-review/PostReview";
import ViewItemScreen from "./src/containers/view-item/ViewItemScreen";
import ViewList from "./src/containers/view-item/ViewList";
import Login from "./src/auth/Login";
import configureStore from "./src/store/configureStore";
import './src/services/firebase-init';

const AppNavigator = createStackNavigator(
  {
    Home: Home,
    ViewItem: ViewItemScreen
  },
  {
    initialRouteName: "Home"
  }
);

const Navigation = createAppContainer(AppNavigator);

const store = configureStore();

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}