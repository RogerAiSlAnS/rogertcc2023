import React, {useState} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Header from '../../components/Header';
import {Container} from './styles';

const initialState = {
  resp1: false,
  resp2: false,
  resp3: false,
  resp4: false,
};

const Responder = () => {
  const [state, setState] = useState(initialState);
  return (
    <Container>
      <Header />
      <View style={styles.container}>
        <Text style={styles.textTitulo}>
          Selecione as atividades que você gostaria que fizesse parte do seu
          trabalho:
        </Text>

        <View style={styles.row}>
          <CheckBox
            tintColors={{false: '#f5f5f5', true: '#f5f5f5'}}
            disabled={false}
            value={state.resp1}
            onValueChange={value => setState({...state, resp1: value})}
          />
          <Text style={styles.text}>Gerenciar Pessoas</Text>
        </View>

        <View style={styles.row}>
          <CheckBox
            tintColors={{false: '#f5f5f5', true: '#f5f5f5'}}
            disabled={false}
            value={state.resp2}
            onValueChange={value => setState({...state, resp2: value})}
          />
          <Text style={styles.text}>Empreender</Text>
        </View>

        <View style={styles.row}>
          <CheckBox
            tintColors={{false: '#f5f5f5', true: '#f5f5f5'}}
            disabled={false}
            value={state.resp3}
            onValueChange={value => setState({...state, resp3: value})}
          />
          <Text style={styles.text}>Atividade no campo</Text>
        </View>

        <View style={styles.row}>
          <CheckBox
            tintColors={{false: '#f5f5f5', true: '#f5f5f5'}}
            disabled={false}
            value={state.resp4}
            onValueChange={value => setState({...state, resp4: value})}
          />
          <Text style={styles.text}>Coisas que envolvam a natureza</Text>
        </View>

        <View style={styles.btn}>
          <Button title="Próximo" />
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 6,
    top: 2,
  },
  row: {
    top: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textTitulo: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#f5f5f5',
  },
  text: {
    fontSize: 15,
    color: '#f5f5f5',
  },
  btn: {
    top: 50,
    width: '50%',
    alignSelf: 'center',
    alignItems: 'center',
    colorButton: '#f5f5f5',
  },
  resultContainer: {
    flexDirection: 'row',
    padding: 10,
  },
});

export default Responder;
