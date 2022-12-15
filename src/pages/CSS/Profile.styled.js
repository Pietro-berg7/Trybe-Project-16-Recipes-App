import styled from 'styled-components';

export const Main = styled.main`
  h1 {
    margin-left: 10px;
    margin-top: 15px;
    font-size: 16px;
    font-weight: 600;
  }

  p {
    margin-bottom: 20px;
    margin-left: 10px;
    font-size: 12px;
  }

  button {
    margin-left: 40px;
    margin-top: 16px;
    width: 296px;
    height: 45px;
    color: white;
    border: none;

    background: #2e9bff;
    border-radius: 12px;

    &:hover:not(:disabled),
    &:active:not(:disabled),
    &:focus {
      background-color: #1d86e7;
      cursor: pointer;
    }

    &:disabled {
      opacity: 50%;
    }

     &:nth-child(3) {
        width: 266px;
        height: 35px;
        margin-top: 150px;
        margin-left: 56px;
    }
  }
`;

export default Main;
