"use client";

import { useState, useEffect, forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./BookingDatePicker.module.css";

interface BookingDateInputProps {
  value?: string;
  onClick?: () => void;
}

const BookingDateInput = forwardRef<HTMLInputElement, BookingDateInputProps>(
  ({ value, onClick }, ref) => (
    <input
      ref={ref}
      value={value}
      onClick={onClick}
      readOnly
      placeholder="Select booking date*"
      className={styles.bookingDateInput} 
    />
  )
);

BookingDateInput.displayName = "BookingDateInput";

interface BookingDatePickerProps {
  selectedDate?: Date | null; 
  onDateChange?: (date: Date | null) => void;
}

export function BookingDatePicker({ selectedDate, onDateChange }: BookingDatePickerProps) {
  const [startDate, setStartDate] = useState<Date | null>(selectedDate || null);

   useEffect(() => {
    setStartDate(selectedDate || null);
  }, [selectedDate]);

  const handleChange = (date: Date | null) => {
    setStartDate(date);
    onDateChange?.(date);
  };

  return (
    <DatePicker
      selected={startDate}
      onChange={handleChange}
      customInput={<BookingDateInput />}
      dateFormat="yyyy-MM-dd"
      minDate={new Date()}
      popperPlacement="bottom-start"
      calendarClassName={styles.bookingCalendar}
      portalId="booking-datepicker-portal"
    />
  );
}
