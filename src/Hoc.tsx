import React from 'react';

type Props = { target: string };

const Hoc: React.FC<Props> = ({ target }) => <h1>Hello! {target}</h1>;

const withTarget = (WrappedComponent: React.FC<Props>) =>
  WrappedComponent({ target: 'Patty' });

export default withTarget(Hoc);
