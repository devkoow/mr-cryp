import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  onAuthStateChanged,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();

/** 구글 로그인 */
export async function loginGoogle() {
  return signInWithPopup(auth, provider).then((result) => {
    const user = result.user;
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const accessToken = credential.accessToken;
    localStorage.setItem('socialType', 'Google');
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('userId', user.uid);
    localStorage.setItem('nickname', user.displayName);
    localStorage.setItem('imgUrl', user.photoURL);
    console.log('구글 로그인');
    return user;
  });
}

/** 구글 로그아웃 */
export async function logoutGoogle() {
  try {
    await signOut(auth);
    localStorage.removeItem('socialType');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('nickname');
    localStorage.removeItem('imgUrl');
    console.log('구글 로그아웃');
  } catch (error) {
    console.error('구글 로그아웃 오류:', error);
  }
}

/** 유저 상태 관찰자 */
export function onUserStateChange(callback) {
  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
}
