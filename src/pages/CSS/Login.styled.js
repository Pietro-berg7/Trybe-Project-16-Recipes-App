import styled, { keyframes } from 'styled-components';

const transition = keyframes`
  from {
    top: 550px;
  }
  to {
    top: 317px;
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(30deg);
  }
  to {
    transform: rotate(0);
  }
`;

export const Header = styled.header`

  img {
    position: absolute;
    width: 450px;
    height: 450px;
    left: 135px;
    top: -200px;
    animation: ${rotate} 0.75s ease;
  }

  div {
    padding-top: 146px;
  }
  p {
    margin-left: 30px;
    color: white;
    font-size: 22px;
  }

  h1 {
    margin-left: 30px;
    color: white;
    font-size: 36px;
  }
`;

export const Main = styled.main`
  width: 100vw;
  height: 100vh;
  background-color: #282828;
  position: relative;
`;

export const Section = styled.section`
  top: 317px;
  background-color: #fff;
  width: 100%;
  height: 323px;
  position: absolute;
  /* bottom: 0; */
  border-radius: 15px 15px 0px 0px;
  animation: ${transition} 0.75s ease;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

export const LogoDiv = styled.div`
  p {
    padding-top: 44px;
    margin-left: 34px;
  }
  h1 {
    padding-bottom: 13px;
    margin-left: 34px;
    color: #2e9bff;
  }
`;

export const Input = styled.input`
  margin-top: 8px;
  width: 296px;
  height: 47px;
  border: 0px solid;
  padding-left: 15px;

  background: #f0f0f0;
  border-radius: 12px;

  &:focus {
    outline: none;
  }
`;

export const Button = styled.button`
  margin-top: 16px;
  width: 296px;
  height: 45px;
  color: white;
  border: none;

  background: #2e9bff;
  border-radius: 24px;

  &:hover:not(:disabled),
  &:active:not(:disabled),
  &:focus {
    background-color: #1d86e7;
    cursor: pointer;
  }

  &:disabled {
    opacity: 50%;
  }
`;

export default Main;
