import React from 'react';
import { DatePicker, DatePickerProps } from '@admin-bro/design-system';

export default function () {
  return <DatePicker onChange={(date) => console.log(date)} />;
}
