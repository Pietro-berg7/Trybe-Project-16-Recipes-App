import styled from 'styled-components';

export const Section = styled.section`
  width: 100vw;
  height: 48px;
  box-shadow: 0px -2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px 15px 0px 0px;

  button {
    width: 50vw;
    background-color: transparent;
    border: none;
    img {
        margin-top: 10px;
        width: 30px;
        height: 30px;
    }
     &:nth-child(1) {
        opacity: 50%;
    }
     &:nth-child(2) {
        opacity: 70%;
    }
  }
`;

export default Section;
