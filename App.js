import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { registerRootComponent } from "expo";
import { Provider } from 'react-redux';
import { Link, NativeRouter, Route, Switch } from "react-router-native";

import Home from "./src/containers/Home";
import ScanItem from "./src/containers/scan-item/ScanItem";
import PostReview from "./src/containers/post-review/PostReview";
import ViewItemPage from "./src/containers/view-item/ViewItemPage";
import ViewList from "./src/containers/view-item/ViewList";
import Login from "./src/auth/Login";
import configureStore from "./src/store/configureStore";
import './src/services/firebase-init';

const store = configureStore();

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <NativeRouter>
          <View style={styles.container}>
            <View style={styles.nav}>
              <Link to="/" underlayColor="#f0f4f7" style={styles.navItem}>
                <Text>Home</Text>
              </Link>
              <Link to="/scan" underlayColor="#f0f4f7" style={styles.navItem}>
                <Text>Scan</Text>
              </Link>
              <Link to="/post-review/00430999" underlayColor="#f0f4f7" style={styles.navItem}>
                <Text>Post Review</Text>
              </Link>
              <Link to="/view-list" underlayColor="#f0f4f7" style={styles.navItem}>
                <Text>View list</Text>
              </Link>
              <Link to="/login" underlayColor="#f0f4f7" style={styles.navItem}>
                <Text>Login</Text>
              </Link>
            </View>

            <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/scan" component={ScanItem}/>
              <Route path="/post-review/:upc" component={PostReview}/>
              <Route path="/view-item/:upc/:type?" component={ViewItemPage}/>
              <Route path="/view-list" component={ViewList}/>
              <Route path="/login" component={Login}/>
              <Route render={() => <Text>page not found</Text>}/>
            </Switch>
          </View>
        </NativeRouter>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
  },
  header: {
    fontSize: 20,
  },
  nav: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
  subNavItem: {
    padding: 5,
  },
  topic: {
    textAlign: "center",
    fontSize: 15,
  },
});

registerRootComponent(App);
