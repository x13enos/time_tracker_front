import { DateTime } from 'luxon'

class BlockedDaysSearcher {

  constructor(removedPeriod, currentDates) {
    this.currentDates = currentDates;
    this.startDate = DateTime.fromObject(convertStringToDateData(removedPeriod.from))
    this.endDate = DateTime.fromObject(convertStringToDateData(removedPeriod.to))
  }

  perform() {
    const removedPeriodDays = convertPeriodIntoDates(this.startDate, this.endDate)
    return removedPeriodDays.filter(day => this.currentDates.includes(day))
  }
}

function convertPeriodIntoDates(startDate, endDate) {
  const numberOfDays = numberOfDaysInPeriod(startDate, endDate);
  const dates = [];
  return [...Array(numberOfDays).keys()].map((day) => {
    return startDate.plus({ days: day }).toFormat('dd/LL/yyyy')
  })
  return dates;
}

function convertStringToDateData(val) {
  const data = val.split("/");
  return { day: data[0], month: data[1], year: data[2] };
}

function numberOfDaysInPeriod(startDate, endDate) {
  return ((endDate - startDate) / (3600 * 24 * 1000)) + 1
}

export default BlockedDaysSearcher;
