import React from 'react';

import Header from 'components/header';
import Footer from 'components/footer';
import { HeaderData, FooterData } from 'model/pagedata.model';

import layout from 'assets/css/layout.module.scss';

const Layout: React.FC<LayoutProps> = ({ children, headerData, footerData }) => (
  <div className={layout.appContainer}>
    <Header data={headerData} />
    <div className={layout.appBody}>{children}</div>
    <Footer data={footerData} />
  </div>
);

export interface LayoutProps {
  headerData: HeaderData;
  footerData: FooterData;
}

export default Layout;
