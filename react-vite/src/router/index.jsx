import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import NewPostForm from '../components/Posts/Forms/NewPost';
import Layout from './Layout';
import CategoryList from '../components/Categories/CategoryList';

import TopicMain from '../components/Topics/TopicMain';
import CategorySingle from '../components/Categories/CategorySingle';
import LandingPage from '../components/LandingPage'
import UserPage from '../components/Users/UserPage'

// The router really should be rewritten
export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
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
      },
      {
        path: "/user/:id",
        element: <UserPage />
      }
    ],
  },
]);
