import React from 'react';
import {View, StyleSheet} from 'react-native';
import {determineStartAndEndOfTheMonth, determineWeeks} from './helper';
import {Week, DaysTab, Navigator} from './components';
import {DAY_SIZE} from './constants';
import {strings} from './locales';

interface IPropsDatePicker {
  locale?: string;
  color?: string;
  onSelect?: (date: Date) => void;
  onForward?: (date: Date) => void;
  onBack?: (date: Date) => void;
  style?: any;
  initialDate?: Date;
  language?: any;
  disableBack?: boolean;
  disableForward?: boolean;
  dateDisable?: Date;
}

export class DatePicker extends React.Component<IPropsDatePicker> {
  state = {
    currentDate: this.props.initialDate
      ? new Date(this.props.initialDate)
      : new Date(),
    selectedDate: this.props.initialDate
      ? new Date(this.props.initialDate)
      : new Date(),
    weeks: [],
    start: new Date(),
    end: new Date(),
    days: [],
    months: [],
  };

  componentDidMount() {
    this.determineLocales();
    this.configure();
  }

  determineLocales() {
    const {locale, language} = this.props;
    if (language) {
      this.setState({days: language.DAYS, months: language.MONTHS});
      return;
    }
    let localeStrings;
    switch (locale) {
      case 'vi':
        localeStrings = strings.vi;
        break;
      case 'en':
        localeStrings = strings.en;
        break;
      default:
        localeStrings = strings.en;
    }
    this.setState({days: localeStrings.DAYS, months: localeStrings.MONTHS});
  }

  configure() {
    const {currentDate} = this.state;
    const {start, end} = determineStartAndEndOfTheMonth(currentDate);
    const weeks = determineWeeks(start, end);
    this.setState({weeks, start, end});
  }

  select = (date: Date) => {
    const {onSelect} = this.props;
    if (onSelect) {
      onSelect(date);
    }
    this.setState({selectedDate: date});
  };

  onPressForward = () => {
    const {currentDate} = this.state;
    const {onForward} = this.props;
    currentDate.setMonth(currentDate.getMonth() + 1);
    if (onForward) {
      onForward(currentDate);
    }
    this.setState({currentDate});
    setTimeout(() => this.configure(), 100);
  };

  onPressBack = () => {
    const {currentDate} = this.state;
    const {onBack} = this.props;
    currentDate.setMonth(currentDate.getMonth() - 1);
    if (onBack) {
      onBack(currentDate);
    }
    this.setState({currentDate});
    setTimeout(() => this.configure(), 50);
  };

  render() {
    const {weeks, selectedDate, start, end, days, months, currentDate} =
      this.state;
    const {color, disableBack, disableForward, dateDisable} = this.props;
    return (
      <View style={styles.container}>
        <Navigator
          onPressForward={this.onPressForward}
          onPressBack={this.onPressBack}
          monthsLocale={months}
          currentDate={currentDate}
          disableBack={disableBack}
          disableForward={disableForward}
        />
        <DaysTab days={days} />
        {weeks.map((week, index) => (
          <Week
            dayOnPress={this.select}
            currentDate={selectedDate}
            week={week}
            key={index}
            startDate={start}
            endDate={end}
            dayColor={color}
            dateDisable={dateDisable}
          />
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: '#fff',
    alignItems: 'center',
    width: 7 * (DAY_SIZE + 6) + 20,
    borderRadius: 10,
  },
});
