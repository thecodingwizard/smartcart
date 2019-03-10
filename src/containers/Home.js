import React, { Component } from 'react';
import {
  Button,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableHighlight,
  ScrollView,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageWrapper: {
    marginBottom: 50,
    alignItems: 'center',
    color: 'blue',
  },
  image: {
    width: 150,
    height: 150,
  },
  imageLabel: {
    marginTop: 15,
    fontSize: 20,
  },
});

export default class Home extends Component {
  static navigationOptions = {
    title: 'Smart Cart',
    headerStyle: {
      backgroundColor: '#0967D2',
    },
    headerTintColor: '#fff',
  };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableHighlight
          underlayColor="#f0f4f7"
          onPress={() =>
            this.props.navigation.navigate('ViewItem', {
              upc: '00430999',
            })
          }
        >
          <View style={styles.imageWrapper}>
            <Image
              style={styles.image}
              source={require('../../assets/search.png')}
            />
            <Text style={styles.imageLabel}>View item</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor="#f0f4f7"
          onPress={() =>
          this.props.navigation.navigate('PostReview', {
              upc: '00430999'})}
        >
          <View style={styles.imageWrapper}>
            <Image
              style={styles.image}
              source={require('../../assets/pencil-alt.png')}
            />
            <Text style={styles.imageLabel}>Post review</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor="#f0f4f7"
          onPress={() => this.props.navigation.navigate('ScanItem')}
        >
          <View style={styles.imageWrapper}>
            <Image
              style={styles.image}
              source={require('../../assets/barcode-scan.png')}
            />
            <Text style={styles.imageLabel}>Scan item</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor="#f0f4f7"
          onPress={() => this.props.navigation.navigate('CompareItems')}
        >
          <View style={styles.imageWrapper}>
            <Image
              style={styles.image}
              source={require('../../assets/scanner.png')}
            />
            <Text style={styles.imageLabel}>compare items test</Text>
          </View>
        </TouchableHighlight>
      </ScrollView>
    );
  }
}
