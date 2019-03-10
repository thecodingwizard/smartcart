import React, { Component } from "react";
import { connect } from "react-redux";
import { StyleSheet, Text, View } from "react-native";
import { getItemDetails } from "../../actions/items.actions";
import { HeaderTitle } from "react-navigation";


const ScreenTitle = ({ text, ...otherProps }) => <HeaderTitle {...otherProps}>{text}</HeaderTitle>;
const ScreenTitleContainer = connect(state => ({
  text: state.items.itemDetails ? state.items.itemDetails.name : "Loading..."
}))(ScreenTitle);

class ViewItemScreen extends Component {
  static navigationOptions = {
    headerTitle: ScreenTitleContainer,
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
            <Text style={style.header}>{this.props.itemDetails.name}</Text>
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


export default connect(mapStateToProps)(ViewItemScreen);
