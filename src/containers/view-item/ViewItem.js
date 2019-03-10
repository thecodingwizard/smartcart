import React, { Component } from "react";
import { View, Text } from "react-native";

export default class ViewItem extends Component {
  render() {
    const upc = this.props.match.params.upc;
    return (
      <View>
        <Text>
          View Item UPC code: {upc}
        </Text>
      </View>
    )
  }
}