import styled, { keyframes } from 'styled-components';

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: ${props => props.theme.backgroundColor};
  color: ${props => props.theme.textColor};
`;

const rotate = keyframes`
  0%{
    transform: rotate(0deg);
    border-radius: 0px;
  }
  50%{
    border-radius: 100px;
  }
  100%{
    transform: rotate(360deg);
    border-radius: 0px;
  }
`;

const Emoji = styled.span`
  font-size: 36px;
`;

const Box = styled.div`
  background-color: teal;
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${rotate} 1s linear infinite;
  ${Emoji}:hover {
    font-size: 48px;
  }
`;

const Input = styled.input.attrs({ required: true, maxLength: 10 })`
  background-color: teal;
`;

function App() {
  return (
    <Wrapper>
      <h1>Hello</h1>
      <Box>
        <Emoji>📜</Emoji>
      </Box>
      <Emoji>💰</Emoji>
      <Input />
      <Input />
      <Input />
      <Input />
    </Wrapper>
  );
}

export default App;
