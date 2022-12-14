import styled from 'styled-components';

export const Container = styled.footer`
  bottom: 0;
  position: fixed;
  width: 100vw;
  height: 7.5vh;
  background: #FFFFFF;
  box-shadow: 0px -2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px 15px 0px 0px;
`;

export const Button = styled.button`
  width: 50vw;
  border: none;

  > img {
    width: 5vh;
    margin-top: 1vh;
  }
`;
