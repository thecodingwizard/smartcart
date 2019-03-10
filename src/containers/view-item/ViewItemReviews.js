import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { getItemReviews } from '../../actions';

class ViewItemReviews extends Component {
  static navigationOptions = {
    title: 'Product Reviews',
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
    if (!this.props.loading) {
      return <ReviewList reviews={this.props.reviews} />;
    } else {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    }
  }
}

const renderItem = ({ item: review }) => (
  <View
    style={{
      marginBottom: 8,
      paddingBottom: 10,
      borderColor: 'transparent',
      borderBottomColor: 'gray',
      borderWidth: 1,
    }}
  >
    <View style={{ flexDirection: 'row' }}>
      <Text
        style={{
          flex: 1,
          fontSize: 16,
          fontWeight: '700',
          fontSize: 20,
          marginBottom: 5,
        }}
      >
        {review.rating + ''}/5
      </Text>
      <Text style={{ flex: 1, fontSize: 18 }}>
        {isNaN(Number(review.price)) || '$' + Number(review.price).toFixed(2)}
      </Text>
    </View>
    <Text style={{ fontSize: 16, marginBottom: 5 }}>{review.description}</Text>
  </View>
);

const ReviewList = ({ reviews }) => (
  <View style={{ margin: 10 }}>
    <FlatList
      data={reviews}
      renderItem={renderItem}
      keyExtractor={(_, i) => i + ''}
    />
  </View>
);

const mapStateToProps = state => ({
  loading: state.reviews.loading,
  error: state.reviews.error,
  reviews: state.reviews.itemReviews,
});

export default connect(mapStateToProps)(ViewItemReviews);
