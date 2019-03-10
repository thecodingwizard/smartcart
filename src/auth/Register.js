import React, {Component} from "react";
import {StyleSheet, TextInput, View, Button, Text} from "react-native";

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
      wrongPassword: false,
      usernameTaken: false,
      emailTaken: false
    };
  }
  async checkUsername(username) {
    // Check username


  }
  register = () => {

    this.setState(state => ({...state,
      wrongPassword: false, usernameTaken: false, emailTaken: false}));
    if (this.state.password !== this.state.confirmPassword) {
      this.setState(state => ({...state, wrongPassword: true}));
    } else {
      firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {

        switch (error.code) {
          case "auth/email-already-in-use":
            this.setState(state => ({ ...state, emailTaken: true }));
          break;
          case "auth/email-invalid":
            // Email invalid below


          break;
          case "auth/weak-password":
            // Weak password below


          break;
          default:
            // Unknown error occurred. Please try again later


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
          {(this.state.wrongPassword) &&
          <Text style={style.textStyle}>Sorry, passwords do not match.</Text>}
          {(this.state.usernameTaken) &&
          <Text style={style.textStyle}>Sorry, this username is taken.</Text>}
          {(this.state.emailTaken) &&
          <Text style={style.textStyle}>Sorry, this email has been taken.</Text>}
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
