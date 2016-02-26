/**
 * @flow
 */
'use strict';

var React = require('react-native');
var {
  Component,
  StyleSheet,
  Text,
  View,
} = React;

class Character extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{this.props.character.name}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    marginTop: 60,
    paddingTop: 20,
  },
  text: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center'
  }
});

module.exports = Character;