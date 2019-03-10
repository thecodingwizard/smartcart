import React, { Component } from "react";
import { connect } from "react-redux";
import { Text, View } from "react-native";
import { getItemDetails } from "../../actions/items.actions";

class ViewItemPage extends Component {
  componentDidMount() {
    this.props.dispatch(getItemDetails(this.props.match.params.upc));
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.upc !== prevProps.match.params.upc) {
      this.props.dispatch(getItemDetails(this.props.match.params.upc));
    }
  };

  render() {
    const upc = this.props.match.params.upc;
    const type = this.props.match.params.type;
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

export default connect(mapStateToProps)(ViewItemPage);