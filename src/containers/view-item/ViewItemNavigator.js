import React from "react";
import { connect } from "react-redux";
import { createMaterialTopTabNavigator, HeaderTitle } from "react-navigation";
import ViewItemDetails from "./ViewItemDetails";
import ViewItemReviews from "./ViewItemReviews";

const ScreenTitle = ({ text, ...otherProps }) => (
  <HeaderTitle {...otherProps}>{text}</HeaderTitle>
);
const ScreenTitleContainer = connect(state => ({
  text: state.items.itemDetails ? state.items.itemDetails.name : 'Loading...',
}))(ScreenTitle);

const navigationOptions = {
  headerTitle: ScreenTitleContainer,
};

let ViewItemNavigator = createMaterialTopTabNavigator({
  ViewItemDetails: ViewItemDetails,
  ViewItemReviews: ViewItemReviews,
});

ViewItemNavigator.navigationOptions = navigationOptions;

export default ViewItemNavigator;