import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: ${props => props.theme.bgColor};
`;

const H1 = styled.h1`
  color: ${props => props.theme.textColor};
`;

function App() {
  const [value, setValue] = useState('');
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    // setValue(event.currentTarget.value);
    const {
      currentTarget: { value },
    } = event;
    setValue(value);
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Hello', value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={value}
          onChange={onChange}
          type="text"
          placeholder="username"
        />
        <button>Log In</button>
      </form>
      <Container>
        <H1>Hello</H1>
      </Container>
    </div>
  );
}

export default App;
