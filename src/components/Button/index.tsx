import React from 'react';
import { Button, ButtonProps } from 'react-bootstrap';
import './styles.scss';

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement>, ButtonProps {
  cy: string;
  children?: React.ReactNode | React.ReactNode[];
}

const MyButton = ({ children, cy, ...props }: IButton): React.ReactElement => (
  <Button data-cy={cy} style={{ display: 'flex', gap: '0.5rem' }} {...props}>
    {children}
  </Button>
);

MyButton.defaultProps = { children: '' };

export default MyButton;
