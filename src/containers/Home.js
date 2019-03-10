import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableHighlight,
  ScrollView,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: '100%',
  },
  imageWrapper: {
    alignItems: 'center',
    color: 'blue',
  },
  image: {
    width: 150,
    height: 150,
  },
  imageLabel: {
    marginTop: 15,
    fontSize: 22,
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
      <View style={styles.container}>
        <TouchableHighlight
          underlayColor="#f0f4f7"
          onPress={() => this.props.navigation.navigate('ScanItem')}
        >
          <View style={styles.imageWrapper}>
            <Image
              style={styles.image}
              source={require('../../assets/barcode-scan.png')}
            />
            <Text style={styles.imageLabel}>Scan Item</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor="#f0f4f7"
          onPress={() => this.props.navigation.navigate('AddItem', {
            upc: "037466012001"
          })}
        >
          <View style={styles.imageWrapper}>
            <Image
              style={styles.image}
              source={require('../../assets/scanner-keyboard.png')}
            />
            <Text style={styles.imageLabel}>Add item</Text>
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
            <Text style={styles.imageLabel}>Compare Items</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}
