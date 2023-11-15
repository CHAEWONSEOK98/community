import { Link } from "react-router-dom";

const SignUpPage = () => {
  return (
    <div className="mx-auto max-w-lg p-3">
      <h1 className="my-7 text-center text-3xl font-semibold">회원가입</h1>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="이름"
          id="username"
          className="rounded-lg bg-slate-100 p-3"
        />
        <input
          type="email"
          placeholder="이메일"
          id="email"
          className="rounded-lg bg-slate-100 p-3"
        />
        <input
          type="password"
          placeholder="비밀번호"
          id="password"
          className="rounded-lg bg-slate-100 p-3"
        />
        <button className="rounded-lg bg-slate-700 p-3 uppercase text-white hover:opacity-95 disabled:opacity-80">
          회원가입
        </button>
      </form>
      <div className="mt-5 flex gap-2">
        <p>계정이 이미 있으신가요?</p>
        <Link to={`/sign-in`}>
          <span className="text-purple-300">로그인</span>
        </Link>
      </div>
    </div>
  );
};

export default SignUpPage;
