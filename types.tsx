// todo export 

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  HomeTab: undefined;
  TabTwo: undefined;
};

export type HomeParamList = {
  HomeScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};

export type Post = {
  id: string,
  username: string,
  imageSrc: string,
  liked: boolean,
};

export type Reducers = 'home' | 'auth';
