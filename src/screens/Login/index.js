import { useState, useEffect } from 'react'
import { TouchableOpacity, Button, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import firebaseConfig, { auth } from '../../config/firebase'
import { signInWithEmailAndPassword, onAuthStateChanged, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { Text, View, TextInput } from '../../../components/Themed'
import styles from './styles'

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailValid, setEmailValid] = useState(false)
  const [logged, setLogged] = useState(false)
  const [loading, setLoading] = useState(true)

  const handleAuth = () => {
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            var user = userCredential.user;
            navigation.navigate('Root')
            return user
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
          })
      });
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

  const goRegister = () => {
    navigation.navigate("Register")
  };

  const isLogged = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLogged(true) 
        navigation.navigate('Root')
      }
      else {
        setLogged(false)
        setLoading(false)
       }
    })
  }

  useEffect(() => {
    isLogged()
  }, [])

  if (loading == true) {
    return (
      <View style={styles.container}>
        <View style={styles.loading}>
          <ActivityIndicator color={"#000"}/>
        </View>
      </View>
    )
  } else {
  return (
    <View style={styles.login}>
        <View style={styles.container}>
          <Text style={styles.title}>Login</Text>
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
          <TouchableOpacity style={styles.button} onPress={handleAuth}
          go >
            <Text style={styles.buttonTxt}>
              Enter
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={goRegister}
          go >
            <Text style={styles.buttonTxt}>
              Register
            </Text>
          </TouchableOpacity>
        </View>
    </View>
  );
}
}
