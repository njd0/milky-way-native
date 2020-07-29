import React, {Component} from 'react';
import { StyleSheet, Dimensions, Image, TouchableOpacity, Button } from 'react-native';
import { FlatList, Alert } from 'react-native';
import UserPost from '../components/UserPost';
import { Text, View } from '../components/Themed';
import { Post } from '../types';
import { connect } from 'react-redux';

// Imports: Redux Actions
import { login } from '../redux/actions/authActions';
import { likePost, dislikePost, fetchPosts } from '../redux/actions/homeActions';

type State = Readonly<typeof initialState>
type Props = StoreProps;
// type Props = OwnProps & InjectedProps & StoreProps

type StoreProps = { 
  posts: Post[], 
  counter: number, 
  loggedIn: boolean, 
  reduxLogin: Function, 
  reduxFetchPosts: Function, 
  reduxLikePost: Function, 
  reduxDislikePost: Function
};

const initialState = Object.freeze({rows: [] as Post[]});

class Home extends Component<Props, State> {
  readonly state : State = initialState;

  componentDidMount() {
    // GET list here
    // this.findCoordinates();
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

      this.props.reduxFetchPosts();
      console.log('POST PROPS', this.props.posts)
    }, 2000)
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

  renderPost = ({ item } : {item: Post}) => {
    return (
      <UserPost post={item} />
    )
  }

  render() {
    return (
      <>
      <View >
          <Text >Logged In: </Text>
          <Text >{`${this.props.loggedIn}`}</Text>

          <Button
            title="Login"
            onPress={this.props.loggedIn === false ? () => this.props.reduxLogin(true) : () => this.props.reduxLogin(false)}
          />
        </View>

        <Text >Counter</Text>

        <View >
          <TouchableOpacity onPress={() => this.props.reduxLikePost()}>
            <Text>+</Text>
          </TouchableOpacity>

          <Text>{this.props.counter}</Text>

          <TouchableOpacity onPress={() => this.props.reduxDislikePost()}>
            <Text >-</Text>
          </TouchableOpacity>
        </View>
      <FlatList
        style={styles.container}
        data={this.state.rows}
        renderItem={this.renderPost}
      />
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
    posts: state.homeReducer.posts,
    counter: state.homeReducer.counter,
    loggedIn: state.authReducer.loggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    reduxFetchPosts: () => dispatch(fetchPosts()),
    reduxLikePost: (id) => dispatch(likePost(id)),
    reduxDislikePost: (id) => dispatch(dislikePost(id)),
    reduxLogin: (trueFalse) => dispatch(login(trueFalse)),
  };
};
// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Home);