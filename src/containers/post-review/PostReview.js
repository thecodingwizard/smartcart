import React, { Component } from "react";
import { View, Text } from "react-native";

export default class PostReview extends Component {
  render() {
    const upc = this.props.match.params.upc;
    return (
      <View>
        <Text>Hello from Post Review! UPC code is {upc}</Text>
      </View>
    );
  }
}