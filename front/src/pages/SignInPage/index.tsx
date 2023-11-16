import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../../store/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import OAuth from "../../components/OAuth";

interface FormData {
  email: string;
  password: string;
}

const SignInPage = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  // const [error, setError] = useState<boolean>(false);
  // const [loading, setLoading] = useState<boolean>(false);
  const { loading, error } = useSelector((state: RootState) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      dispatch(signInStart());
      const data = await axios.post(
        `http://localhost:3000/auth/signin`,
        formData,
      );

      setFormData({
        email: "",
        password: "",
      });
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };

  return (
    <div className="mx-auto max-w-lg p-3">
      <h1 className="my-7 text-center text-3xl font-semibold">로그인</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="email"
          required
          value={formData.email}
          placeholder="이메일"
          id="email"
          className="rounded-lg bg-slate-100 p-3"
          onChange={handleChange}
        />
        <input
          type="password"
          required
          value={formData.password}
          placeholder="비밀번호"
          id="password"
          className="rounded-lg bg-slate-100 p-3"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="rounded-lg bg-slate-700 p-3 uppercase text-white hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "loading..." : "로그인"}
        </button>
        <OAuth />
      </form>
      <div className="mt-5 flex gap-2">
        <p>아직 회원이 아니신가요?</p>
        <Link to={`/sign-up`}>
          <span className="text-purple-300">회원가입</span>
        </Link>
      </div>
      <p className="text-red-500">
        {error ? (error.response && error.response.data.message) || "" : ""}
      </p>
    </div>
  );
};

export default SignInPage;
