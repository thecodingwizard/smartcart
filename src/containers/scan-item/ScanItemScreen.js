
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';

export default class ScanItemScreen extends React.Component {
  static navigationOptions = {
    title: "Scan Barcode",
  };

  handleBarCodeScanned = ({ type, data }) => {
    this.props.navigation.replace("ViewItem", {
      upc: data
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Scan Item page</Text>
        <Reader
          onBarCodeScanned={this.handleBarCodeScanned}
        />
      </View>
    );
  }
}

class Reader extends React.Component {
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
      <View >
        <BarCodeScanner
          onBarCodeScanned={this.props.onBarCodeScanned}
          style={{...StyleSheet.absoluteFill, ...styles.barcodeScanner}}
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
    height: 500
  }
});
