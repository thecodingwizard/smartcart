
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';

export default class ScanItem extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Scan Item page</Text>
        <Reader
          history={this.props.history}
        />
        <Text>after</Text>
      </View>
    );
  }
}

class Reader extends React.Component {
  state = {
    hasCameraPermission: null,
  }

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
        <Text>inner before</Text>
        <BarCodeScanner
          onBarCodeScanned={this.handleBarCodeScanned}
          style={{...StyleSheet.absoluteFill, ...styles.barcodeScanner}}
        />
        <Text>inner after</Text>
      </View>
    );
  }

  handleBarCodeScanned = ({ type, data }) => {
    console.log(`Bar code with type ${type} and data ${data} has been scanned!`);
    this.props.history.push(`/view-item/${data}/${type}`);
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
