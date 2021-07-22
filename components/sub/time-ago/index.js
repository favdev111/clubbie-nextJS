import React from "react";
import TimeAgo from "javascript-time-ago";
import ReactTimeAgo from "react-time-ago";
import en from "javascript-time-ago/locale/en";
import ru from "javascript-time-ago/locale/ru";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

function _TimeAgo({ date }) {
  return <ReactTimeAgo date={date} locale={"en-US"}></ReactTimeAgo>; // TODO: update locale as required
}

export default _TimeAgo;
