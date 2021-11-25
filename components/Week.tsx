import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Day} from './Day';
import {areDatesEqual} from '../helper';

interface IPropsWeek {
  dayOnPress: (date: Date) => void;
  dayColor?: string;
  currentDate: Date;
  week: Date[];
  startDate: Date;
  endDate: Date;
  dateDisable?: Date;
}

export const Week: React.FC<IPropsWeek> = ({
  currentDate,
  dayOnPress,
  endDate,
  startDate,
  week,
  dayColor,
  dateDisable,
}) => {
  return (
    <View style={styles.container}>
      {week.map((date, index) => (
        <Day
          key={index}
          onPress={dayOnPress}
          pressedColor={dayColor}
          date={date}
          isPressed={areDatesEqual(currentDate, date)}
          disable={date < startDate || date > endDate}
          dateDisable={dateDisable}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});
