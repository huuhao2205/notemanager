import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import colors from '../misc/colors';

const SearchBar = ({ containerStyle, value, onClear, onChangeText }) => {
  return (
    <View style={[styles.container, { ...containerStyle }]}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={styles.searchBar}
        placeholder='Search here..'
      />
      {value ? (
        <FontAwesome
          name={'close'}
          size={25}
          color={colors.PRIMARY}
          onPress={onClear}
          style={styles.clearIcon}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    borderWidth: 0.5,
    borderColor: colors.PRIMARY,
    height: 45,
    borderRadius: 40,
    paddingLeft: 15,
    fontSize: 20,
  },
  container: {
    justifyContent: 'center',
  },
  clearIcon: {
    position: 'absolute',
    right: 10,
  },
});

export default SearchBar;
