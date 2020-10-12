import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

import { NotFoundPageData } from 'model/pagedata.model';

import common from 'assets/css/common.module.scss';

const StyledDiv = styled.div({
  textAlign: 'center',
  marginTop: '4rem',
});

const NotFound = (props: NotFoundProps) => {
  const { pageData } = props;
  const title = pageData?.title || '';
  const description = pageData?.description || '';
  const message = pageData?.message || '';

  return (
    <StyledDiv>
      <h2 className={common.alertTitle}>{title}</h2>
      <div className={common.vspace2} />
      <div>{description}</div>
      <div className={common.vspace2} />
      <Link to="/">
        <small>{message}</small>
      </Link>
    </StyledDiv>
  );
};

export interface NotFoundProps {
  pageData: NotFoundPageData | null;
}

export default NotFound;
