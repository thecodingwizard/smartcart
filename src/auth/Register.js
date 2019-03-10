import React, {Component} from "react";
import {StyleSheet, TextInput, View, Button, Text} from "react-native";

const EMAIL_USED = 0;
const INVALID_EMAIL = 1;
const WEAK_PSW = 2;
const UNKNOWN = 3;

export default class Register extends Component {
  render() {
    return (
        <View>
          <Register/>
        </View>
    );
  }
}

class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      firstName: "",
      lastName: "",
      userName: "",
      password: "",
      confirmPassword: "",
      errorCode: -1;
    };
  }
  async checkUsername(username) {
    // Check username


  }
  register = () => {
    this.setState(state => ({...state, errorCode: -1}));
    if (this.state.password !== this.state.confirmPassword) {
      this.setState(state => ({...state, wrongPassword: true}));
    } else {
      firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        switch (error.code) {
          case "auth/email-already-in-use":
            this.setState(state => ({...state, errorCode: EMAIL_USED}));
          break;
          case "auth/email-invalid":
            this.setState(state => ({...state, errorCode: INVALID_EMAIL}));
          break;
          case "auth/weak-password":
            this.setState(state => ({...state, errorCode: WEAK_PSW}));
          break;
          default:
            this.setState(state => ({...state, errorCode, UNKNOWN}));
          break;

        }
      }).then(async function () {
        if (await this.checkUsername(this.state.userName)) {
          this.setState(state => ({ ...state, usernameTaken: true }));
        } else {
          alert("Account created")
        }
      });
    }
  };

  checkError() {
    if (this.state.errorCode !== -1) {
      switch(this.state.errorCode) {
        case EMAIL_USED:
          return <Text style={style.TextBoxStyle}>Sorry. This email has already been taken.</Text>
        case INVALID_EMAIL:
          return <Text style={style.TextBoxStyle}>Sorry. This email is invalid.</Text>
        case WEAK_PSW:
          return <Text style={style.TextBoxStyle}>Sorry. This password is too weak.</Text>
        default:
          return <Text style={style.TextBoxStyle}>Sorry. An unknown error occured.</Text>
      }
    } else {
      return null;
    }
  }

  render() {
    return (
        <View style={style.container}>
          <TextInput
              style={style.textBoxStyle}
              placeholder="First Name"
              onChangeText={text => this.setState(state => ({...state, firstName: text}))}
          />
          <TextInput
              style={style.textBoxStyle}
              placeholder="Last Name"
              onChangeText={text => this.setState(state => ({...state, lastName: text}))}
          />
          <TextInput
              style={style.textBoxStyle}
              placeholder="Email"
              onChangeText={text => this.setState(state => ({...state, email: text}))}
          />
          <TextInput
              style={style.textBoxStyle}
              placeholder="Username"
              onChangeText={text => this.setState(state => ({...state, userName: text}))}
          />
          <TextInput
              style={style.textBoxStyle}
              placeholder="Password"
              onChangeText={text => this.setState(state => ({...state, password: text}))}
          />
          <TextInput
              style={style.textBoxStyle}
              placeholder="Confirm Password"
              onChangeText={text => this.setState(state => ({...state, confirmPassword: text}))}
          />
          <View style={style.buttonStyle}>
            <Button
                onPress={this.register}
                title="Register"
            />
          </View>
          {this.checkError()}
        </View>
    )
  }
}

const style = StyleSheet.create({
  container: {
    height: 2000,
    padding: 10,
    backgroundColor: "white"
  }, textBoxStyle: {
    height: 40,
    borderWidth: 1,
    borderRadius: 6,
    padding: 5,
    margin: 5
  }, buttonStyle: {
    height: 40,
    width: 350
  }, textStyle: {
    color: "black"
  }
});

