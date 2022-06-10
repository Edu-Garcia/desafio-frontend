import React from 'react';
import Section from '../../components/Section';
import Text from '../../components/Text';

const Error: React.FunctionComponent = () => (
  <Section title="Página não encontrada" description="Página não encontrada">
    <Text as="h1" size="2rem" weight={700}>
      Página não encontrada
    </Text>
  </Section>
);

export default Error;
