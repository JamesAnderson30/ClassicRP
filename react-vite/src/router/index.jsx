import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import NewPostForm from '../components/Posts/Forms/NewPost';
import Layout from './Layout';
import CategoryList from '../components/Categories/CategoryList';
import TopicList from '../components/Topics/TopicList';
import TopicMain from '../components/Topics/TopicMain';
import CategorySingle from '../components/Categories/CategorySingle';

// The router really should be rewritten
export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <h1>Welcome!</h1>,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "/post/new",
        element: <NewPostForm />
      },
      {
        path: "/categories",
        element: <CategoryList />
      },
      {
        path: "/categories/:id",
        element: <CategorySingle />
      },
      {
        path: "/topic/:id",
        element: <TopicMain />
      }
    ],
  },
]);
