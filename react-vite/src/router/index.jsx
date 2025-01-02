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
import DocManage from '../components/Documents/DocManage';
import DocWrite from '../components/Documents/DocWrite';
import DocEdit from '../components/Documents/DocEdit';
import TopicNew from '../components/Topics/TopicNew';

import NotFound from '../components/Error/404';

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
        path: "/topic/new/:id",
        element: <TopicNew />
      },
      {
        path: "/user/:id",
        element: <UserPage />
      },
      {
        path: "/documents/manage",
        element: <DocManage />
      },
      {
        path: "/documents/new",
        element: <DocWrite />
      },
      {
        path: "/documents/:id/edit",
        element: <DocEdit />
      },
      {
        path: '/404',
        element: <NotFound />
      }
    ],
  },
]);
