import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
  User,
} from '@react-native-google-signin/google-signin';

function App() {
  // Set an initializing state whilst Firebase connects
  const [user, setUser] = useState<User>({user:{}} as User);
  const [msg, setMsg] = useState('');

  GoogleSignin.configure();

  function setState(param: { userInfo: User }) {
    setUser(param.userInfo)
  }

  // Somewhere in your code
  const onGoogleButtonPress = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setState({ userInfo });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        setMsg('user cancelled the login flow')
      } else if (error.code === statusCodes.IN_PROGRESS) {
        setMsg('operation (e.g. sign in) is in progress already')
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        setMsg('play services not available or outdated')
      } else {
        setMsg('some other error happened')
      }
    }
  };
  function GoogleSignIn() {
    if (user.idToken) {
      return <></>
    }
    return (
      <GoogleSigninButton
        onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
      />
    );
  }
  function UserInfo() {
    if (!user.idToken) {
      return <Text style={styles.innerText}>{msg}</Text>
    }
    return (
        <Text style={styles.baseText}>Welcome {user.user.email}</Text>
    )
  }

  const styles = StyleSheet.create({
    mainView: {
      backgroundColor: 'white',
      flex: 1
    },
    baseText: {
      fontWeight: 'bold'
    },
    innerText: {
      color: 'red'
    }
  });

  return (
    <View style={styles.mainView}>
      <Text />
      <Text />
      <Text />
      <Text>Hello Woohoo!</Text>
      <GoogleSignIn />
      <UserInfo />
    </View>
  );
}

export default App;
