import styled from "styled-components";

export const Wrapper = styled.div`
  max-width: 400px;
  width: 100%;
  height: 100%;
  padding: 20px;
  margin: auto;
  .title {
    margin-bottom: 80px;
    text-align: center;
    h1 {
      font-size: 48px;
    }
  }
  h2 {
    font-size: 32px;
    font-weight: 500;
    text-align: center;
    margin-bottom: 40px;
  }
`;

export const ErrorMessage = styled.p`
  padding: 10px;
  background-color: #ffc6d0e6;
  color: #8e1529;
  font-size: 14px;
  margin-bottom: 20px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;

  label {
    display: block;
    font-weight: 500;
    margin-bottom: 5px;
  }

  input {
    padding: 10px;
    width: 100%;
    border-radius: 8px;
    border: 1px solid #999;

    &:focus {
      outline: 1px solid #5157da;
    }

    &.submit_button {
      cursor: pointer;
      color: #fff;
      background-color: #5d6de5;
      border: 0 none;
      padding: 14px;
      border-radius: 8px;
      margin-top: 40px;

      &:hover,
      :active {
        background-color: #5157da;
      }
    }
  }
`;

export const Collumn = styled.div`
  &:nth-child(n + 2) {
    margin-top: 20px;
  }
`;

export const LinkWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 15px;
`;
