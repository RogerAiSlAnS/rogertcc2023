import React, {useState, createContext, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({});

function AuthProvider({children}) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingAuth, setLoadingAuth] = useState(false);

  useEffect(() => {
    async function loadStorage() {
      const storageUser = await AsyncStorage.getItem('TccRoger');

      if (storageUser) {
        setUser(JSON.parse(storageUser));
        setLoading(false);
      }
      setLoading(false);
    }
    loadStorage();
  }, []);

  async function signIn(email, password) {
    setLoadingAuth(true);

    await auth()
      .signInWithEmailAndPassword(email, password)
      .then(async value => {
        let uid = value.user.uid;
        const userPerfil = await firestore().collection('users').doc(uid).get();

        console.log(userPerfil.data().nome);

        let data = {
          uid: uid,
          nome: userPerfil.data().nome,
          email: value.user.email,
          cidade: userPerfil.data().cidade,
          matriculaCod: userPerfil.data().matriculaCod,
          escola: userPerfil.data().escola,
        };

        setUser(data);
        storageUser(data);
        setLoadingAuth(false);
      })
      .catch(error => {
        console.log(error);
        setLoadingAuth(false);
      });
  }

  async function signUp(email, password, name, cidade, escola, matriculaCod) {
    setLoadingAuth(true);

    await auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async value => {
        let uid = value.user.uid;
        await firestore()
          .collection('users')
          .doc(uid)
          .set({
            nome: name,
          })
          .then(() => {
            let data = {
              uid: uid,
              nome: name,
              email: value.user.email,
              cidade: value.user.cidade,
              escola: value.user.escola,
              matriculaCod: value.user.matriculaCod,
            };

            setUser(data);
            storageUser(data);
            setLoadingAuth(false);

            // chama a função signIn após o cadastro ter sido concluído com sucesso
            signIn(email, password);
          });
      })
      .catch(error => {
        console.log(error);
        setLoadingAuth(false);
      });
  }

  async function signOut() {
    await auth().signOut();
    await AsyncStorage.clear().then(() => {
      setUser(null);
    });
  }

  async function storageUser(data) {
    await AsyncStorage.setItem('TccRoger', JSON.stringify(data));
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        signUp,
        signIn,
        signOut,
        loadingAuth,
        loading,
        storageUser,
        setUser,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
