import React from 'react';
import classNames from 'classnames';
import { Field, FormikErrors } from 'formik';
import Text from '../Text';
import InputCpfMasked from '../InputCpfMasked';

interface IInput {
  cy: string;
  isInvalid?: boolean;
  msg?: string | FormikErrors<Date>;
  className?: string;
  label?: string;
  id: string;
  name: string;
  as?: string;
  placeholder?: string;
  children?: React.ReactNode;
  mask?: string;
}

interface IFieldForm {
  value: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
  cy,
  isInvalid,
  msg,
  className,
  label,
  id,
  name,
  as,
  placeholder,
  children,
  mask,
}: IInput): React.ReactElement => (
  <label htmlFor={id} className="w-100">
    {label}
    <Field
      cy={cy}
      id={id}
      as={as}
      name={name}
      type={name === 'password' ? 'password' : 'text'}
      placeholder={placeholder}
      className={classNames(`form-control ${isInvalid ? 'is-invalid' : ''} ${className}`)}
    >
      {mask
        ? ({ field }: { field: IFieldForm }) => (
            <InputCpfMasked
              {...field}
              id={id}
              mask={mask}
              placeholder={placeholder}
              isInvalid={isInvalid}
              className={classNames(`form-control ${isInvalid ? 'is-invalid' : ''} ${className}`)}
            />
          )
        : children}
    </Field>
    {isInvalid ? (
      <Text as="span" color="var(--red-500)" weight={500}>
        {msg}
      </Text>
    ) : null}
  </label>
);

Input.defaultProps = { isInvalid: false, msg: '', className: '', label: '', placeholder: '' };

export default Input;
