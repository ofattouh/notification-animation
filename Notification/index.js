import React, { Component } from 'react';
import { Animated, Easing, StyleSheet, Text } from 'react-native';

export default class Notification extends Component {
  constructor(props){  
    super(props);
    
    // animatedValue will be used as the value for opacity. Initial Value: 0
    this.animatedValue = new Animated.Value(0); 
  }

  static defaultProps = {
    delay: 3000,
    // onOpen: () => {},
    onClose: () => {},
  };

  state = {
    height: -1000,
  };

  componentDidMount() {
    this.startSlideIn();
  }

  getAnimation(value, autoHide) {
    const { delay } = this.props;

    return Animated.timing( 
      this.animatedValue,
      {
        toValue: value,
        duration: 500,
        easing: Easing.cubic,
        delay: autoHide ? delay : 0,
        useNativeDriver: false,
      }
    );
  }

  // from 0 to 1
  startSlideIn () {
    const { autoHide } = this.props;
    this.animatedValue.setValue(0);

    this.getAnimation(1)
      .start(() => {
        if (autoHide){
          this.startSlideOut();
        }
      });
  }

  // from 1 to 0
  startSlideOut() {
    const { autoHide, onClose } = this.props;
    this.animatedValue.setValue(1);
    this.getAnimation(0, autoHide).start(() => onClose());
  }

  onLayoutChange = (event) => {
    const { layout: { height } } = event.nativeEvent;

    // only re-render component once for performance reasons
    if (this.state.height === -1000) {
      this.setState({ height });
    }
  }

  render() {
    const { message } = this.props;
    const { height } = this.state;

    const top = this.animatedValue.interpolate({
      inputRange: [0, 1], // ascending
      outputRange: [-height, 0],
    });

    return (
      <Animated.View onLayout={this.onLayoutChange} style={[ styles.main, { top } ]}>
        <Text style={styles.text}>{message}</Text>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 20,
    position: 'absolute',
    left: 0,
    right: 0,
  },
  text: {
    color: '#fff',
  },
});
