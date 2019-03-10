import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text } from "react-native";
import { getItemDetails } from "../../actions/items.actions";

class ViewItemPage extends Component {
  componentDidMount() {
    this.props.dispatch(getItemDetails(this.props.match.params.upc));
  }

  render() {
    const upc = this.props.match.params.upc;
    return (
      <View>
        <Text>
          View Item UPC code: {upc}
        </Text>
        {this.props.loading && <Text>Loading...</Text>}
        {this.props.error && <Text>Error: {this.props.error}</Text>}
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    itemDetails: state.items.itemDetails,
    loading: state.items.loading,
    error: state.items.error,
  };
};

export default connect(mapStateToProps)(ViewItemPage);