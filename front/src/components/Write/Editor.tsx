import EditorJS from "@editorjs/editorjs";
import { tools } from "../../utils/tools";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  editorStateToggle,
  setContent,
  setDraft,
  reset,
} from "../../store/write/writeSlice";
import Title from "./Title";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";

const Editor = () => {
  const { currentUser } = useAppSelector((state) => state.user);
  const { title, content, thumbnail, des, tags, isPublic, draft, editorState } =
    useAppSelector((state) => state.write);
  const [editor, setEditor] = useState({ isReady: false });
  const [disable, setDisable] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!editor.isReady) {
      setEditor(
        new EditorJS({
          holder: "editor",
          data: content,
          tools: tools,
          placeholder: "내용을 입력하세요",
        }),
      );
    }
  }, []);

  const handleDraft = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (disable === true) return;

    if (!title.length) {
      return toast.error("제목을 입력해주세요");
    }

    dispatch(setDraft(true));
    setDisable(true);

    let loading = toast.loading("저장중...");

    if (editor.isReady) {
      editor.save().then((data) => {
        dispatch(setContent(data));
        let postObject = {
          title,
          content: data,
          thumbnail,
          des,
          tags,
          isPublic,
          draft: true,
          userId: currentUser?._id,
          username: currentUser?.username,
        };

        console.log(postObject);

        axios
          .post(`${import.meta.env.VITE_SERVER_DOMAIN}/post`, postObject, {
            withCredentials: true,
          })
          .then(() => {
            setDisable(false);

            toast.dismiss(loading);
            toast.success("저장 성공!");

            setTimeout(() => {
              dispatch(reset());
              navigate("/post-list");
            }, 500);
          })
          .catch((error) => {
            setDisable(false);
            toast.dismiss(loading);
            console.log(error);
            return toast.error(error.response.data.error);
          });
      });
    }
  };

  const handleNext = () => {
    if (!title.length) {
      return toast.error("제목을 입력해주세요");
    }

    if (editor.isReady) {
      editor
        .save()
        .then((data) => {
          if (data.blocks.length) {
            dispatch(setContent(data));
            dispatch(setDraft(false));
            dispatch(editorStateToggle("publishForm"));
          } else {
            return toast.error("내용을 작성해주세요");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="relative mx-auto  h-screen  w-full  max-w-4xl">
      <Toaster position="top-center" toastOptions={{ duration: 2000 }} />

      <section className="editor-height">
        <Title editorState={editorState} />
        <div id="editor" className="px-2"></div>
      </section>

      <footer className="h-18 fixed bottom-0 z-10 mt-10 flex  w-full  max-w-4xl justify-between  bg-white p-4">
        <Link to={`/`}>
          <button className="rounded-full bg-black px-5 py-3 text-sm  text-white hover:bg-opacity-80">
            뒤로
          </button>
        </Link>
        <div className="space-x-1">
          <button
            disabled={disable}
            className="rounded-full bg-black px-5 py-3 text-sm  text-white hover:bg-opacity-80"
            onClick={handleDraft}
          >
            임시저장
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="rounded-full bg-black px-5 py-3 text-sm  text-white hover:bg-opacity-80"
          >
            다음
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Editor;
