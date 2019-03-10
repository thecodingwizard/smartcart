import React, { Component } from "react";
import { connect } from "react-redux";
import { Text } from "react-native-elements";
import { getItemReviews } from "../../actions";
import { Image, TouchableHighlight, View } from 'react-native';

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
      <>
        <TouchableHighlight
          underlayColor="#f0f4f7"
          onPress={() => this.props.navigation.navigate('CompareItems')}
        >

            <Text>compare items test</Text>
        </TouchableHighlight>
        <Text>
          UPC Code: {this.props.navigation.getParam("upc")}
          Reviews: {JSON.stringify(this.props.reviews)}
          {this.props.loading && "Loading"}
          {this.props.error && "Error: " + this.props.error}
        </Text>
      </>
    )
  }
}

const mapStateToProps = state => ({
  loading: state.reviews.loading,
  error: state.reviews.error,
  reviews: state.reviews.reviews,
});

export default connect(mapStateToProps)(ViewItemReviews);