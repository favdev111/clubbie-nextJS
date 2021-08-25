const moment = require("moment");
const recurringTypes = require("@utils/fixedValues/recurringTypes");

/**
 * Return {x = totalEvents} recurring dates calculated from startdate
 * @param {Date} startDate
 * @param {Number} totalEvents
 * @param {String} onEvery
 * @returns {Array}
 */
const getRecurringDates = (startDate, totalEvents, onEvery) => {
  const firstEventStartDate = moment(startDate);
  const eventDates = [firstEventStartDate.toISOString()];
  const recurOn = onEvery === recurringTypes.FORTNIGHT ? "weeks" : onEvery;

  for (let eventNum = 1; eventNum < totalEvents; eventNum += 1) {
    const nextDate = moment(firstEventStartDate).add(
      onEvery === recurringTypes.FORTNIGHT ? eventNum + eventNum : eventNum,
      recurOn
    );
    eventDates.push(nextDate.toISOString());
  }

  return eventDates;
};

module.exports = { getRecurringDates };
