import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  .content {
    display: flex;
    flex-direction: column;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 10px;
  border-bottom: 1px solid #999;
  margin-bottom: 40px;
  font-size: 18px;
  h2 {
    font-weight: 500;
  }
  > div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .button {
    display: block;
    height: 100%;
    cursor: pointer;
    padding: 0;
    background: none;
    border: 0 none;
    svg {
      display: block;
      width: auto;
      height: 32px;
    }
    &:hover,
    &:active {
      opacity: 0.8;
    }
  }
  .right {
    .button svg {
      height: 24px;
    }
    .button:last-child {
      margin-left: 10px;
    }
  }
  input {
    border: 0 none;
    background: none;
    color: #813dff;
    cursor: pointer;
    &:hover,
    &:active {
      color: #6002ee;
    }
  }
`;

export const Content = styled.div`
  > div {
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    &:nth-child(n + 4) {
      border-top: 1px solid #ccc;
    }
  }
  .label,
  label {
    flex: 1 1 40px;
  }
  .text,
  input {
    flex: 4 1 40px;
    border: 0 none;
    &:focus {
      outline: none;
    }
  }

  .image {
    label {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    input {
      display: none;
    }
    .preview {
      width: 48px;
      height: 48px;
      svg,
      img {
        width: 100%;
        height: auto;
      }
    }
  }

  .title,
  .title input {
    font-size: 18px;
    font-weight: 500;
  }
  .date_picker {
    flex: 4 1 40px;
    .react-datepicker-wrapper {
      width: 100%;
    }
    .react-datepicker__input-container {
      display: flex;
      align-items: center;
      svg {
        padding: 0;
      }
    }
  }
  .review {
    flex-direction: column;
    align-items: flex-start;
    .text,
    textarea {
      width: 100%;
      resize: none;
    }
  }
`;
