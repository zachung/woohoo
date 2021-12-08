import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
  User,
} from '@react-native-google-signin/google-signin';

function App() {
  // Set an initializing state whilst Firebase connects
  const [user, setUser] = useState<User>({user:{}} as User);

  GoogleSignin.configure();

  function setState(param: { userInfo: User }) {
    setUser(param.userInfo)
    console.log(param.userInfo)
  }

  // Somewhere in your code
  const onGoogleButtonPress = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setState({ userInfo });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
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
      return <></>
    }
    return (
        <Text>Welcome {user.user.email}</Text>
    )
  }

  return (
    <View>
      <Text />
      <Text />
      <Text />
      <Text />
      <GoogleSignIn />
      <UserInfo />
    </View>
  );
}

export default App;
