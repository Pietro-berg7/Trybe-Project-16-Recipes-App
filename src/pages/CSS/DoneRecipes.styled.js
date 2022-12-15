import styled from 'styled-components';

export const Div = styled.div`
    margin-left: 15px;
    margin-top: 10px;
`;

export const Card = styled.button`
margin-top: 50px;
  width: 140px;
  height: 140px;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 5px;
  background-color: #f0f0f0;
  border: none;
  border-radius: 20px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);

  word-break: break-all;
  white-space: normal;
  text-align: center;

  h3 {
    font-size: 12px;
    transform: translateY(-10px);
    width: 140px;
    height: 20px;
    font-weight: 400;
    /* margin-left: 5px; */
  }

  img {
    width: 115px;
    height: 115px;
    border-radius: 15px;
    transform: translateY(-30px);
  }
`;

export const Section = styled.section`
    margin-left: 20px;
    margin-bottom: 20px;
    p {
        font-size: 12px;
    }

    button {
        padding: 8px;
        border-radius: 6px;
        border: none;
    }
`;

export default Card;
