import React, { Component } from "react";
import { connect } from "react-redux";
import { Text, View } from "react-native";
import { getItemDetails } from "../../actions/items.actions";

class ViewItemScreen extends Component {
  static navigationOptions = {
    title: "View Item Screen",
  };

  componentDidMount() {
    const upc = this.props.navigation.getParam("upcCode");
    this.props.dispatch(getItemDetails(upc));
  }

  componentDidUpdate(prevProps) {
    if (this.props.navigation.getParam("upcCode") !== prevProps.navigation.getParam("upcCode")) {
      this.props.dispatch(getItemDetails(this.props.navigation.getParam("upcCode")));
    }
  };

  render() {
    const { navigation } = this.props;
    const upc = navigation.getParam("upcCode");
    return (
      <View>
        {
          this.props.itemDetails &&
          <Text>Item Details: {JSON.stringify(this.props.itemDetails)}</Text>
        }
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

export default connect(mapStateToProps)(ViewItemScreen);