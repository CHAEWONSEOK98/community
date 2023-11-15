import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from "./pages/HomePage/index.tsx";
import LoginPage from "./pages/LoginPage/index.tsx";
import WritePage from "../src/pages/WritePage";
import PostListPage from "./pages/PostListPage/index.tsx";
import PostPage from "./pages/PostPage/index.tsx";
import Root from "./pages/Root/index.tsx";
import SignUpPage from "./pages/SignUpPage/index.tsx";

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
        path: "/login",
        element: <LoginPage />,
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
        path: "/sign-up",
        element: <SignUpPage />,
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
