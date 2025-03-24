import React, { useState, useEffect } from 'react'
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity ,
  RefreshControl,
  ActivityIndicator
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import firebaseConfig, { auth, db, storage } from '../../config/firebase'
import { onAuthStateChanged } from 'firebase/auth';
import { collection, onSnapshot, doc, updateDoc, arrayUnion, arrayRemove, increment } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
import styles from './styles'

const SERVER_URL = 'http://192.168.1.91:3000'

const Feed = () => {
  const postsCollection = collection(db, 'Posts');
  
  const [dataPosts, setDataPosts] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [dataUser, setDataUser] = useState([])
  const [imageTab, setImageTab] = useState([]);
  
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

  const loadPosts = () => {
    getUser()
    setLoaded(true)
    try {
      onSnapshot(postsCollection, (query) => {
        const posts = []
        query.forEach((doc) => {
          posts.push({ ...doc.data(), id: doc.id })
        })
        setDataPosts(posts.sort((a, b) => (a.postDate > b.postDate) ? -1 : 1))
        setLoaded(false)
      })
    } catch (error) {
      console.error(error)
    }
  }  

  const onRefresh = async () => {
    setRefreshing(true)
    setLoaded(false)
    if (dataPosts) {
      loadPosts()
      getData()
      setRefreshing(false)
    }
    else{
      setRefreshing(false)
    }
  }

  // TESTANDO
  const [ gotData, setGotData ] = useState([]);
  const getData = async () => {
    await fetch(`${SERVER_URL}/posts`)
    .then(resposta => resposta.json())
    .then( json => {
      setGotData(json.sort((a, b) => (a.postDate > b.postDate) ? -1 : 1));
    })
    .catch(() => {
      console.log('Erro', 'Não foi possível carregar os dados');
    });
  }

  useEffect(()=>{ 
    getData()
    if (loaded === false) {
      loadPosts()
    }
  }, [])

  const renderItem = ({item}) => {
      const idUser = dataUser.uid
      const id = item.id
      const likes = item.likesUser
      const obj = Object.values(likes)
      const match = obj.find(element => {
        if (element.includes(idUser)) {
          return true;
        }
      });

    const onLikePress = async () => {
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ likesCount: 'React PUT Request Example' })
      };

      await fetch(`${SERVER_URL}/posts`, requestOptions)
      .then(resposta => resposta.json())
      .then( json => {
        setGotData(json.sort((a, b) => (a.postDate > b.postDate) ? -1 : 1));
      })
      .catch(() => {
        console.log('Erro', 'Não foi possível carregar os dados');
      });

      const postRef = doc(db, 'Posts', id);
      
      if (match !== undefined) {
        console.log('- like')
        await updateDoc(postRef, {
          likesUser: arrayRemove(idUser),
          likesCount: increment(-1)
        });
      }
      
      if (match !== idUser) {
        console.log('+ like')
        await updateDoc(postRef, {
          likesUser: arrayUnion(idUser),
          likesCount: increment(1)
        });
      }
    }

    const returnurl = () => {
      const imageRef = ref(storage, '/' + item.pictureUrl);
      return getDownloadURL(imageRef);
    }
    
    return (
      <View style={styles.postContent}>
        <View style={styles.postHeader}>
          <View style={styles.postHeaderContent}>
            <View style={styles.postProfile}>
              <Image 
                style={styles.postAuthorProfile} 
                source={{uri:item.authorProfile}}
              />
            </View>
            <View style={styles.postUserInfo}>
              <Text style={styles.postAuthor}>{item.author}</Text>
              <Text style={styles.postPlace}>{item.place}</Text>
            </View>
            </View>
          <View style={styles.postOptions}>
            <TouchableOpacity onPress={() => {}}>
              <Ionicons 
                name='ellipsis-vertical'
                size={20}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Image style={styles.postPicture} source={{uri: item.pictureUrl}}/>
        </View>
        <View style={styles.postFooter}>
          <View style={styles.postActionsLeft}>
            <TouchableOpacity onPress={onLikePress}>
              {match == idUser ?
                <Ionicons 
                  style={styles.postActionButton} 
                  name='heart'
                  size={28}
                  color={'#f00'}
                />
                :
                  <Ionicons 
                  style={styles.postActionButton} 
                  name='heart-outline'
                  size={28}
                />
              }
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons 
                style={styles.postActionButton} 
                name='chatbubble-outline'
                size={25}
                />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons 
                style={styles.postActionButton} 
                name='paper-plane-outline'
                size={25}
                />
            </TouchableOpacity>
          </View>
          <View style={styles.postActionsRight}>
            <TouchableOpacity>
              <Ionicons 
                style={styles.postActionButton} 
                name='bookmark-outline'
                size={25}
                />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.postLikesCount}>
          <Text style={styles.postLikes}>{item.likesCount} likes</Text>
        </View>
        <View style={styles.postInfor}>
          <Text style={styles.postAuthorDescription}>
            <Text style={{fontWeight: 'bold', right: 1}}>{item.author}</Text>
            <Text>{item.description}</Text>
          </Text>
        </View>
        <View style={styles.postCommentsDetails}>
          <Text 
          ellipsizeMode='clip' 
          numberOfLines={1} 
          style={styles.postComments}
          >{item.comment}</Text>
          <TouchableOpacity>
            <Text style={styles.postSeeMoreComments}>... more</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.postTranslate}>
          <Text style={styles.postDate}>{item.postDate} • </Text>
          <TouchableOpacity>
            <Text style={styles.postTranslateText}>See translate</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  if (loaded == true) {
    return (
      <View style={styles.container}>
        <View style={styles.loading}>
          <ActivityIndicator color={"#000"}/>
        </View>
      </View>
    )
    
  } else {
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.postsList}
        data={gotData}
        keyExtractor={(item, index) => {
          return item._id;
        }}
        renderItem={renderItem}
        refreshControl={<RefreshControl
          refreshing={refreshing} 
          onRefresh={onRefresh} 
        />}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  )
}
}

export default Feed
