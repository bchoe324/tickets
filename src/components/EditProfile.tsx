import { auth, storage } from "../firebase";
import { updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import useModal from "../hooks/useModal";
import ProfileIcon from "../assets/icons/ProfileIcon";
import styled from "styled-components";
import Loading from "./Loading";

const Wrapper = styled.div`
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .collumn:not(:first-child) {
    margin-top: 20px;
  }
  .image {
    width: 98px;
    height: 98px;

    label {
      cursor: pointer;

      .preview {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        overflow: hidden;

        img,
        svg {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
        }
      }
    }
    input {
      display: none;
    }
  }
  .name {
    label {
      margin-right: 10px;
    }
    input {
      padding: 5px 10px;
      border-radius: 8px;
      border: 1px solid #999;
      &:focus {
        outline: 0;
        border-color: #9d74ff;
      }
    }
  }
  .submit_button {
    cursor: pointer;
    background: #813dff;
    color: #fff;
    border: 0 none;
    padding: 10px 20px;
    border-radius: 20px;
  }
`;

const EditProfile = ({ onClose }: { onClose: () => void }) => {
  const user = auth.currentUser;
  const [isLoading, setLoading] = useState(false);
  const { closeModal } = useModal();
  const [name, setName] = useState(user?.displayName || "");
  const [avatar, setAvatar] = useState<{
    file: File | null;
    url: undefined | null | string;
  }>({
    file: null,
    url: user?.photoURL,
  });

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length === 1) {
      if (files[0].size > 1024 ** 2) {
        alert("Please add image that is 1MB or less");
      } else {
        setAvatar({
          file: files[0],
          url: URL.createObjectURL(files[0]),
        });
      }
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      if (!user) return;
      let uploadedPhoto = null;

      if (avatar.file) {
        const locationRef = ref(storage, `${user.uid}/profile/avatar`);
        const result = await uploadBytes(locationRef, avatar.file);
        uploadedPhoto = await getDownloadURL(result.ref);
      }

      await updateProfile(user, { displayName: name, photoURL: uploadedPhoto });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <Wrapper>
      {isLoading ? <Loading /> : null}
      <form onSubmit={onSubmit}>
        <div className="image collumn">
          <label htmlFor="image">
            <div className="preview">
              {avatar.url ? (
                <img src={avatar.url} />
              ) : (
                <ProfileIcon fill="#999" />
              )}
            </div>
          </label>
          <input
            onChange={onChangeFile}
            type="file"
            id="image"
            accept="image/*"
          />
        </div>
        <div className="name collumn">
          <label htmlFor="displayName">이름</label>
          <input
            onChange={onChangeName}
            type="text"
            id="displayName"
            value={name}
          />
        </div>
        <div className="collumn"></div>
        <input className="submit_button" type="submit" value="저장" />
      </form>
    </Wrapper>
  );
};

export default EditProfile;
