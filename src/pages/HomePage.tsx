import { useLazyGetPostsQuery } from '@/api/localApi.ts';
import KnuLogoIcon from '@/assets/icons/header/knu-logo-icon.svg?react';

import TaxiIcon from '@/assets/icons/header/taxi-icon.svg?react';
import Footer from '@/components/common/Layout/Footer';

import Header from '@/components/common/Layout/Header';
import { HeaderItem } from '@/components/common/Layout/Header/Header.style.ts';
import LoadingIcon from '@/components/common/LoadingIcon';
import Map from '@/components/Home/Map';
import { Main } from '@/components/Home/Map/Map.style.ts';
import MoveCurrentLocation from '@/components/Home/MoveCurrentLocation';
import PostList from '@/components/Home/PostList';
import ResearchButton from '@/components/Home/ResearchButton';
import SearchBar from '@/components/Home/SearchBar';
import getCurrentLocation from '@/utils/getCurrentlocation.ts';
import { useEffect, useState } from 'react';

const HomePage = () => {
  const [map, setMap] = useState<naver.maps.Map | null>(null);
  const [activeButton, setActiveButton] = useState<boolean>(true);
  const [activeMarker, setActiveMarker] = useState<string | null>(null);
  const [postListHeight, setPostListHeight] = useState(0);
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 관리

  const [trigger, { data }] = useLazyGetPostsQuery();

  const getPostsQueryTrigger = () => {
    if (!map) return;
    const minLatitude = map.getBounds().minY();
    const minLongitude = map.getBounds().minX();
    const maxLatitude = map.getBounds().maxY();
    const maxLongitude = map.getBounds().maxX();
    trigger({
      minLatitude,
      minLongitude,
      maxLatitude,
      maxLongitude,
    });
  };

  useEffect(() => {
    getPostsQueryTrigger();
  }, [map]);

  useEffect(() => {
    const centerLocation = JSON.parse(localStorage.getItem('Location') || '');

    (async () => {
      const { lat, lng } = await getCurrentLocation();
      if (!(centerLocation.lat === lat && centerLocation.lng === lng)) {
        setActiveButton(false);
      }
    })();
  }, []);

  return (
    <>
      <Header>
        <HeaderItem>
          택시팟
          <TaxiIcon />
        </HeaderItem>
        <button onClick={() => {
          console.log('LikeKNU');
          if (window.ReactNativeWebView) {
            window.ReactNativeWebView.postMessage('LikeKNU');
          }
        }}>
          <KnuLogoIcon />
        </button>
      </Header>
      <Main>
        <SearchBar path={'/search'} />
        <ResearchButton onClick={getPostsQueryTrigger} />
        {isLoading && <LoadingIcon />}
        <MoveCurrentLocation
          map={map}
          activeButton={activeButton}
          setActiveButton={setActiveButton}
          activeMarker={activeMarker}
          postListHeight={postListHeight}
          setIsLoading={setIsLoading}
        />
        <Map
          map={map}
          setMap={setMap}
          setActiveButton={setActiveButton}
          activeMarker={activeMarker}
          setActiveMarker={setActiveMarker}
          data={data || []}
        />
      </Main>
      <PostList
        activeMarker={activeMarker}
        data={data || []}
        setPostListHeight={setPostListHeight}
      />
      <Footer />
    </>
  );
};

export default HomePage;
