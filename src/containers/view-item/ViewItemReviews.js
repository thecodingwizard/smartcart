import React, { Component } from "react";
import { connect } from "react-redux";
import { Text } from "react-native-elements";
import { getItemReviews } from "../../actions";

class ViewItemReviews extends Component {
  static navigationOptions = {
    title: "Product Reviews",
  };

  componentDidMount() {
    const upc = this.props.navigation.getParam('upc');
    this.props.dispatch(getItemReviews(upc));
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.navigation.getParam('upc') !==
      prevProps.navigation.getParam('upc')
    ) {
      this.props.dispatch(
        getItemReviews(this.props.navigation.getParam('upc'))
      );
    }
  }

  render() {
    return (
      <Text>
        UPC Code: {this.props.navigation.getParam("upc")}
        Reviews: {JSON.stringify(this.props.reviews)}
        {this.props.loading && "Loading"}
        {this.props.error && "Error: " + this.props.error}
      </Text>
    )
  }
}

const mapStateToProps = state => ({
  loading: state.props.loading,
  error: state.props.error,
  reviews: state.props.reviews,
});

export default connect(mapStateToProps)(ViewItemReviews);