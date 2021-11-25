import React from 'react';
import {TouchableOpacity, StyleSheet, View, Text, TextStyle} from 'react-native';
import {areDatesEqual, compareDatesBig, compareDatesLess} from '../helper';
import {DAY_SIZE} from '../constants';

interface IPropsDay {
  date: Date;
  isPressed: boolean;
  onPress: (date: Date) => void;
  pressedColor?: string;
  disable: boolean;
  dateDisable?: Date;
}

export const Day: React.FC<IPropsDay> = ({
  date,
  disable,
  isPressed,
  onPress,
  pressedColor,
  dateDisable,
}) => {
  const isToday = areDatesEqual(new Date(), date);
  const compareLess = compareDatesLess(date, new Date());
  const compareBig = dateDisable ? compareDatesBig(date, dateDisable) : false;
  let wrappedBackground = '#FFFFFF';
  if (isPressed) {
    wrappedBackground = pressedColor || '#00B0FF';
  } else if (isToday) {
    wrappedBackground = '#D3D3D3';
  }
  let textStyle: TextStyle = styles.todayText
  if(isPressed) {
    textStyle = styles.pressedText
  } else if (compareLess || compareBig) {
    textStyle = {
      color: '#AEAEAE',
      fontSize: 14,
    }
  }
  return (
    <TouchableOpacity
      disabled={disable || compareLess || compareBig}
      onPress={() => onPress(date)}
      style={[styles.container]}>
      {!disable && (
        <View style={[styles.wrapper, {backgroundColor: wrappedBackground}]}>
          <Text style={textStyle}>
            {date.getDate()}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: DAY_SIZE + 6,
    height: DAY_SIZE + 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disable: {
    backgroundColor: '#D3D3D3',
  },
  wrapper: {
    width: DAY_SIZE,
    height: DAY_SIZE,
    borderRadius: DAY_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  todayText: {
    color: '#000',
    fontSize: 14,
  },
  pressedText: {
    color: '#fff',
    fontSize: 16,
  },
});
