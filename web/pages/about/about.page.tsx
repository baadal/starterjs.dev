import React from 'react';

import { elapsedBuildTime } from 'starter/utils/env';
import { PropsRoot } from 'model/common.model';
import { AboutPageData } from 'model/pagedata.model';

import common from 'assets/css/common.module.scss';

class About extends React.Component<AboutProps, AboutState> {
  render() {
    const { pageData } = this.props;
    const title = pageData?.title || '';
    const description = pageData?.description || '';

    const elapsed = elapsedBuildTime();

    return (
      <>
        <h2 className={common.pageTitle}>{title}</h2>
        <div>{description}</div>
        <div className={common.vspace2} />
        <div className={common.vspace2} />
        <div>
          <small>
            <strong>Last build:</strong> <span className={common.textOlive}>{elapsed || '---'}</span>{' '}
            <span>
              (<em>Starter.js</em>&nbsp;&nbsp;<code>v{process.env.npm_package_version}</code>)
            </span>
          </small>
        </div>
      </>
    );
  }
}

export interface AboutProps extends PropsRoot {
  pageData: AboutPageData | null;
}

export interface AboutState {}

export default About;
