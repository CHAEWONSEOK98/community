import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store";
import { logInUser } from "../store/user/userThunkFunction";

const OAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);
    const result = await signInWithPopup(auth, provider);

    const formData = {
      name: result.user.displayName,
      email: result.user.email,
      photo: result.user.photoURL,
    };
    dispatch(logInUser(formData));

    navigate("/");
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
