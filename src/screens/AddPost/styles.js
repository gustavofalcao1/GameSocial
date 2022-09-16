import { StyleSheet} from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  input: {
    margin: 15,
    height: 40,
    width: 300,
    borderColor: '#7a42f4',
    borderBottomWidth: 1
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
    marginBottom: 10
  },
  image: {
    width: 350,
    height: 350,
    resizeMode: 'cover',
  },
  postActionButton: {
    backgroundColor: "#00f",
    color: "#FFF",
    marginTop: 20,
  }
})

export default styles