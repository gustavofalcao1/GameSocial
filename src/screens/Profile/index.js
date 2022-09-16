import React, { useState, useEffect } from 'react'
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity ,
  Button
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import firebase from '../../config/firebase'

import styles from './styles'
import { TextInput } from '../../../components/Themed'

const Profile = ({ navigation }) => {
  const [dataUser, setDataUser] = useState([])
  const [pickedImagePath, setPickedImagePath] = useState('');
  const [name, setName] = useState('')

  const getUser = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setDataUser(user)
      } else {
      }
    }); 
  }

  const singOut = () => {
    firebase.auth().signOut().then(() => {
      navigation.navigate('Login')
    }).catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
    });
  }

  const showImagePicker = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.cancelled) {
      setPickedImagePath(result.uri);
    }
  }

  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }
    const result = await ImagePicker.launchCameraAsync();
    if (!result.cancelled) {
      setPickedImagePath(result.uri);
    }
  }
  const updateProfileImage = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        return user.updateProfile({
          photoURL: pickedImagePath
        })       
      }
    })
  }
  const updateDisplayName = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        return user.updateProfile({
          displayName: name
        })       
      }
    })
    navigation.navigate('Profile')
  }

  const validateName = (text) => {
    setName(text)
  };

  useEffect(() => {
    getUser()
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <View style={styles.buttonContainer}>
         <TouchableOpacity onPress={showImagePicker}>
           <Ionicons style={styles.icons} name='image' size={85} />
          </TouchableOpacity>
          <TouchableOpacity onPress={openCamera}>
           <Ionicons style={styles.icons} name='camera' size={85} />
          </TouchableOpacity>      
       </View>
        <Image source={{ uri: dataUser.photoURL }} style={styles.image}/>
        <TouchableOpacity onPress={updateProfileImage}>
          <Ionicons style={styles.icons} name='checkmark-circle-outline' size={45} />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>UID: {dataUser.uid}</Text>
      <TextInput
        style={styles.inputName}
        autoComplete="name"
        placeholder="Name"
        onChangeText={validateName}
        defaultValue={name}
      />
      <View style={styles.nameContainer}>
        <Text style={styles.title}>Name: {dataUser.displayName}</Text>
        <TouchableOpacity onPress={updateDisplayName}>
          <Ionicons style={styles.icons} name='pencil' size={35} />
      </TouchableOpacity>
      </View>
      <Text style={styles.title}>Email: {dataUser.email}</Text>
      <TouchableOpacity
        onPress={singOut}
      >
        <Text style={styles.btnTxt}>Sing Out</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Profile
