import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  .content {
    display: flex;
    flex-direction: column;
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
  .review {
    flex-direction: column;
    align-items: flex-start;
    .text,
    textarea {
      width: 100%;
      resize: none;
    }
  }

  /* date_picker 스타일 */
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
    .react-datepicker {
      border: 1px solid #ccc;
      border-radius: 0.8rem;
      overflow: hidden;
      box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    }
    .react-datepicker__navigation-icon::before,
    .react-datepicker__year-read-view--down-arrow,
    .react-datepicker__month-read-view--down-arrow,
    .react-datepicker__month-year-read-view--down-arrow {
      border-width: 2px 2px 0 0;
    }
    .react-datepicker__triangle {
      display: none;
    }
    .react-datepicker__header {
      background-color: #fff;
      border-bottom: 1px solid #ccc;
    }
    .react-datepicker__time-container {
      border-left: 1px solid #ccc;
    }
    .react-datepicker__time-container
      .react-datepicker__time
      .react-datepicker__time-box
      ul.react-datepicker__time-list
      li.react-datepicker__time-list-item--selected,
    .react-datepicker__day--selected,
    .react-datepicker__day--in-selecting-range,
    .react-datepicker__day--in-range,
    .react-datepicker__month-text--selected,
    .react-datepicker__month-text--in-selecting-range,
    .react-datepicker__month-text--in-range,
    .react-datepicker__quarter-text--selected,
    .react-datepicker__quarter-text--in-selecting-range,
    .react-datepicker__quarter-text--in-range,
    .react-datepicker__year-text--selected,
    .react-datepicker__year-text--in-selecting-range,
    .react-datepicker__year-text--in-range {
      background-color: #813dff;
    }
  }
`;
