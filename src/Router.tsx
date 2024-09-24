import AuthChecker from '@/AuthChecker.tsx';
import Layout from '@/components/common/Layout';

import { CLIENT_PATH } from '@/constants/path.ts';
import LoadingPage from '@/pages/LoadingPage';
import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// import HomePage from '@/pages/HomePage';
//import SearchPage from '@/pages/SearchPage.tsx';
//import PostDetailPage from '@/pages/PostDetailPage.tsx';
//import CreatePostPage from '@/pages/CreatePostPage';
//import ChatListPage from '@/pages/ChatListPage.tsx';
//import ChatRoomPage from '@/pages/ChatRoomPage.tsx';
//import UsageHistoryPage from '@/pages/UsageHistoryPage.tsx';
//import MyProfilePage from '@/pages/MyProfilePage.tsx';
//import LoginPage from '@/pages/LoginPage.tsx';

const HomePage = lazy(() => import('@/pages/HomePage'));
const SearchPage = lazy(() => import('@/pages/SearchPage'));
const PostDetailPage = lazy(() => import('@/pages/PostDetailPage'));
const CreatePostPage = lazy(() => import('@/pages/CreatePostPage'));
const ChatListPage = lazy(() => import('@/pages/ChatListPage'));
const ChatRoomPage = lazy(() => import('@/pages/ChatRoomPage'));
const UsageHistoryPage = lazy(() => import('@/pages/UsageHistoryPage'));
const MyProfilePage = lazy(() => import('@/pages/MyProfilePage'));
const LoginPage = lazy(() => import('@/pages/LoginPage'));
const LoginLoadingPage = lazy(() => import('@/pages/LoginLoadingPage'));

const Router = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          <Route element={<Layout />}>
            <Route path={'/'} element={<HomePage />} />
            <Route path={CLIENT_PATH.SEARCH} element={<SearchPage />} />
            <Route
              path={CLIENT_PATH.POST_DETAIL}
              element={<PostDetailPage />}
            />
            <Route
              path={CLIENT_PATH.UPDATE_POST}
              element={<CreatePostPage />}
            />
            <Route path={CLIENT_PATH.LOGIN} element={<LoginPage />} />
            <Route
              path={CLIENT_PATH.LOGIN_LOADING}
              element={<LoginLoadingPage />}
            />
            {/*유저 로그인 상태 체크 필요 페이지*/}
            <Route element={<AuthChecker />}>
              <Route
                path={CLIENT_PATH.MY_PROFILE}
                element={<MyProfilePage />}
              />
              <Route
                path={CLIENT_PATH.USAGE_HISTORY}
                element={<UsageHistoryPage />}
              />
              <Route
                path={CLIENT_PATH.CREATE_POST}
                element={<CreatePostPage />}
              />
              <Route path={CLIENT_PATH.CHAT_LISTS} element={<ChatListPage />} />
              <Route path={CLIENT_PATH.CHAT_ROOM} element={<ChatRoomPage />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
