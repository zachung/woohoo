import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: "white",
    flex: 1
  },
  baseText: {
    fontWeight: "bold"
  },
  innerText: {
    color: "red"
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3
  }
});

export default styles;
