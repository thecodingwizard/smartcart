import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";


const ScreenTitle = ({ text, ...otherProps }) => <HeaderTitle {...otherProps}>{text}</HeaderTitle>;
const ScreenTitleContainer = connect(state => ({
  text: state.items.itemDetails ? state.items.itemDetails.name : "Loading..."
}))(ScreenTitle);

class ViewItemScreen extends Component {


  render() {
    const { navigation } = this.props;
    const upc = navigation.getParam("upc");
    return (
      <View>
        
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "white"
  },
  header:{
    fontSize:28,
    fontWeight:"bold",
  },
  muted:{
    fontSize:25,
    color:"#3E4C59",
    fontWeight:"300"

  }
});