/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text, Image} from 'react-native';
import {icons} from '../assets';

interface IPropsNavigator {
  onPressForward: () => void;
  onPressBack: () => void;
  currentDate: Date;
  monthsLocale: any;
  disableBack?: boolean;
  disableForward?: boolean;
}

export const Navigator: React.FC<IPropsNavigator> = ({
  currentDate,
  monthsLocale,
  disableBack,
  disableForward,
  onPressBack,
  onPressForward,
}) => {
  const listOfKeys = Object.keys(monthsLocale);
  const currentMonth = monthsLocale[listOfKeys[currentDate.getMonth()]];
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {currentMonth?.toUpperCase()} {currentDate.getFullYear()}
      </Text>
      <TouchableOpacity
        disabled={disableBack}
        onPress={onPressBack}
        style={[styles.button, {marginRight: 10}]}>
        <Image style={styles.image} source={icons.back} />
      </TouchableOpacity>
      <TouchableOpacity
        disabled={disableForward}
        onPress={onPressForward}
        style={styles.button}>
        <Image style={styles.image} source={icons.forward} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    marginHorizontal: 10,
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: 10,
    alignItems: 'center',
  },
  text: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 16,
    height: 16,
  },
});
