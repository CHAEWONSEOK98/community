import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import axios from "axios";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../store/user/userSlice";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      const data = await axios.post(
        "http://localhost:3000/auth/google",
        {
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        },
        { withCredentials: true },
      );
      console.log(data);
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      console.log("구글 로그인 실패", error);
    }
  };

  return (
    <button
      onClick={handleGoogleClick}
      type="button"
      className="rounded-lg bg-purple-400 p-3 uppercase text-white hover:opacity-95 disabled:opacity-80"
    >
      Google
    </button>
  );
};

export default OAuth;
