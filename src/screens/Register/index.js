import { useState, useEffect } from 'react'
import { TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import firebaseConfig, { auth } from '../../config/firebase'
import { createUserWithEmailAndPassword, onAuthStateChanged, updateProfile } from 'firebase/auth';
import { Text, View, TextInput } from '../../../components/Themed'
import styles from './styles'

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailValid, setEmailValid] = useState(false)

  const userRegistration = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        var user = userCredential.user;
        navigation.navigate('Root')
        return updateProfile(user, {
          displayName: name
        })
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
      })
  }

  const validateEmail = (text) => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === true) {
      setEmailValid(false);
      setEmail(text)
    } else {
      setEmailValid(true);
    }
  };

  const validatePassword = (text) => {
      setPassword(text)
  };

  const validateName = (text) => {
    setName(text)
  };

  const goLogin = () => {
    navigation.navigate("Login")
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.navigate('Root')        
      }
    })
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.inputLogin}
        autoComplete="name"
        placeholder="Name"
        onChangeText={validateName}
        defaultValue={name}
      />
      <View style={styles.separator} lightColor="rgba(0,0,0,0.4)" darkColor="rgba(255,255,255,0.1)" />
      <View style={styles.viewEmail}>
        <TextInput
          style={styles.inputLogin}
          textContentType="emailAddress"
          autoComplete="email"
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="E-mail"
          onChangeText={validateEmail}
          defaultValue={email}
        />
        {emailValid ?
        <Text style={styles.errorEmail}>
          <FontAwesome
            name="exclamation-circle"
            size={25}
            color={"#FF0000"}
            style={{ marginRight: 15 }}
          />
        </Text>
       : null}
      </View>
      <View style={styles.separator} lightColor="rgba(0,0,0,0.4)" darkColor="rgba(255,255,255,0.1)" />
      <TextInput
        style={styles.inputLogin}
        textContentType="password"
        autoComplete="password"
        placeholder="Password"
        autoCapitalize="none"
        secureTextEntry={true}
        onChangeText={validatePassword}
        defaultValue={password}
        returnKeyType={'go'}
      />
      <View style={styles.separator} lightColor="rgba(0,0,0,0.4)" darkColor="rgba(255,255,255,0.1)" />
      <TouchableOpacity style={styles.button} onPress={userRegistration}
      go >
        <Text style={styles.buttonTxt}>
          Enter
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={goLogin}
      go >
        <Text style={styles.buttonTxt}>
          Login
        </Text>
      </TouchableOpacity>
    </View>
  );
}
