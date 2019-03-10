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
    alert('Signed In!\n' +
        'Username: ' + this.state.userText + '\n' +
        'Password: ' + this.state.passwordText);
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
    width: 200
  }, TextStyle: {
    color: 'white'
  }
});
