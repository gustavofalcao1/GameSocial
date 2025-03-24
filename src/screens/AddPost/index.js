import React, {useState, useEffect} from 'react'
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import firebaseConfig, { auth, db, storage } from '../../config/firebase'
import { onAuthStateChanged } from 'firebase/auth';
import { collection, doc, setDoc, onSnapshot } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import styles from './styles'

const SERVER_URL = 'http://192.168.1.91:3000'

const AddPost = () => {
  const postsCollection = collection(db, 'Posts');
  const [docID, setDocID] = useState([])
  const [placeText, setPlaceText] = useState('')
  const [descriptionText, setDescriptionText] = useState('')
  const navigation = useNavigation(); 
  const [dataUser, setDataUser] = useState([])
  const [pickedImagePath, setPickedImagePath] = useState('')
  const [fileName, setFileName] = useState('')
  const [loaded, setLoaded] = useState(false)

  const getUser = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User logged in already or has just logged in.
        setDataUser(user)
      } else {
        // User not logged in or has just logged out.
      }
    }); 
  }

  useEffect(() => {
    getUser();
  }, []);

  const getDocID = () => {
    onSnapshot(postsCollection, (query) => {
      const posts = []
      query.forEach((doc) => {
        posts.push(doc.id)
      })
      setDocID(posts)
    })
  }

  const momentDate = () => {
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()} ${current.getHours()}:${current.getMinutes()}`;
    
    return date
  }

  const randomID = () => {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }

  const handlePlace = (text) => {
    setPlaceText(text)
  }

  const handleDescription = (text) => {
    setDescriptionText(text)
  }

  const updateImage = async () => {
    try {
      const img = pickedImagePath.replace("file://", "")
      const filename = img.substring(img.lastIndexOf('/') + 1)
      setFileName(filename)
      
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function() {
          resolve(xhr.response);
        };
        xhr.onerror = function() {
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", img, true);
        xhr.send(null);
      });
      
      const storageRef = ref(storage, filename);
      const uploadTask = uploadBytesResumable(storageRef, blob);
      
      uploadTask.on('state_changed', 
        (snapshot) => {
          console.log(snapshot.totalBytes)
        }, 
        (err) => {
          console.log(err)
        }, 
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log(downloadURL);
        }
      );
    } catch (error) {
      console.log("Error->", error);
      alert(`Error-> ${error}`);
    }
  }

  const addPost = async () => {
    getDocID()
    momentDate()
    getUser()
    updateImage()
    //if (description == null) {
    //  Alert.alert("Please, typing any Task")
    //} else {
      try {
        const id = randomID()
        const currentDate = momentDate()
        if (docID.indexOf(id) > -1) {
          console.log('Doc ID exists')
        } else {
          await setDoc(doc(db, 'Posts', id), {
            id: id,
            author: dataUser.displayName,
            authorUid: dataUser.uid,
            authorProfile: dataUser.photoURL,
            place: placeText,
            pictureUrl: fileName,
            likesUser: [],
            likesCount: 0,
            postDate: currentDate,
            description: descriptionText,
            comment: 'My dream'
          });
        }
      } catch (error) {
        console.error(error)
      }
      goFeed()
      setLoaded(true)
    //}
  }

  const goFeed = () => {
    if (loaded) {
      navigation.navigate('Root')
    }
  }

  const showImagePicker = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.canceled) {
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
    if (!result.canceled) {
      setPickedImagePath(result.uri);
    }
  }

  //TEST
  const updateData = async () => {
    momentDate()
    getUser()
    const currentDate = momentDate()
    if (!dataUser.uid) {
      alert("Error: Usuario nao existente")
    } else {
      await fetch(`${SERVER_URL}/posts`, {
        method: 'POST',
        headers: {'Content-type': 'application/json', 'X-Powered-By': 'Express'},
        body: JSON.stringify({
          author: `${dataUser.displayName}`,
          authorUid: `${dataUser.uid}`,
          authorProfile: `${dataUser.photoURL}`,
          place: `${placeText}`,
          pictureUrl: `${pickedImagePath}`,
          likesUser: [],
          likesCount: 0,
          postDate: `${currentDate}`,
          description: `${descriptionText}`,
          comment: "My dream"
        }),
      })
      .then(() => {
        alert('Sucess', 'Inserido com sucesso')
        navigation.navigate('Feed')
      })
      .catch(() => {
      alert('Erro', 'Não foi possível inserir dados');
      });
    }
  }

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
       { pickedImagePath == '' ? null :
        <Image source={{ uri: pickedImagePath }} style={styles.image}/>}
      </View>
      <TextInput style = {styles.input}
        underlineColorAndroid = "transparent"
        placeholder = "Place"
        placeholderTextColor = "#9a73ef"
        autoCapitalize = "none"
        onChangeText = {handlePlace}/>
      <TextInput style = {styles.input}
        underlineColorAndroid = "transparent"
        placeholder = "Description"
        placeholderTextColor = "#9a73ef"
        autoCapitalize = "none"
        onChangeText = {handleDescription}/>
      <TouchableOpacity>
        <Ionicons 
          style={styles.postActionButton} 
          name='add-outline'
          size={45}
          onPress={()=>{
            updateData()
          }}
          />
      </TouchableOpacity>
    </View>
  )
}

export default AddPost
