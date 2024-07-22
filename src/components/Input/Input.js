import React from 'react';
import {View, TextInput, Text} from 'react-native';

import Styles from './Input.style';

const Input = ({placeholder, value, onType, isSecure}) => {
  return (
    <View style={Styles.container}>
      <TextInput
        autoCapitalize="none"
        style={Styles.input}
        value={value}
        placeholder={placeholder}
        placeholderTextColor="black"
        onChangeText={onType}
        secureTextEntry={isSecure}
      />
    </View>
  );
};

export default Input;