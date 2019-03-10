import React, { Component } from 'react';
import { StyleSheet, FlatList, Text, View } from 'react-native';

import { Link } from 'react-router-native';

const items = [
  {
    name: 'Fantastic Steel Sausages',
    price: 35.28105662006827,
    review: 3.5799123212450423,
    upc: 13047,
    type: 'upc',
  },
  {
    name: 'Awesome Metal Keyboard',
    price: 22.216984129511673,
    review: 2.989168549079524,
    upc: 29193,
    type: 'upc',
  },
  {
    name: 'Refined Granite Keyboard',
    price: 36.06635360111328,
    review: 3.4156108879965172,
    upc: 37258,
    type: 'upc',
  },
  {
    name: 'Gorgeous Rubber Chicken',
    price: 25.55289676947745,
    review: 2.5787440605421352,
    upc: 129,
    type: 'upc',
  },
  {
    name: 'Rustic Steel Chair',
    price: 26.249949444436567,
    review: 3.556917891164706,
    upc: 59336,
    type: 'upc',
  },
  {
    name: 'Handmade Rubber Pants',
    price: 32.11406405042659,
    review: 0.8015782523211246,
    upc: 80617,
    type: 'upc',
  },
  {
    name: 'Handmade Fresh Bike',
    price: 35.71537776163686,
    review: 2.4300452953534712,
    upc: 4316,
    type: 'upc',
  },
  {
    name: 'Small Metal Ball',
    price: 36.48689661582345,
    review: 3.656099669656667,
    upc: 35223,
    type: 'upc',
  },
  {
    name: 'Incredible Metal Car',
    price: 32.998269269958016,
    review: 1.4552621328887316,
    upc: 21478,
    type: 'upc',
  },
  {
    name: 'Handmade Rubber Gloves',
    price: 31.825525566396667,
    review: 4.384111915287933,
    upc: 38375,
    type: 'upc',
  },
  {
    name: 'Tasty Cotton Shirt',
    price: 25.187842251512514,
    review: 0.8770799932430695,
    upc: 44561,
    type: 'upc',
  },
  {
    name: 'Rustic Rubber Sausages',
    price: 36.21969358439691,
    review: 4.542433221629425,
    upc: 36389,
    type: 'upc',
  },
  {
    name: 'Generic Cotton Towels',
    price: 29.395789634392745,
    review: 0.880509634672173,
    upc: 96096,
    type: 'upc',
  },
  {
    name: 'Incredible Plastic Pizza',
    price: 34.37851056550238,
    review: 4.624841265638428,
    upc: 25270,
    type: 'upc',
  },
  {
    name: 'Gorgeous Plastic Bike',
    price: 31.834030700945895,
    review: 2.723089076208791,
    upc: 9071,
    type: 'upc',
  },
  {
    name: 'Intelligent Steel Chair',
    price: 23.094517549350535,
    review: 3.5008350098615972,
    upc: 55098,
    type: 'upc',
  },
  {
    name: 'Refined Metal Sausages',
    price: 32.81735563870018,
    review: 0.2641005174515909,
    upc: 61790,
    type: 'upc',
  },
  {
    name: 'Incredible Soft Tuna',
    price: 21.13111404532772,
    review: 4.3868162874244945,
    upc: 36312,
    type: 'upc',
  },
  {
    name: 'Rustic Soft Towels',
    price: 20.98810360573463,
    review: 0.6019689480526824,
    upc: 35712,
    type: 'upc',
  },
  {
    name: 'Incredible Wooden Bike',
    price: 22.953608934189162,
    review: 3.3495478841094917,
    upc: 91764,
    type: 'upc',
  },
];

export default class ViewList extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={items}
          renderItem={({ item }) => <ListItem item={item} />}
          keyExtractor={({ upc }) => upc + ''}
        />
      </View>
    );
  }
}

const ListItem = ({ item }) => (
  <Link to={`/view-item/${item.upc}/${item.type}`} underlayColor="#f0f4f7">
    <View style={styles.listItem}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
      <Text style={styles.itemReview}>
        {Math.floor(item.review * 100) / 100}/5
      </Text>
    </View>
  </Link>
);

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    padding: 10,
  },
  listItem: {
    padding: 10,
    flexDirection: 'row',
  },
  itemName: {
    flex: 4,
    fontSize: 20,
  },
  itemPrice: {
    flex: 1,
    fontSize: 15,
  },
  itemReview: {
    flex: 1,
    fontSize: 15,
  },
});
