import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Root from "./pages/Root.tsx";
import Home from "./pages/HomePage.tsx";

import RegisterPage from "./pages/RegisterPage";
import LogInPage from "./pages/LogInPage.tsx";

import PrivateRoute from "./components/PrivateRoute.tsx";
import AccountInfoPage from "./pages/AccountInfoPage.tsx";
import AccountProfilePage from "./pages/AccountProfilePage.tsx";
import AccountUnRegisterPage from "./pages/AccountUnRegisterPage.tsx";

import PostListPage from "./pages/PostListPage.tsx";
import PostPage from "./pages/PostPage.tsx";

import WritePage from "./pages/WritePage.tsx";
import MyPostListPage from "./pages/MyPostListPage.tsx";
import MyLikePostListPage from "./pages/MyLikePostListPage.tsx";
import MySavePostPage from "./pages/MySavePostPage.tsx";

const router = createBrowserRouter([
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <LogInPage />,
  },
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/post-list",
        element: <PostListPage />,
      },
      {
        path: "/post-list/:postId",
        element: <PostPage />,
      },
      {
        element: <PrivateRoute />,
        children: [
          {
            path: "/account/info",
            element: <AccountInfoPage />,
          },
          {
            path: "/account/profile",
            element: <AccountProfilePage />,
          },
          {
            path: "/account/unregister",
            element: <AccountUnRegisterPage />,
          },

          {
            path: "/my/post-list",
            element: <MyPostListPage />,
          },
          {
            path: "/my/like-post",
            element: <MyLikePostListPage />,
          },
          {
            path: "/my/save-post",
            element: <MySavePostPage />,
          },
        ],
      },
    ],
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        path: "/write",
        element: <WritePage />,
      },
      {
        path: "/write/:postId",
        element: <WritePage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
