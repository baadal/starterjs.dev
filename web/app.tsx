import React from 'react';

import withInitialData from 'starter/hocs/with-initial-data';
import { AppPropsRoot } from 'starter/core/model/common.model';
import AppBody from 'starter/web/app';
import Layout from 'components/layout';

import 'assets/css/global.scss';

const App: React.FC<AppPropsRoot> = props => {
  const { headerData, footerData } = props;
  return (
    <Layout headerData={headerData} footerData={footerData}>
      <AppBody {...props} />
    </Layout>
  );
};

export default withInitialData(App);
