/**
 * @providesModule MarvelApp
 * @flow
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  Component,
  NavigatorIOS,
  StyleSheet
} = React;

var Characters = require('./Characters');

class MarvelReactNative extends Component {
  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Marvel',
          component: Characters
        }}
      />
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

AppRegistry.registerComponent('MarvelReactNative', () => MarvelReactNative);

//module.exports = MarvelReactNative;