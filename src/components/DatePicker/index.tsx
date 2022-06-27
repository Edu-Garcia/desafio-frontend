import React from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker as BasicDatePicker } from '@mui/x-date-pickers/DatePicker';
import { FormikErrors } from 'formik';
import classNames from 'classnames';
import { TextField } from '@mui/material';
import Text from '../Text';

interface IDatePicker {
  isInvalid?: boolean;
  msg?: FormikErrors<Date>;
  className?: string;
  label?: string;
  id: string;
  name: string;
  fieldValue: Date | null;
  setFieldValue: (field: string, value: Date | null) => void;
  errors?: string;
  touched?: boolean;
  disabled?: boolean;
}

const DatePicker = ({
  isInvalid,
  msg,
  className,
  label,
  id,
  name,
  fieldValue,
  setFieldValue,
  errors,
  touched,
  disabled,
}: IDatePicker): React.ReactElement => {
  const currentDate = new Date();
  const maxDate = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate());
  const minDate = new Date(currentDate.getFullYear() - 200, currentDate.getMonth(), currentDate.getDate());

  return (
    <label htmlFor={id} className="w-100">
      {label}
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <BasicDatePicker
          onChange={(value) => setFieldValue(name, value)}
          value={fieldValue}
          onOpen={() => setFieldValue(name, maxDate)}
          maxDate={maxDate}
          minDate={minDate}
          disabled={disabled}
          inputFormat="dd/MM/yyyy"
          renderInput={(params) => (
            <TextField
              error={Boolean(touched && errors)}
              label={name}
              name={name}
              margin="none"
              variant="outlined"
              className={classNames(`form-control ${isInvalid ? 'is-invalid' : ''} ${className}`)}
              {...params}
            />
          )}
        />
      </LocalizationProvider>
      {isInvalid ? (
        <Text as="span" color="var(--red-500)" weight={500}>
          {msg}
        </Text>
      ) : null}
    </label>
  );
};

DatePicker.defaultProps = { isInvalid: false, msg: '', className: '', label: '' };

export default DatePicker;
