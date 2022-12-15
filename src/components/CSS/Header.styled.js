import styled from 'styled-components';

export const HeaderStyle = styled.header`

`;

export const ProfileButton = styled.button`
    margin-left: 15px;
    margin-top: 15px;
    border: none;
    width: 45px;
    height: 45px;
    border-radius: 50%;

    img {
        width: 25px;
        height: 25px;
    }
`;

export const SeachButton = styled.input`
    margin-top: 38px;
    margin-bottom: 5px;
    margin-left: 32px;
    width: 296px;
    height: 31px;
    padding-left: 15px;

    background: #F0F0F0;
    border-radius: 12px;
    border: none;
    ::placeholder {
        opacity: 70%;
    }
`;

export const SearchOptions = styled.div`
    margin-left: 40px;
    label {
        font-size: 10px;
        margin-right: 15px;
    }

    input[type="radio"] {
        width: 10px;
        margin-right: 3px;
         position: relative;
        top: 3px!important;
}
`;

export const Button = styled.button`
  margin-top: 5px;
  margin-bottom: 35px;
  width: 71px;
  height: 23px;  
  color: white;
  border: none;
  font-size: 8px;
  margin-left: 30px;

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
