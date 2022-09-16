import { StyleSheet} from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  buttonContainer: {
    width: 300,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    padding: 10,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 60
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 300,
    borderWidth: 8,
    borderColor: "#0f0f",
  },
  title: {
    fontSize: 20,
  },
  btnTxt: {
    marginTop: 15,
    fontSize: 25,
    color: '#00ff',
  },
  icons: {
    color: "#00ff",
  },
  inputName: {
    height: 40,
    width: '70%',
    margin: 12,
    padding: 10,
  },
  nameContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    margin: 10,

  }
})

export default styles