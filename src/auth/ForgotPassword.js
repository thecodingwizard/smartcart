import React, {Component} from "react";
import {StyleSheet, TextInput, View, Button, Text} from "react-native";
import * as firebase from "./Login";

export default class ForgotPassword extends Component {
  render() {
    return (
        <View>
          <ForgotPasswordMod/>
        </View>
    );
  }
}

class ForgotPasswordMod extends Component {
  constructor (props) {
    super(props);
    this.state = {
      email: '',
    };
  }

  forgotPassword = () => {
    firebase.auth().sendPasswordResetEmail(this.state.email).then(function() {
      alert("If the provided email is valid, a password reset email was sent there.");
    }).catch(function(error) {
      alert("If the provided email is valid, a password reset email was sent there.");
    });
  };

  render() {
    return (
        <View style={style.container}>
          <TextInput
              style={style.TextBoxStyle}
              placeholder="Email"
              onChangeText={text => this.setState(state => ({...state, email: text}))}
          />
          <View style={style.ButtonStyle}>
            <Button
                onPress={this.forgotPassword}
                title="Forgot Password"
            />
          </View>
        </View>
    )
  }
}

const style = StyleSheet.create({
  container: {
    height: 1000,
    paddingTop: 100,
    padding: 10,
    backgroundColor: "white",
  }, TextBoxStyle: {
    height: 40,
    borderWidth: 1,
    borderRadius: 6,
    padding: 5,
    margin: 5
  }, ButtonStyle: {
    height: 40,
    width: 350
  }, textStyle: {
    color: "black"
  }
});