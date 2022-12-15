import styled from 'styled-components';

export const Card = styled.button`
  width: 140px;
  height: 140px;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 55px;
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

export const Div = styled.div`
  word-break: break-all;
  white-space: normal;
  text-align: center;

  h3 {
    font-size: 12px;
    transform: translateY(-5px);
    width: 140px;
    height: 20px;
    margin-left: 5px;
  }
`;

export default Card;
