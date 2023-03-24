import React, {useContext, useState, useEffect} from 'react';
import {AuthContext} from '../../contexts/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {launchImageLibrary} from 'react-native-image-picker';
import {Modal, Platform, Alert} from 'react-native';
import {
  Container,
  UploadButton,
  UploadText,
  Avatar,
  Name,
  Email,
  Escola,
  Cidade,
  MatriculaCod,
  Button,
  ButtonText,
  ModalContainer,
  ButtonBack,
  Input,
} from './styles';
import Header from '../../components/Header';
import Feather from 'react-native-vector-icons/Feather';

const Perfil = () => {
  const {signOut, user, storageUser, setUser} = useContext(AuthContext);
  const [nome, setNome] = useState(user?.nome);
  const [cidade, setCidade] = useState(user?.cidade);
  const [escola, setEscola] = useState(user?.escola);
  const [matriculaCod, setMatriculaCod] = useState(user?.matriculaCod);
  const [url, setUrl] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        let response = await storage()
          .ref('users')
          .child(user?.uid)
          .getDownloadURL();

        setUrl(response);
      } catch (err) {
        Alert.alert('Complete seu Perfil e coloque uma foto.');
      }
    }

    load();
  }, []);

  //Atualizar perfil
  async function updateProfile() {
    if (nome === '') {
      return;
    }
    await firestore().collection('users').doc(user.uid).update({
      nome: nome,
      cidade: cidade,
      escola: escola,
      matriculaCod: matriculaCod,
    });

    let data = {
      uid: user.uid,
      nome: nome,
      cidade: cidade,
      escola: escola,
      matriculaCod: matriculaCod,
      email: user.email,
    };

    setUser(data);
    storageUser(data);
    setOpen(false);
  }

  const uploadFile = () => {
    const options = {
      noData: true,
      mediaType: 'photo',
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('CANCELOU O MODAL.');
      } else if (response.error) {
        console.log('Parece que deu algum erro: ' + response.errorMessage);
      } else {
        uploadFileFirebase(response).then(() => {
          uploadAvatar();
        });
        setUrl(response.assets[0].uri);
      }
    });
  };

  function getFileLocalPath(response) {
    return response.assets[0].uri;
  }

  const uploadFileFirebase = async response => {
    const fileSource = getFileLocalPath(response);
    const storageRef = storage().ref('users').child(user?.uid);
    return await storageRef.putFile(fileSource);
  };
  async function uploadAvatar() {
    const storageRef = storage().ref('users').child(user?.uid);
    const url = await storageRef
      .getDownloadURL()
      .then(async image => {
        //Atualizar avatarUrl
        const postDocs = await firestore()
          .collection('posts')
          .where('userId', '==', user.uid)
          .get();

        postDocs.forEach(async doc => {
          await firestore().collection('posts').doc(doc.id).update({
            avatarUrl: image,
          });
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <Container>
      <Header />

      {url ? (
        <UploadButton onPress={uploadFile}>
          <UploadText>+</UploadText>
          <Avatar source={{uri: url}} />
        </UploadButton>
      ) : (
        <UploadButton onPress={uploadFile}>
          <UploadText>+</UploadText>
        </UploadButton>
      )}

      <Name numberOfLines={1}>{user.nome}</Name>
      <Email numberOfLines={1}>{user.email}</Email>
      <Escola numberOfLines={1}>{user.escola}</Escola>
      <MatriculaCod numberOfLines={1}>{user.matriculaCod}</MatriculaCod>
      <Cidade numberOfLines={1}>{user.cidade}</Cidade>

      <Button bg="#428cfd" onPress={() => setOpen(true)}>
        <ButtonText color="#FFF">Atualizar perfil</ButtonText>
      </Button>

      <Button bg="#f1f1f1" onPress={() => signOut()}>
        <ButtonText color="#3b3b3b">Sair</ButtonText>
      </Button>

      <Modal visible={open} animationType="slide" transparent={true}>
        <ModalContainer behavior={Platform.OS === 'android' ? '' : 'padding'}>
          <ButtonBack onPress={() => setOpen(false)}>
            <Feather name="arrow-left" size={22} color="#121212" />
            <ButtonText color="#121212">Voltar</ButtonText>
          </ButtonBack>
          <Input
            placeholder={user?.nome}
            value={nome}
            onChangeText={text => setNome(text)}
          />
          <Input
            placeholder={'Escola'}
            value={escola}
            onChangeText={text => setEscola(text)}
          />
          <Input
            placeholder={'Matrícula ou Código Escolar'}
            value={matriculaCod}
            onChangeText={text => setMatriculaCod(text)}
          />
          <Input
            placeholder={'Cidade'}
            value={cidade}
            onChangeText={text => setCidade(text)}
          />
          <Button bg="#428cfd" onPress={updateProfile}>
            <ButtonText color="#f1f1f1">Atualizar</ButtonText>
          </Button>
        </ModalContainer>
      </Modal>
    </Container>
  );
};
export default Perfil;
