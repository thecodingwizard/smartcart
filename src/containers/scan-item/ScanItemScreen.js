import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';

export default class ScanItemScreen extends React.Component {
  static navigationOptions = {
    title: 'Scan Barcode',
  };

  handleBarCodeScanned = ({ type, data }) => {
    if (this.props.navigation.getParam('goBackToCompareA')) {
      this.props.navigation.navigate('CompareItems', {
        upc: data,
      });
    } else if (this.props.navigation.getParam('goBackToCompareB')) {
      this.props.navigation.navigate('CompareItems', {
        otherUpc: data,
        upc: this.props.navigation.getParam('otherParam'),
      });
    } else {
      this.props.navigation.replace('ViewItem', {
        upc: data,
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Scanner
          onBarCodeScanned={this.handleBarCodeScanned}
          style={styles.backgroundContainer}
        />
        <View style={styles.imageWrapper}>
          <Image
            source={require('../../../assets/camera-box.png')}
            style={styles.image}
          />
        </View>
      </View>
    );
  }
}

class Scanner extends React.Component {
  state = {
    hasCameraPermission: null,
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View>
        <BarCodeScanner
          onBarCodeScanned={this.props.onBarCodeScanned}
          style={{ ...styles.absoluteFill, ...styles.barcodeScanner }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    padding: 10,
  },
  barcodeScanner: {
    height: 500,
  },
  imageWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 10,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  image: {
    width: 250,
    height: 250,
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
