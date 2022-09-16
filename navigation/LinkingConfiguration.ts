/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from '../types';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Feed: {
            screens: {
              FeedScreen: 'feed',
            },
          },
          Search: {
            screens: {
              SearchScreen: 'search',
            },
          },
          AddPost: {
            screens: {
              AddPostScreen: 'addPost',
            },
          },
          Infinite: {
            screens: {
              InfiniteScreen: 'infinite',
            },
          },
          Profile: {
            screens: {
              ProfileScreen: 'profile',
            },
          },
        },
      },
      Messenger: 'messenger',
      Status: 'status',
      NotFound: '*',
      Login: 'login',
      Register: 'register',
    },
  },
};

export default linking;
