import React from 'react';
import Header from '../common/header/Header';
import Footer from '../common/footer/Footer';

const DefaultLayout = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default DefaultLayout;
