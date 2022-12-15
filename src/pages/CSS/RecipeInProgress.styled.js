import styled from 'styled-components';

export const Main = styled.main`
  
`;

export const Img = styled.img`
  position: absolute;
  width: 100vw;
  height: 56.25vh;
  left: 0px;
  top: 0px;
  filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.4));
  border-radius: 15px;
`;

export const Content = styled.div`
  border-radius: 15px;
  position: absolute;
  width: 100vw;
  height: 56.25vh;
  left: 0px;
  top: 280px;
  background: #FFFFFF;
  box-shadow: 0px -2px 4px rgba(0, 0, 0, 0.25);

  > h1 {
    height: 5.47vh;
    margin-left: 5.83vw;
    margin-top: 4vh;

    font-weight: 700;
    font-size: 30px;
    line-height: 4.6875vh;

    color: #404040;
  }

  h2 {
    height: 4.0625vh;
    margin-left: 5.83vw;
    margin-top: 3vh;

    font-weight: 500;
    font-size: 26px;
    line-height: 3.75vh;

    color: #404040;
  }

  > h3 {
    height: 3.75vh;
    margin-left: 5.83vw;
    margin-top: 1vh;

    font-weight: 500;
    font-size: 18px;
    line-height: 3.28vh;

    color: #404040;
  }

  > h4 {
    height: 3.75vh;
    margin-left: 5.83vw;
    margin-top: -0.5vh;

    font-weight: 400;
    font-size: 14px;
    line-height: 3.28vh;

    color: #404040;
  }

  > p {
    margin: 3vh 5.83vw;
    margin-right: 5.83vw;

    text-align: justify;
  }

  p {
    font-size: 17px;
  }
`;

export const Button = styled.button`
  position: absolute;
  width: 28.89vw;
  height: 4.53125vh;
  left: 35.56vw;
  top: 92.65vh;
  background: #2E9BFF;
  border-radius: 24px;
  border: none;
  z-index: 1;

  > span {
    width: 18.05vw;
    height: 1.72vh;
    left: 42.2vw;
    top: 693.9vh;

    font-style: normal;
    font-weight: 500;
    font-size: 10px;
    line-height: 12px;

    color: #F9F9F9;
  }
`;

export const ButtonBack = styled.button`
  position: relative;
  left: 0;
  top: 0;
  width: 28.89vw;
  height: 4.53125vh;
  background: #2E9BFF;
  border-radius: 10px;
  border: none;
  z-index: 1;

  > span {
    width: 18.05vw;
    height: 1.72vh;
    left: 42.2vw;
    top: 693.9vh;

    font-style: normal;
    font-weight: 500;
    font-size: 10px;
    line-height: 12px;

    color: #F9F9F9;
  }
`;

export const Ingredients = styled.ul`
  padding-bottom: 10vh;
  margin-left: 5.83vw;
  list-style: none;
`;

export const Span = styled.span`
  margin-left: 5px;
`;

export const Share = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  left: 68.05vw;
  top: -3.125vh;

  background: #D9D9D9;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 50%;

  > p {
    width: max-content;
    margin-left: 2vw;
    margin-top: 2vh;
    font-size: 14px;
    font-weight: 500;
  }

  > button {
    border: none;
    background: none;
    margin: 5px;
  }

  > button img {
    width: 75%;
    margin: 15%;
  }
`;

export const Favorite = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  left: 83.3vw;
  top: -3.125vh;

  background: #D9D9D9;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 50%;

  > button {
    border: none;
    background: none;
    margin: 5px;
  }

  > button img {
    width: 75%;
    margin: 15%;
  }
`;
