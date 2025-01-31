import styled from "styled-components";
import CloseIcon from "../../assets/icons/CloseIcon";

const Wrapper = styled.div``;
const Background = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;
const Body = styled.div`
  width: 60%;
  min-width: 300px;
  background-color: #fff;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 20px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  h2 {
    font-size: 18px;
    font-weight: 500;
  }
  button {
    cursor: pointer;
    width: 20px;
    background: none;
    border: 0 none;
    padding: 0;
    &:hover {
      opacity: 0.8;
    }
  }
`;
const Content = styled.div`
  margin-top: 20px;
`;

const Modal = ({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  return (
    <Wrapper>
      <Background onClick={onClose}></Background>
      <Body>
        <Header>
          <h2>{title}</h2>
          <button onClick={onClose}>
            <CloseIcon fill="#999" />
          </button>
        </Header>
        <Content>{children}</Content>
      </Body>
    </Wrapper>
  );
};

export default Modal;
