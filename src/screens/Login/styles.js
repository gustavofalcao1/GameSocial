import { StyleSheet} from 'react-native'

const styles = StyleSheet.create({
  login : {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 40
  },
  button:{
    alignItems: "center",
    backgroundColor: "#ff0000af",
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 5,
    marginTop: 60
  },
  buttonTxt: {
    fontSize: 20,
    fontWeight: "800",
  },
  viewEmail: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  separator: {
    height: 1,
    width: '70%',
    marginTop: -20,
  },
  inputLogin: {
    height: 40,
    width: '70%',
    margin: 12,
    padding: 10,
  },
  errorEmail: {
    position: "absolute",
    right: 20,
  }
})

export default styles