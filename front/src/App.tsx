import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Root from "./pages/Root/index.tsx";
import Home from "./pages/HomePage/index.tsx";

import RegisterPage from "./pages/RegisterPage/index.tsx";
import LogInPage from "./pages/LogInPage/index.tsx";

import PrivateRoute from "./components/PrivateRoute.tsx";
import AccountPage from "./pages/AccountPage/index.tsx";
import AccountProfilePage from "./pages/AccountPage/AccountProfilePage.tsx";
import AccountUnRegisterPage from "./pages/AccountPage/AccountUnRegisterPage.tsx";

import PostListPage from "./pages/PostListPage/index.tsx";
import PostPage from "./pages/PostPage/index.tsx";

import WritePage from "../src/pages/WritePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/login",
        element: <LogInPage />,
      },
      {
        element: <PrivateRoute />,
        children: [
          {
            path: "/account/info",
            element: <AccountPage />,
          },
          {
            path: "/account/profile",
            element: <AccountProfilePage />,
          },
          {
            path: "/account/unregister",
            element: <AccountUnRegisterPage />,
          },
        ],
      },
      {
        path: "/post-list",
        element: <PostListPage />,
      },
      {
        path: "/post-list/:postId",
        element: <PostPage />,
      },
    ],
  },

  {
    path: "/write",
    element: <WritePage />,
  },
  {
    path: "/write/:postId",
    element: <WritePage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
