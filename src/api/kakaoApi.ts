import { API_PATH, CLIENT_PATH } from '@/constants/path.ts';

const kakaoApiKey = import.meta.env.VITE_KAKAO_API;

export const getAddress = async (x: number, y: number) => {
  try {
    const response = await fetch(
      `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${x}&y=${y}`,
      {
        method: 'GET',
        headers: {
          Authorization: `KakaoAK ${kakaoApiKey}`,
        },
      }
    );
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error);
    }

    return result.documents[0];
  } catch (err) {
    console.error(err);
  }
};

export const getSearchList = async (query: string, x: string, y: string) => {
  const queryString = new URLSearchParams({ query, x, y });

  try {
    const response = await fetch(`${API_PATH.SEARCH.GET}?${queryString}`, {
      method: 'GET',
      headers: {
        Authorization: `KakaoAK ${kakaoApiKey}`,
      },
    });
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error);
    }

    return result;
  } catch (err) {
    console.error(err);
  }
};

export const getKakaoInga = async () => {
  try {
    await window.Kakao.Auth.authorize({
      redirectUri: 'https://taxi-mate.like-knu.com' + CLIENT_PATH.LOGIN_LOADING,
    });
  } catch (error) {
    console.log(error);
  }
};
