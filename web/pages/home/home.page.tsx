import React from 'react';
import { Link } from 'react-router-dom';
import { FaExternalLinkAlt } from 'react-icons/fa';

import { PropsRoot } from 'model/common.model';
import { HomePageData } from 'model/pagedata.model';

import common from 'assets/css/common.module.scss';
import styles from './home.module.scss';

class Home extends React.Component<HomeProps, HomeState> {
  render() {
    const { pageData } = this.props;
    const title = pageData?.title || '';
    const message = pageData?.message || '';
    const siteTitle = pageData?.seo?.siteTitle || '';

    return (
      <>
        <div className={styles.heroBanner}>
          <div className={styles.heroText}>
            {siteTitle}
            <span className={styles.heroSplit}>
              &nbsp;&nbsp;
              <span className={styles.emojiBig}>🐼</span>
              &nbsp;&nbsp;
            </span>
            <span className={styles.heroSubtext}>{title}</span>
          </div>
        </div>
        <div className={styles.ctaBox}>
          <div className={styles.punchline}>{message}</div>
          <div className={common.vspace2} />
          <div className={styles.docsDesc}>
            <Link to="/docs">
              <div className={styles.docsItem}>
                <span>Documentation</span>
                <span>&nbsp;&nbsp;</span>
                <small>
                  <FaExternalLinkAlt />
                </small>
              </div>
            </Link>
          </div>
        </div>
      </>
    );
  }
}

export default Home;

export interface HomeProps extends PropsRoot {
  pageData: HomePageData | null;
}

export interface HomeState {}
