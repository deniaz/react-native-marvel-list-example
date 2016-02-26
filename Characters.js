/**
 * @flow
 */
'use strict';

var React = require('react-native');

var {
  Component,
  Image,
  ListView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} = React;

var Character = require('./Character');

var md5 = require('md5');
const PRIVATE_KEY = '';
const PUBLIC_KEY = '';

const LIMIT = 25;

let ts = Date.now();
let hash = md5(ts + PRIVATE_KEY + PUBLIC_KEY);
let REQUEST_URL = 'http://gateway.marvel.com:80/v1/public/characters?ts=' + ts + '&apikey=' + PUBLIC_KEY + '&hash=' + hash + '&limit=' + LIMIT + '&offset=';

class Characters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      isLoading: false,
      offset: 0,
      loaded: false
    };
  }

  componentDidMount() {
    this._characters = [];
    this.fetchData(this.state.offset);
  }

  fetchData(offset) {
    fetch(REQUEST_URL + offset)
      .then((response) => response.json())
      .then((data) => {
        this._characters = this._characters.concat(data.data.results);

        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(this._characters),
          loaded: true,
          isLoading: false,
        });
      })
      .done();
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderCharacter.bind(this)}
        onEndReached={this.onEndReached.bind(this)}
        style={styles.listView} />
    );
  }

  onPress(character: Object) {
    this.props.navigator.push({
      title: character.name,
      component: Character,
      passProps: {character},
    });
  }

  onEndReached() {
    if (!this.state.isLoading) {
      var offset = this.state.offset += LIMIT;
      this.setState({
        isLoading: true,
        offset: offset
      });

      this.fetchData(this.state.offset);
    }
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  renderCharacter(character) {
    let imagePath = character.thumbnail.path + '.' + character.thumbnail.extension;
    return (
      <TouchableHighlight onPress={() => this.onPress(character)}>
        <View style={styles.container}>
          <Image source={{uri: imagePath}} style={styles.thumbnail} />
          <View style={styles.rightContainer}>
            <Text style={styles.title}>{character.name}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  rightContainer: {
    flex: 1,
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center'
  },
  thumbnail: {
    width: 53,
    height: 81
  },
});

module.exports = Characters;
