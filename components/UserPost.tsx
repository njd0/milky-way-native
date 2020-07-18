import React, {Component} from 'react';
import { StyleSheet, Dimensions, Image } from 'react-native';
import { Text, View, Button } from './Themed';
import { Post } from '../types';
import { Ionicons } from '@expo/vector-icons';

type Props = { post: Post };

class UserPost extends Component<Props> {
  renderLikeIcon() {
    return this.props.post.liked ? {
      name: "ios-heart",
      color: "#f54269",
    } : {
      name: "ios-heart-empty",
      color: "#ccc",
    };  
  }

  handleLike() {
    console.log("This should be printed in console!");
  }

  render() {
    return (
      <View style={styles.container}>
          <Text>{this.props.post.username}</Text>
          <Image
            style={styles.image}
            source={{uri: this.props.post.imageSrc}}
          />
          <View>
            <Button
              onPress={() => {this.handleLike()}}
              title={''}
              style={styles.buttonIcon}
            >
            <Ionicons
              {...this.renderLikeIcon()}
              size={25}
              style={styles.icon}
            />
            </Button>
          </View>
        </View>
    );
  }
  
}

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: deviceWidth,
  },
  image: {
    width: deviceWidth,
    height: deviceWidth * 0.5625,
    resizeMode: "cover",
  },
  buttonIcon: {
    width: 50,
    backgroundColor: 'transparent'
  },
  icon: {
    marginLeft: 'auto',
    marginRight: 'auto',
  }
});

export default UserPost;