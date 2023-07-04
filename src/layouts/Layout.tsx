import Head from 'next/head';
import { ReactNode } from 'react';


type LayoutProps = {
    children : ReactNode;
}
const Layout = ({ children }:LayoutProps) => (
  <>
    <Head>
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
    </Head>
    {children}
  </>
);

export default Layout;
