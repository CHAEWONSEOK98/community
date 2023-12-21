import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

interface DeletePostOverlayProps {
  setDeletePostModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeletePostOverlay = ({ setDeletePostModal }: DeletePostOverlayProps) => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const handleCancel = () => {
    setDeletePostModal(false);
  };
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/post/${postId}`);
      navigate("/post-list");
    } catch (error) {
      console.log(error);
      throw new Error("게시글 삭제 실패");
    } finally {
      setDeletePostModal(false);
    }
  };
  return (
    <div className="fixed left-1/2 top-1/2 z-20 flex w-11/12  -translate-x-1/2 -translate-y-1/2 flex-col rounded bg-white px-6 py-8 md:w-96 ">
      <h2>게시글 삭제</h2>
      <span>정말로 삭제하시겠습니까?</span>
      <div className="flex justify-end space-x-4">
        <button onClick={handleCancel}>취소</button>
        <button onClick={handleDelete}>확인</button>
      </div>
    </div>
  );
};

export default DeletePostOverlay;
