import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

interface FormData {
  username: string;
  email: string;
  password: string;
}

const SignUpPage = () => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setLoading(true);
      setError(false);
      await axios.post(`http://localhost:3000/auth/signup`, formData);
      setLoading(false);
      setFormData({
        username: "",
        email: "",
        password: "",
      });
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <div className="mx-auto max-w-lg p-3">
      <h1 className="my-7 text-center text-3xl font-semibold">회원가입</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          value={formData.username}
          placeholder="이름"
          id="username"
          className="rounded-lg bg-slate-100 p-3"
          onChange={handleChange}
        />
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
          {loading ? "loading..." : "회원가입"}
        </button>
      </form>
      <div className="mt-5 flex gap-2">
        <p>계정이 이미 있으신가요?</p>
        <Link to={`/sign-in`}>
          <span className="text-purple-300">로그인</span>
        </Link>
      </div>
      <p className="text-red-500">{error && "error"}</p>
    </div>
  );
};

export default SignUpPage;
