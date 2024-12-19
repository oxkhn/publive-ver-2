import clsx from "clsx";
import { ConfigProvider, DatePicker, theme } from "antd";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useState } from "react";
dayjs.extend(utc);

import "./style.css";

interface DatePickupProps {
  time?: any;
  handleDateChange?: any;
}

const DatePickup: React.FC<DatePickupProps> = (props) => {
  const { time, handleDateChange } = props;

  return (
    <ConfigProvider>
      <DatePicker
        className="h-full w-full"
        value={time}
        format="YYYY-MM-DD"
        onChange={handleDateChange}
      />
    </ConfigProvider>
  );
};

export default DatePickup;
