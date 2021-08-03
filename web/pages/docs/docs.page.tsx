import React from 'react';

import { PropsRoot } from 'model/common.model';
import { DocsPageData } from 'model/pagedata.model';

import common from 'assets/css/common.module.scss';
import styles from './docs.module.scss';

class Docs extends React.Component<DocsProps, DocsState> {
  render() {
    const { pageData } = this.props;
    const title = pageData?.title || '';
    const message = pageData?.message || '';
    const siteTitle = pageData?.seo?.siteTitle || '';

    return (
      <>
        <div className={styles.heroBanner}>
          <div className={styles.heroText}>{siteTitle}</div>
          <div>&nbsp;&nbsp;</div>
          <div className={styles.heroSubext}>{title}</div>
        </div>
        <div className={common.vspace2} />
        <div className={styles.message}>
          <div className={styles.punchline}>{message}</div>
        </div>
      </>
    );
  }
}

export default Docs;

export interface DocsProps extends PropsRoot {
  pageData: DocsPageData | null;
}

export interface DocsState {}
