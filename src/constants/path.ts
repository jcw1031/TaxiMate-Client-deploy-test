export const LocalAPI = 'http://localhost:5173';

const SERVER_URL = import.meta.env.VITE_API_BASE_URL;

export const API_PATH = {
  SEARCH: {
    GET: 'https://dapi.kakao.com/v2/local/search/keyword.json',
  },
  POST: {
    GET: {
      ALL: `${SERVER_URL}/api/v1/parties`,
      // 포스트 ID 조회
      BY_ID: `${SERVER_URL}/api/v1/parties/:partyId`,
      // 특정 유저의 전체 포스트 조회
      BY_USER: `${SERVER_URL}/posts/user/:userId`,
      JOIN_POSTS: `/join-posts`,
      CLOSE_POSTS: `/close-posts`,
    },
    POST: `${SERVER_URL}/api/v1/parties`,
  },
  USER: {
    GET_ACCESS_TOKEN: `${SERVER_URL}/oauth2/kakao`,
    GET_REFRESH_ACCESS_TOKEN: `${SERVER_URL}/api/v1/auth/tokens`,
    GET_PROFILES: `${SERVER_URL}/api/v1/profiles`,
  },
  CHAT: {
    PARTICIPATION: `${SERVER_URL}/api/v1/participation`,
    GET_CHAT_LIST: `${SERVER_URL}/api/v1/chats`,
    GET_CHAT: `${SERVER_URL}/api/v1/chats/:partyId`,
  },
};

export const CLIENT_PATH = {
  SEARCH: '/search',
  POST_DETAIL: '/posts/:postId',
  CREATE_POST: '/create-post',
  UPDATE_POST: '/update-post/:postId',
  CHAT_LISTS: '/chat-list',
  CHAT_ROOM: '/chat-list/:chatRoomId',
  USAGE_HISTORY: '/usage-history',
  MY_PROFILE: '/my-profile',
  LOGIN: '/login',
  LOGIN_LOADING: '/login-loading',
};
