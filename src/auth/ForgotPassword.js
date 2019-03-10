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
      firstName: '',
      lastName: '',
      email: '',
      wrongName: false,
      wrongEmail: false
    };
  }

  forgotPassword = () => {
    this.setState(state => ({...state, wrongName: false, wrongEmail: false}));
    if (false) {
      //If the the provided name doesn't match the records, execute this code.
      //Replace false with appropriate condition.
      this.setState(state => ({...state, wrongName: true}));
    } else if (false) {
      //If the the provided email doesn't match the records, execute this code.
      //Replace false with appropriate condition.
      this.setState(state => ({...state, wrongEmail: true}));
    } else {
      alert("Email sent!");
    }
  };

  render() {
    return (
        <View style={style.container}>
          <TextInput
              style={style.TextBoxStyle}
              placeholder="First Name"
              onChangeText={text => this.setState(state => ({...state, firstName: text}))}
          />
          <TextInput
              style={style.TextBoxStyle}
              placeholder="Last Name"
              onChangeText={text => this.setState(state => ({...state, lastName: text}))}
          />
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
          {(this.state.wrongName) &&
          <Text style={style.textStyle}>Your name is not in our records.</Text>}
          {(this.state.wrongEmail) &&
          <Text style={style.textStyle}>Your email is not in our records.</Text>}
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