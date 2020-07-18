import React, {Component} from 'react';
import { StyleSheet, Dimensions, Image } from 'react-native';
import { FlatList, Alert } from 'react-native';
import UserPost from '../components/UserPost';
import { Text, View } from '../components/Themed';
import { Post } from '../types';

type State = typeof initialState;

const initialState = Object.freeze({rows: [] as Post[]});

class Home extends Component<{}, State> {
  state = initialState;

  componentDidMount() {
    // GET list here
    this.findCoordinates();
    setTimeout(() => {
      this.setState({
        rows: [{
            id: '0',
            username: 'noah davidson',
            imageSrc: 'https://via.placeholder.com/256x144',
            liked: true,
          },
          {
            id: '1',
            username: 'chococowmilk',
            imageSrc: 'https://via.placeholder.com/256x144',
            liked: false,
          }]
      });
    }, 2000)
  }

  findCoordinates = () => {
		navigator.geolocation.getCurrentPosition(
			position => {
        console.log('position', position)
			},
			error => Alert.alert(error.message),
			{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
		);
	};

  renderPost = ({ item } : {item: Post}) => {
    return (
      <UserPost post={item} />
    )
  }

  render() {
    return (
      <FlatList
        style={styles.container}
        data={this.state.rows}
        renderItem={this.renderPost}
      />
    );
  }
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  row: {
    flex: 1,
  },
});