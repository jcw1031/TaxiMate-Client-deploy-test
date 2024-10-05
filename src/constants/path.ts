export const LocalAPI = import.meta.env.VITE_HOST;

export const API_PATH = {
  SEARCH: {
    GET: 'https://dapi.kakao.com/v2/local/search/keyword.json',
  },
  POST: {
    GET: {
      ALL: `/api/v1/parties`,
      // 포스트 ID 조회
      BY_ID: `/api/v1/parties/:partyId`,
      // 특정 유저의 전체 포스트 조회
      BY_USER: `/posts/user/:userId`,
      JOIN_POSTS: `${LocalAPI}/join-posts`,
      CLOSE_POSTS: `${LocalAPI}/close-posts`,
    },
    POST: `/api/v1/parties`,
  },
  USER: {
    GET_ACCESS_TOKEN: `/oauth2/kakao`,
    GET_REFRESH_ACCESS_TOKEN: `/api/v1/auth/tokens`,
    GET_PROFILES: `/api/v1/profiles`,
  },
  CHAT: {
    PARTICIPATION: `/api/v1/participation`,
    GET_CHAT_LIST: `/api/v1/chats`,
    GET_CHAT: '/api/v1/chats/:partyId',
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
