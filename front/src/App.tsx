import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Root from "./pages/Root/index.tsx";
import Home from "./pages/HomePage/index.tsx";

import SignUpPage from "./pages/SignUpPage/index.tsx";
import SignInPage from "./pages/SignInPage/index.tsx";

import PrivateRoute from "./components/PrivateRoute.tsx";
import AccountPage from "./pages/AccountPage/index.tsx";
import AccountProfilePage from "./pages/AccountPage/AccountProfilePage.tsx";
import AccountUnRegisterPage from "./pages/AccountPage/AccountUnRegisterPage.tsx";

import PostListPage from "./pages/PostListPage/index.tsx";
import PostPage from "./pages/PostPage/index.tsx";

import WritePage from "../src/pages/WritePage";
import SeeMorePage from "./pages/SeeMorePage/index.tsx";

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
        path: "/sign-up",
        element: <SignUpPage />,
      },
      {
        path: "/sign-in",
        element: <SignInPage />,
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
  {
    path: "/see-more",
    element: <SeeMorePage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
