import React, {useState, useContext} from 'react';
import {ActivityIndicator, Alert, Image} from 'react-native';
import {AuthContext} from '../../contexts/auth';
import {
  Container,
  Input,
  Button,
  ButtonText,
  SignUpButton,
  SignUpText,
} from './styles';

export default function Login() {
  const {signIn, signUp, loadingAuth} = useContext(AuthContext);

  const [login, setLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function toggleLogin() {
    setLogin(!login);
    setName('');
    setEmail('');
    setPassword('');
  }

  function handleLogin() {
    if (email === '' || password === '') {
      Alert.alert('Preencha todos os campos!');
      return;
    }

    signIn(email, password);
  }

  function handleSignUp() {
    if (name === '' || email === '' || password === '') {
      Alert.alert('Preencha todos os campos!');
      return;
    }

    //Cadastrando usuario!
    signUp(email, password, name);
  }

  if (login) {
    return (
      <Container>
        <Image source={require('../../assets/logo.png')} />

        <Input
          placeholder="email@email.com"
          underlineColorAndroid="transparent"
          value={email}
          onChangeText={text => setEmail(text)}
        />

        <Input
          placeholder="******"
          secureTextEntry={true}
          value={password}
          onChangeText={text => setPassword(text)}
        />

        <Button onPress={handleLogin}>
          {loadingAuth ? (
            <ActivityIndicator size={20} color="#FFF" />
          ) : (
            <ButtonText>Acessar</ButtonText>
          )}
        </Button>

        <SignUpButton onPress={() => toggleLogin()}>
          <SignUpText>Criar uma conta</SignUpText>
        </SignUpButton>
      </Container>
    )
  }

  return (
    <Container>
      <Image source={require('../../assets/logo.png')} />

      <Input
        placeholder="Nome"
        value={name}
        onChangeText={text => setName(text)}
      />

      <Input
        placeholder="email@email.com"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <Input
        placeholder="Senha (6 digitos)"
        secureTextEntry={true}
        value={password}
        onChangeText={text => setPassword(text)}
      />

      <Button onPress={handleSignUp}>
        {loadingAuth ? (
          <ActivityIndicator size={20} color="#FFF" />
        ) : (
          <ButtonText>Cadastrar</ButtonText>
        )}
      </Button>

      <SignUpButton onPress={() => toggleLogin()}>
        <SignUpText>Já tenho uma conta.</SignUpText>
      </SignUpButton>
    </Container>
  );
}