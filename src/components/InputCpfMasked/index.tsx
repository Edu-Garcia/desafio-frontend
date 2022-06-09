import classNames from "classnames";
import React from "react";
import InputMask from 'react-input-mask';
import onlyNumbers from '../../utils/onlyNumbers'

interface IInputCpfMasked {
  value: string;
  name: string;
  id: string;
  mask: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  isInvalid?: boolean;
}

const InputCpfMasked = ({ value, name, id, mask, onChange, placeholder, isInvalid, className }: IInputCpfMasked): React.ReactElement => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    onChange({
      ...e,
      target: {
        ...e.target,
        id,
        name,
        value: onlyNumbers(e.target.value)
      }
    })
  }

  return (
    <InputMask
      mask={mask}
      value={value}
      name={name}
      id={id}
      placeholder={placeholder}
      onChange={handleChange}
      className={classNames(`form-control ${isInvalid ? 'is-invalid' : ''} ${className}`)}
    />
  )
}

export default InputCpfMasked;
