import {GoogleSignin} from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';
import * as helper from '../../database/database-helper';

const WEB_API_KEY = 'AIzaSyB6AlBiawWCOgXpAdOYuqm8vNEJX4I1EVQ';

GoogleSignin.configure({
  webClientId:
    '50803647850-411jbhjg7169l96avctukst3b3atq8bt.apps.googleusercontent.com',
});

export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

export const sendEmailVerification = () => {
  return async (getState) => {
    const token = getState().auth.token;
    try {
      const respone = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${WEB_API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Firebase-Locale': 'vi',
          },
          body: JSON.stringify({
            requestType: 'VERIFY_EMAIL',
            idToken: token,
          }),
        },
      );
      const resData = await respone.json();
      if (!respone.ok) {
        throw new Error(resData.error.message);
      }
      // console.log('ResDAta ' + resData);
    } catch (err) {
      throw err;
    }
  };
};

export const authenticate = (isSignup, email, password) => {
  return async (dispatch) => {
    try {
      let userInfo;
      try {
        if (isSignup)
          userInfo = await auth().createUserWithEmailAndPassword(
            email,
            password,
          );
        else
          userInfo = await auth().signInWithEmailAndPassword(email, password);
      } catch (err) {
        throw err;
      }
      if (!userInfo) return;
      saveUserAndDispatchAuthenticate(dispatch, userInfo);
    } catch (err) {
      throw err;
    }
  };
};

const saveUserAndDispatchAuthenticate = (dispatch, userInfo) => {
  const user = {
    uid: userInfo.user.uid,
    name: userInfo.user.displayName,
    photoUrl: userInfo.user.photoURL,
    email: userInfo.user.email,
    phone: userInfo.user.phoneNumber,
  };

  helper.createUserIfNeccessary(user);
  dispatch({
    type: AUTHENTICATE,
    token: userInfo.user.providerId,
    userId: userInfo.user.uid,
    userName: userInfo.user.displayName,
    userEmail: userInfo.user.email,
    userPhone: userInfo.user.phone,
    userPhoto: userInfo.user.photoURL,
  });
};

export const googleLogin = () => async (dispatch) => {
  let userInfo;
  try {
    await GoogleSignin.hasPlayServices();
    // Get the users ID token
    const respone = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(
      respone.idToken,
    );

    // Sign-in the user with the credential
    userInfo = await auth().signInWithCredential(googleCredential);
    saveUserAndDispatchAuthenticate(dispatch, userInfo);
  } catch (err) {
    throw err;
  }
};

const googleLogOut = async () => {
  try {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (!isSignedIn) return;
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
  } catch (error) {
    console.error(error);
  }
};

export const logout = () => {
  return async (dispatch) => {
    try {
      await googleLogOut();
      await auth().signOut();
    } catch (err) {
      console.log(err.message);
    }
    dispatch({type: LOGOUT});
  };
};

export const signOut = () => {
  return async (dispatch) => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    } catch (error) {
      console.error(error);
    }
    dispatch(logout);
    removeUserData();
  };
};
