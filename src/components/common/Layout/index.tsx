import Container from '@/components/common/Layout/Layout.style.ts';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <Container>
      <Outlet />
    </Container>
  );
};

export default Layout;
