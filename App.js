import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import Home from './src/containers/Home';
import ScanItemScreen from './src/containers/scan-item/ScanItemScreen';
import PostReview from './src/containers/post-review/PostReview';
import ViewItemScreen from './src/containers/view-item/ViewItemScreen';
import AddItemScreen from './src/containers/add-item/AddItemScreen';
import Register from './src/auth/Register';
import configureStore from './src/store/configureStore';
import './src/services/firebase-init';
import SignInPage from './src/auth/SignInPage';
import CompareItems from './src/containers/compare-items/CompareItems';

const AppNavigator = createStackNavigator(
  {
    Home: Home,
    ViewItem: ViewItemScreen,
    ScanItem: ScanItemScreen,
    AddItem: AddItemScreen,
    CompareItems: CompareItems,
    // PostReview: PostReview,
    // Register: Register,
    // SignInPage: SignInPage
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#0967D2',
      },
      headerTintColor: '#fff',
    },
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
