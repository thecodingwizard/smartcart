import React, { Component } from "react";
import { View, Text } from "react-native";

export default class ViewItem extends Component {
  render() {
    const upc = this.props.match.params.upc;
    const type = this.props.match.params.type;
    return (
      <View>
        <Text>Hello from View Item! UPC code is {upc}. It's type is {type}.</Text>
      </View>
    );
  }
}