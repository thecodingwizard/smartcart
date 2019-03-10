import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList, StyleSheet, View, Button } from 'react-native';
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

  addReview = () => {
    this.props.navigation.navigate('PostReview', {
      upc: this.props.navigation.getParam('upc'),
    });
  };

  render() {
    if (!this.props.loading) {
      return (
        <View style={{ paddingTop: 10 }}>
          <Button title="Add Review" onPress={this.addReview} />
          <ReviewList reviews={this.props.reviews} />
        </View>
      );
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
    <Text
      style={{
        fontSize: 16,
        fontWeight: '700',
        fontSize: 20,
        marginBottom: 5,
      }}
    >
      {review.rating + ''}/5
    </Text>
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
