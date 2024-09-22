import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_PATH } from '@/constants/path.ts';
import { CreatePostRes, Post, PostDetail } from '@/types/post.ts';
import { RegisterData } from '@/types';
import { UserProfile } from '@/types/user.ts';

import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { setIsLogin } from '@/components/myProfile/userSlice.ts';

//export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

//새로 고침 시 accessToken 변수 초기화 => refresh토큰으로 재요청
export let accessToken: string | null = null;

const baseQuery = fetchBaseQuery({
  baseUrl: '/',
  credentials: 'include',
  prepareHeaders: (headers) => {
    headers.set('Accept', 'application/json');
    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    accessToken = null;

    // Refresh token API 호출
    const refreshResult = (await baseQuery(
      API_PATH.USER.GET_REFRESH_ACCESS_TOKEN,
      api,
      extraOptions
    )) as { data?: { data: { accessToken: string } } };

    if (refreshResult.data) {
      // 새 accessToken을 설정
      accessToken = refreshResult.data.data.accessToken;

      // 원래 요청을 재시도
      result = await baseQuery(args, api, extraOptions);
    } else {
      // 리프레시 토큰 갱신 실패 시, 사용자 로그아웃 처리 등 추가적인 처리를 여기에 추가할 수 있음
      alert('로그인이 만료되었습니다');
      accessToken = null;
      api.dispatch(setIsLogin(false));
    }
  }
  return result;
};

// base URL과 엔드포인트들로 서비스 정의
// 배포 시 BASE URL 변경 필요
export const localApi = createApi({
  reducerPath: 'localApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getPosts: builder.query<
      Post[],
      {
        minLatitude: number;
        minLongitude: number;
        maxLatitude: number;
        maxLongitude: number;
      }
    >({
      query: (arg) => ({
        url: API_PATH.POST.GET.ALL,
        params: arg,
      }),
      transformResponse: (response: { data: Post[] }) => response.data,
      keepUnusedDataFor: 0,
    }),
    getPostById: builder.query<PostDetail, string>({
      query: (id) => API_PATH.POST.GET.BY_ID.replace(':partyId', id),
      transformResponse: (response: { data: PostDetail }) => response.data,
      keepUnusedDataFor: 5,
    }),
    getJoinPosts: builder.query<Post[], string>({
      query: () => API_PATH.POST.GET.JOIN_POSTS,
      transformResponse: (response: { data: Post[] }) => response.data,
    }),
    getClosePosts: builder.query<Post[], string>({
      query: () => API_PATH.POST.GET.CLOSE_POSTS,
      transformResponse: (response: { data: Post[] }) => response.data,
    }),
    createPost: builder.mutation<CreatePostRes, RegisterData>({
      query: (patch) => ({
        url: API_PATH.POST.POST,
        method: 'POST',
        body: patch,
      }),
    }),
    getAccessToken: builder.query<{ accessToken: string }, { code: string }>({
      query: (arg) => ({
        url: API_PATH.USER.GET_ACCESS_TOKEN,
        params: arg,
      }),
      transformResponse: (response: { data: { accessToken: string } }) => {
        accessToken = response.data.accessToken;
        return response.data;
      },
    }),
    getRefreshAccessToken: builder.query<{ accessToken: string }, null>({
      query: () => API_PATH.USER.GET_REFRESH_ACCESS_TOKEN,
      transformResponse: (response: { data: { accessToken: string } }) => {
        accessToken = response.data.accessToken;
        return response.data;
      },
    }),
    participationChat: builder.mutation<{ message: string }, string>({
      query: (partyId) => ({
        url: API_PATH.CHAT.PARTICIPATION,
        method: 'POST',
        body: { partyId: Number(partyId) },
      }),
    }),
    getProfile: builder.query<UserProfile, null>({
      query: () => API_PATH.USER.GET_PROFILES,
      transformResponse: (response: { data: UserProfile }) => {
        return response.data;
      },
    }),
  }),
});

// 정의된 엔드포인트에서 자동으로 생성된 훅을 함수형 컴포넌트에서 사용하기 위해 export
export const {
  useLazyGetPostsQuery,
  useGetPostByIdQuery,
  useGetJoinPostsQuery,
  useGetClosePostsQuery,
  useCreatePostMutation,
  useGetAccessTokenQuery,
  useGetRefreshAccessTokenQuery,
  useParticipationChatMutation,
  useGetProfileQuery,
} = localApi;
