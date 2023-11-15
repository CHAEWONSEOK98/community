import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

interface FormData {
  email: string;
  password: string;
}

const SignInPage = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setLoading(true);
      setError(false);
      await axios.post(`http://localhost:3000/auth/signin`, formData);
      setLoading(false);
      setFormData({
        email: "",
        password: "",
      });
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <div className="mx-auto max-w-lg p-3">
      <h1 className="my-7 text-center text-3xl font-semibold">로그인</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="email"
          value={formData.email}
          placeholder="이메일"
          id="email"
          className="rounded-lg bg-slate-100 p-3"
          onChange={handleChange}
        />
        <input
          type="password"
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
      </form>
      <div className="mt-5 flex gap-2">
        <p>아직 회원이 아니신가요?</p>
        <Link to={`/sign-up`}>
          <span className="text-purple-300">회원가입</span>
        </Link>
      </div>
      <p className="text-red-500">{error && "error"}</p>
    </div>
  );
};

export default SignInPage;
