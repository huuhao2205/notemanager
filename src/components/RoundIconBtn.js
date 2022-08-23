import React from 'react';
import { View, StyleSheet } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import colors from '../misc/colors';


const RoundIconBtn = ({ antIconName, size, color, style, onPress }) => {
  return (
    <FontAwesome5
      name={antIconName}
      size={size || 24}
      color={color || colors.LIGHT}
      style={[styles.icon, { ...style }]}
      onPress={onPress}
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    backgroundColor: colors.PRIMARY,
    padding: 15,
    borderRadius: 50,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
});

export default RoundIconBtn;
