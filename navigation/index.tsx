import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ColorSchemeName, TouchableOpacity, Image } from 'react-native';

import styles from '../src/styles/global'
import useColorScheme from '../hooks/useColorScheme';

import LoginScreen from '../src/screens/Login';
import RegisterScreen from '../src/screens/Register';
import FeedScreen from '../src/screens/Feed';
import SearchScreen from '../src/screens/Search';
import AddPostScreen from '../src/screens/AddPost';
import InfiniteScreen from '../src/screens/Infinite';
import ProfileScreen from '../src/screens/Profile';

import MessengerScreen from '../src/screens/Messenger';
import StatusScreen from '../src/screens/Status';
import NotFoundScreen from '../src/screens/NotFound';

import logo from '../assets/images/logo.png'

import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import { View } from '../components/Themed';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'card' }}>
        <Stack.Screen name="Messenger" component={MessengerScreen} />
        <Stack.Screen name="Status" component={StatusScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
    initialRouteName="Feed"
    screenOptions={({ navigation, route }) => ({
      tabBarShowLabel: false,
      headerTitle: () => (
        <Image style={styles.headLogoTittle} source={logo} />
      ),
      headerRight: () => (
        <View style={styles.headerRight}>
          <TouchableOpacity
          style={styles.headerRightButton}
          onPress={() => navigation.navigate('Status')}
        >
          <Ionicons name='heart-outline' size={25} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.headerRightButton}
          onPress={() => navigation.navigate('Messenger')}
        >
          <Ionicons name='paper-plane-outline' size={25} />
        </TouchableOpacity>
        </View>
      ),
      tabBarIcon: ({ focused, color }) => {
        let iconName
        let iconSize

        if (route.name === 'Feed') {
          iconName = focused
            ? 'home'
            : 'home-outline'
          iconSize = focused
            ? 30
            : 25
        } else if (route.name === 'Search') {
          iconName = focused 
            ? 'search' 
            : 'search-outline'
          iconSize = focused
            ? 30
            : 25
        } else if (route.name === 'AddPost') {
          iconName = focused 
            ? 'add' 
            : 'add-outline'
          iconSize = focused
            ? 45
            : 40
        } else if (route.name === 'Infinite') {
          iconName = focused 
            ? 'infinite' 
            : 'infinite-outline'
          iconSize = focused
            ? 30
            : 25
        } else if (route.name === 'Profile') {
          iconName = focused 
            ? 'ellipsis-horizontal' 
            : 'ellipsis-horizontal-outline'
          iconSize = focused
            ? 30
            : 25
        }
        return <Ionicons name={iconName} size={iconSize} color={color} />;
      },
      tabBarActiveTintColor: '#00CC10',
      tabBarInactiveTintColor: '#666',
    })}
    >
      <BottomTab.Screen
        name="Feed"
        component={FeedScreen}
        options={({ }: RootTabScreenProps<'Feed'>) => ({
        })}
      />
      <BottomTab.Screen
        name="Search"
        component={SearchScreen}
        options={({ }: RootTabScreenProps<'Search'>) => ({
        })}
      />
      <BottomTab.Screen
        name="AddPost"
        component={AddPostScreen}
        options={({ }: RootTabScreenProps<'AddPost'>) => ({
        })}
      />
      <BottomTab.Screen
        name="Infinite"
        component={InfiniteScreen}
        options={({ }: RootTabScreenProps<'Infinite'>) => ({
        })}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ }: RootTabScreenProps<'Profile'>) => ({
        })}
      />
    </BottomTab.Navigator>
  );
}