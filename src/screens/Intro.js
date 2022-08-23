import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  StatusBar,
  Dimensions,
} from 'react-native';
import RoundIconBtn from '../components/RoundIconBtn';
import colors from '../misc/colors';
import { ImageBackground } from 'react-native';

const Intro = ({ onFinish }) => {
  const [name, setName] = useState('');
  const handleOnChangeText = text => setName(text);

  const handleSubmit = async () => {
    const user = { name: name };
    await AsyncStorage.setItem('user', JSON.stringify(user));
    if (onFinish) onFinish();
  };

  return (
    <>
      <ImageBackground
        source={require('../../assets/bg.jpg')}
        style={styles.container1}>
        <StatusBar hidden />
        <View style={styles.container}>
          <Text style={styles.inputTitle}>Enter Your Name to Continue</Text>
          <TextInput
            value={name}
            onChangeText={handleOnChangeText}
            placeholder='Enter Name'
            style={styles.textInput}
          />
          {name.trim().length >= 3 ? (
            <RoundIconBtn antIconName='forward' onPress={handleSubmit} />
          ) : null}
        </View>
      </ImageBackground>
    </>
  );
};

const width = Dimensions.get('window').width - 50;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container1:{
    flex:1
  },
  textInput: {
    borderWidth: 2,
    borderColor: colors.PRIMARY,
    color: 'black',
    width: 300,
    height: 50,
    borderRadius: 10,
    fontSize: 25,
    marginBottom: 15,
  },
  inputTitle: {
    marginBottom: 20,
    opacity: 0.8,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20
  },
});

export default Intro;
