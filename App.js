import React, { Component } from 'react';
import { Text, TouchableOpacity, StyleSheet, View, SafeAreaView } from 'react-native';
import Notification from './Notification';

export default class App extends Component {
  state = {
    notify: false,
    message: 'This message will close after 3 seconds...',
  };

  toggleNotification = () => {
    this.setState({ notify: !this.state.notify });
  }

  render() {
    const notify = this.state.notify ?
      <Notification autoHide message={this.state.message} onClose={this.toggleNotification} /> : null;

    return (
      <SafeAreaView>
        <View style={styles.content}>
          <TouchableOpacity onPress={this.toggleNotification} style={styles.btn}>
            <Text style={styles.text}>Show message</Text>
          </TouchableOpacity>
          {notify}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    padding: 10,
    overflow: 'hidden',
  },
  btn: {
    margin: 30,
    backgroundColor: '#9b59b6',
    borderRadius: 3,
    padding: 10,
    width: 200,
  },
  text: {
    textAlign: 'center',
    color: '#fff',
  }
});

// expo init my-app
// https://reactnative.dev/docs/animated
// https://reactnative.dev/docs/easing
