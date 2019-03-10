import React, {Component} from "react";
import {StyleSheet, TextInput, View, Button} from "react-native";
import * as firebase from "firebase/app";
import "firebase/auth";
export default class Login extends Component {
  render() {
    return (
        <View>
          <Auth/>
        </View>
    );
  }
}


class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userText: '',
      passwordText: ''
    };
  }

  signIn = () => {

    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        alert("Signed In");
      }
    });
    firebase.auth().signInWithEmailAndPassword(this.state.userText, this.state.passwordText).catch(function (e) {
      alert("Email/Password Incorrect!");
    });

  };

  render() {
    return (
        <View style={styles.container}>
          <TextInput
              style={styles.TextBoxStyle}
              placeholder="Username"
              autoComplete={false}
              autoCorrect={false}
              onChangeText={text => this.setState(state => ({...state, userText: text}))}
          />
          <TextInput
              style={styles.TextBoxStyle}
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={text => this.setState(state => ({...state, passwordText: text}))}
          />
          <View style={styles.ButtonStyle}>
            <Button
                onPress={this.signIn}
                title="Sign in"
            />
          </View>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 1000,
    padding: 10
  }, TextBoxStyle: {
    height: 40,
    borderWidth: 1,
    borderRadius: 6,
    padding: 5,
    margin: 5
  }, ButtonStyle: {
    height: 40,
    width: 350
  }, TextStyle: {
    color: 'white'
  }
});
