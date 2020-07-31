import React, {Component} from 'react';
import { StyleSheet, Dimensions, Image, TouchableOpacity, Button } from 'react-native';
import { FlatList, ActivityIndicator, Alert } from 'react-native';
import UserPost from '../components/UserPost';
import { Text, View } from '../components/Themed';
import { Post } from '../types';
import { connect } from 'react-redux';
import {homeActions} from "../data/actions";

type State = Readonly<typeof initialState>
type Props = StoreProps;
// type Props = OwnProps & InjectedProps & StoreProps

type StoreProps = { 
  posts: Post[],
  loadPosts: Function, 
};

const initialState = Object.freeze({rows: [] as Post[]});

class Home extends Component<Props, State> {
  readonly state : State = initialState;

  componentDidMount() {
    this.props.loadPosts(true);
  }

  // findCoordinates = () => {
	// 	navigator.geolocation.getCurrentPosition(
	// 		position => {
  //       console.log('position', position)
	// 		},
	// 		error => Alert.alert(error.message),
	// 		{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
	// 	);
  // };
  
  renderSpinner = () => {
    return <ActivityIndicator size="large" />
  }

  renderPost = ({ item } : {item: Post}) => {
    return <UserPost post={item} />
  }

  renderList() {
    return <FlatList
        style={styles.container}
        data={this.props.posts.data}
        renderItem={this.renderPost}
      />
  }

  render() {
    return (
      <>
        {
          this.props.posts.isFetching ? 
          this.renderSpinner() : 
          this.renderList()
        }
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  row: {
    flex: 1,
  },
});

const mapStateToProps = (state) => {
  return {
    posts: state.home.posts,
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     reduxFetchPosts: () => dispatch(loadPosts()),
//     // reduxLikePost: (id) => dispatch(likePost(id)),
//     // reduxDislikePost: (id) => dispatch(dislikePost(id)),
//     // reduxLogin: (trueFalse) => dispatch(login(trueFalse)),
//   };
// };

export default connect(mapStateToProps, {
  loadPosts: homeActions.loadPosts,
})(Home);