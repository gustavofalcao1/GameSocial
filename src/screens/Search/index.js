import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity ,
  TextInput
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import firebase from '../../config/firebase'

import styles from './styles'

const Search = () => {
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);


  const getUser = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setFilteredDataSource(user);
        setMasterDataSource(user);
      }
    })
    console.log(masterDataSource.displayName)
  }
  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = masterDataSource.displayName
      if (newData == text) {
        setFilteredDataSource(newData);
      }
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
    }
  }

  const ItemView = ({item}) => {
    return (
      // Flat List Item
      <Text
        style={styles.itemStyle}
        onPress={() => getItem(item)}>
        {item.uid}
        {'.'}
        {item.displayName.toUpperCase()}
      </Text>
    );
  }
  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  }

  useEffect(() => {
    getUser()
  }, []);

  return (
    <View style={styles.container}>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => searchFilterFunction(text)}
          underlineColorAndroid="transparent"
          placeholder="Search Here"
        />
        <TouchableOpacity onPress={getUser}>
          <Text>GO</Text>
        </TouchableOpacity>
        <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
        />
      </View>
  )
}

export default Search
