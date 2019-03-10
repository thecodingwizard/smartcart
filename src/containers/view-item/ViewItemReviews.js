import React, { Component } from "react";
import { connect } from "react-redux";
import { Text } from "react-native-elements";

class ViewItemReviews extends Component {
  static navigationOptions = {
    title: "Product Reviews",
  };

  render() {
    return (
      <Text>Item Review, Todo</Text>
    )
  }
}

const mapStateToProps = state => ({
  loading: state.props.loading,
  error: state.props.error,
});

export default connect(mapStateToProps)(ViewItemReviews);