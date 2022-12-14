import styled from 'styled-components';

export const Container = styled.div`
  margin: 2vh 5.83vw;

  > div {
    margin: 0 5px;
    width: 30vw;
    height: 21vh;
    border: 1px solid #404040;
    border-radius: 15px;
    padding: 0;
  }
  `;

export const Card = styled.div`
  display: flex;
  flex-direction: column-reverse;
  width: 100%;
  
  > img {
    position: absolute;
    border-radius: 15px;
    top: 0;
    width: 100%;
  }

  > p {
    position: absolute;
    top: 16.5vh;
    left: 3vw;
    font-weight: 500;
  }
`;
