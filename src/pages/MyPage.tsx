import styled from "styled-components";
import ProfileIcon from "../assets/icons/ProfileIcon";
import { auth } from "../firebase";
import useModal from "../hooks/useModal";
import Modal from "../components/Modal";
import EditProfile from "../components/EditProfile";

const Wrapper = styled.div`
  padding: 20px;
`;
const Profile = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  .collumn {
    &.left {
      flex: 1 1 auto;
    }
    &.right {
      margin-left: 20px;
      flex: 1 1 70%;
    }
  }
  .image {
    width: 30%;
    min-width: 80px;
    aspect-ratio: 1;
    border-radius: 50%;
    overflow: hidden;
    img,
    svg {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
    img {
      border-radius: 50%;
      border: 1px solid #999;
    }
  }
  .name {
    .display_name {
      font-size: 20px;
      font-weight: 500;
    }
    .email {
      color: #999;
      margin-top: 5px;
    }
  }
  button {
    cursor: pointer;
    margin-top: 20px;
    padding: 10px 20px;
    border-radius: 20px;
    background: none;
    border: 1px solid #9d74ff;
    color: #9d74ff;
    &:hover,
    &:active {
      border-color: #813dff;
      color: #813dff;
    }
  }
`;

// TODO
// [ ] 내가 쓴 리뷰 보기 => 수정, 삭제

const MyPage = () => {
  const user = auth.currentUser;
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <Wrapper>
      <Profile>
        <div className="image collumn left">
          {user?.photoURL ? (
            <img src={user?.photoURL} />
          ) : (
            <ProfileIcon fill="#999" />
          )}
        </div>
        <div className="collumn right">
          <div className="name">
            <div className="display_name">{user?.displayName}</div>
            <div className="email">{user?.email}</div>
          </div>
          <button onClick={() => openModal("edit-profile")}>프로필 수정</button>
        </div>
      </Profile>
      {/* 프로필 수정 모달 */}
      {isOpen("edit-profile") ? (
        <Modal title="프로필 수정" onClose={() => closeModal("edit-profile")}>
          <EditProfile onClose={() => closeModal("edit-profile")} />
        </Modal>
      ) : null}
    </Wrapper>
  );
};

export default MyPage;
