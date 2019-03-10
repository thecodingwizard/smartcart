import React, {Component} from "react";
import {StyleSheet, TextInput, View, Button, Text, Image} from "react-native";
import Login from "./Login";
import imageSrc from "../assets/smartcart.png";

export default class SignInPage extends Component {
  gotoRegister() {
    this.props.navigation.navigate('Register');
  }
  render() {
    console.log(imageSrc);
    return (
        <View style={style.container}>
          <View style={style.LoginStyle}>
            <Login/>
          </View>
          <View style={style.ButtonStyle}>
            <Button
                title="Don't have an account?"
                onPress={() =>
                    this.gotoRegister()
                }
            />
          </View>
        </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  }, ButtonStyle: {
    height: 500,
    width: 375,
  }, LoginStyle: {
    height: 175,
    width: 375,
  }
});