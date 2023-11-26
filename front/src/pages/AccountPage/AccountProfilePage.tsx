import { HiPlusCircle } from "react-icons/hi";
import { MdCancel } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../../store";
import Header from "../../components/Account/Header";
import { useState, useRef, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";
import { updateUser } from "../../store/user/userThunkFunction";

const AccountProfilePage = () => {
  const dispatch = useAppDispatch();
  const { currentUser, error } = useAppSelector((state) => state.user);
  const [username, setUsername] = useState<string | undefined>(
    currentUser?.username,
  );
  const filePickerRef = useRef(null);
  const [imageFile, setImageFile] = useState<File | undefined>(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState<boolean>(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (imageFile) {
      handleFileUpload(imageFile);
    }
  }, [imageFile]);

  const handleFileUpload = async (imageFile) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setImagePercent(progress);
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePicture: downloadURL }),
        );
      },
    );
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.value.length > 16) return;
    setUsername(event.currentTarget.value);
    setFormData({ ...formData, username: event.currentTarget.value });
  };

  const handleCancelClick = () => {
    setUsername("");
  };

  const handleFileOpen = () => {
    filePickerRef.current.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageFile(event.currentTarget.files[0]);
  };

  const handleSubmit = async (evnet: React.FormEvent<HTMLFormElement>) => {
    evnet.preventDefault();
    try {
      dispatch(updateUser({ userId: currentUser?._id, formData }));
      setUpdateSuccess(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="fixed left-0 top-0 z-10 mx-auto h-full w-full bg-[#FFFFFF] p-4 lg:static lg:max-w-[956px]">
      <Header text="프로필 수정" />

      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <input
          type="file"
          ref={filePickerRef}
          className="hidden"
          accept="image/*"
          onChange={handleImageChange}
        />
        <div className=" my-12 flex flex-col items-center">
          <div className="relative">
            <img
              src={formData.profilePicture || currentUser?.profilePicture}
              alt="profile-image"
              className="h-24 w-24 cursor-pointer rounded-full"
              onClick={handleFileOpen}
            />
            <HiPlusCircle className="absolute -right-2 top-16 text-4xl" />
          </div>
          <p className="mt-2 text-sm">
            {imageError ? (
              <span className="text-red-700">
                이미지 업로드 에러 - (2 MB 미만 가능)
              </span>
            ) : imagePercent > 0 && imagePercent < 100 ? (
              <span className="text-slate-700">{`업로드: ${imagePercent} '%'`}</span>
            ) : imagePercent === 100 ? (
              <span className="text-green-700">이미지 업로드 성공</span>
            ) : (
              ""
            )}
          </p>
        </div>

        <div className="flex items-center justify-between text-xs">
          <span className=" font-semibold">닉네임을 입력해주세요.</span>
          <span>
            {`${username.length}`}
            <span className="text-gray-400">/16</span>
          </span>
        </div>

        <div className="relative">
          <input
            type="text"
            value={username}
            className=" w-full rounded-[3px] border-[1px] border-solid p-3  outline-none"
            onChange={handleNameChange}
            autoFocus
          />
          <span
            onClick={handleCancelClick}
            className="absolute right-3 top-[18px] cursor-pointer"
          >
            <MdCancel />
          </span>
        </div>

        <button
          disabled={
            currentUser.username === username &&
            formData.profilePicture === undefined
              ? true
              : false
          }
          className="cursor-pointer rounded-[2px] bg-[#6111EC] py-4 text-white  opacity-40 disabled:cursor-default disabled:bg-slate-500"
        >
          저장
        </button>
      </form>
      <p className="mt-4 text-red-600">{error && "업데이트 실패"}</p>
      <p className="mt-4 text-green-600">{updateSuccess && "업데이트 성공"}</p>
    </div>
  );
};

export default AccountProfilePage;
