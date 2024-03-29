import React from 'react';
import { Accordion, AccordionProps } from 'react-bootstrap';
import './styles.scss';

interface IAccordion extends AccordionProps {
  title: string;
  defaultActive?: string;
  active?: string;
  className?: string;
  children: React.ReactNode;
}

const DataAccordion = ({
  title,
  children,
  defaultActive = '0',
  active = '0',
  className,
}: IAccordion): React.ReactElement => (
  <Accordion className="dataAccordion" defaultActiveKey={defaultActive}>
    <Accordion.Item eventKey={active}>
      <Accordion.Header>{title}</Accordion.Header>
      <Accordion.Body className={className}>{children}</Accordion.Body>
    </Accordion.Item>
  </Accordion>
);

export default DataAccordion;
