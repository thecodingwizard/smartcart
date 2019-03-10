import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text } from "react-native";
import { getItemDetails } from "../../actions/items.actions";

class ViewItemPage extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.match.params.upc !== prevProps.match.params.upc) {
      this.getItemDetails();
    }
  }

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

const mapStateToProps = state => {
  return {
    itemDetails: state.itemDetails,
  };
};

export default connect(mapStateToProps, { getItemDetails })(ViewItemPage);