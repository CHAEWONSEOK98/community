import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from "./pages/HomePage/index.tsx";
import SignUpPage from "./pages/SignUpPage/index.tsx";
import SignInPage from "./pages/SignInPage/index.tsx";
import ProfilePage from "./pages/ProfilePage/index.tsx";
import WritePage from "../src/pages/WritePage";
import PostListPage from "./pages/PostListPage/index.tsx";
import PostPage from "./pages/PostPage/index.tsx";
import Root from "./pages/Root/index.tsx";
import PrivateRoute from "./components/PrivateRoute.tsx";

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
            path: "/profile",
            element: <ProfilePage />,
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
