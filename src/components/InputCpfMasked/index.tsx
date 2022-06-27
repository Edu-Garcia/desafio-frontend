import classNames from 'classnames';
import React from 'react';
import InputMask from 'react-input-mask';
import onlyNumbers from '../../utils/onlyNumbers';

interface IInputCpfMasked {
  value: string;
  name: string;
  id: string;
  mask: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: boolean;
  isInvalid?: boolean;
  label?: string;
  disabled?: boolean;
}

const InputCpfMasked = ({
  value,
  name,
  id,
  mask,
  onChange,
  placeholder,
  isInvalid,
  className,
  label,
  disabled,
}: IInputCpfMasked): React.ReactElement => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    onChange({
      ...e,
      target: {
        ...e.target,
        id,
        name,
        value: onlyNumbers(e.target.value),
      },
    });
  };

  return label ? (
    <label htmlFor={id} className="w-100">
      {label}
      <InputMask
        mask={mask}
        value={value}
        name={name}
        id={id}
        placeholder={placeholder}
        onChange={handleChange}
        disabled={disabled}
        className={className ? classNames(`form-control ${isInvalid ? 'is-invalid' : ''}`) : ''}
      />
    </label>
  ) : (
    <InputMask
      mask={mask}
      value={value}
      name={name}
      id={id}
      placeholder={placeholder}
      onChange={handleChange}
      disabled={disabled}
      className={className ? classNames(`form-control ${isInvalid ? 'is-invalid' : ''}`) : ''}
    />
  );
};

export default InputCpfMasked;
