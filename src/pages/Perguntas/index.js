import React, {useState} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Header from '../../components/Header';
import {Container} from './styles';

const initialState = {
  react: false,
  next: false,
  java: false,
  angular: false,
};

const Responder = () => {
  const [state, setState] = useState(initialState);
  const [toggleButton, setToggleButton] = useState(false);

  return (
    <Container>
      <Header/>
      <View style={styles.container}>
        <Text style={styles.textTitulo}>
          Selecione as atividades que você gostaria que fizesse parte do seu trabalho:
        </Text>

        <View style={styles.row}>
          <CheckBox
            tintColors={{false: '#f5f5f5', true: '#f5f5f5'}}
            disabled={false}
            value={state.react}
            onValueChange={value => setState({...state, react: value})}
          />
          <Text style={styles.text}>Gerenciar Pessoas</Text>
        </View>

        <View style={styles.row}>
          <CheckBox
            tintColors={{false: '#f5f5f5', true: '#f5f5f5'}}
            disabled={false}
            value={state.next}
            onValueChange={value => setState({...state, next: value})}
          />
          <Text style={styles.text}>Empreender</Text>
        </View>

        <View style={styles.row}>
          <CheckBox
            tintColors={{false: '#f5f5f5', true: '#f5f5f5'}}
            disabled={false}
            value={state.java}
            onValueChange={value => setState({...state, java: value})}
          />
          <Text style={styles.text}>Atividade no campo</Text>
        </View>

        <View style={styles.row}>
          <CheckBox
            tintColors={{false: '#f5f5f5', true: '#f5f5f5'}}
            disabled={false}
            value={state.angular}
            onValueChange={value => setState({...state, angular: value})}
          />
          <Text style={styles.text}>Coisas que envolvam a natureza</Text>
        </View>

        <View style={styles.btn}>
          <Button
            title="Save"
            onPress={() => setToggleButton(toggleButton => !toggleButton)}
          />
          {toggleButton > 0 && (
            <View style={styles.resultContainer}>
              {Object.entries(state).map(([key, value]) => {
                return (
                  value && (
                    <View key={key} style={{paddingHorizontal: 5}}>
                      <Text style={styles.text}>{key}</Text>
                    </View>
                  )
                );
              })}
            </View>
          )}
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
    color:'#f5f5f5',
  },
  btn: {
    top: 50,
    width: '50%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  resultContainer: {
    flexDirection: 'row',
    padding: 10,
  },
});

export default Responder;
