import React, { Component } from "react";
import { connect } from "react-redux";
import { StyleSheet, Text, View } from "react-native";
import { getItemDetails } from "../../actions/items.actions";

class ViewItemScreen extends Component {
  static navigationOptions = {
    title: "View Item Screen",
  };

  componentDidMount() {
    const upc = this.props.navigation.getParam("upc");
    this.props.dispatch(getItemDetails(upc));
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.navigation.getParam("upc") !==
      prevProps.navigation.getParam("upc")
    ) {
      this.props.dispatch(
        getItemDetails(this.props.navigation.getParam("upc")),
      );
    }
  }

  render() {
    const { navigation } = this.props;
    const upc = navigation.getParam("upc");
    return (
      <View style={style.container}>
        {this.props.itemDetails && (
          <>
            <Text>Item Details</Text>
            <Text>{JSON.stringify(this.props.itemDetails, null, 4)}</Text>
          </>
        )}
        {this.props.loading && <Text>Loading...</Text>}
        {this.props.error && <Text>Error: {this.props.error}</Text>}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    itemDetails: state.items.itemDetails,
    loading: state.items.loading,
    error: state.items.error,
  };
};
const style = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "white"
  }
});


export default connect(mapStateToProps)(ViewItemScreen);
