import React from 'react';
import { NavLink } from 'react-router-dom';

import { HeaderData } from 'model/pagedata.model';

import layout from 'assets/css/layout.module.scss';

const Header = (props: HeaderProps) => {
  const { data } = props;
  const showHeader = data?.showHeader;

  if (!showHeader) return null;

  return (
    <header className={layout.header}>
      <nav>
        <NavLink to="/" exact activeClassName="active">
          Home
        </NavLink>
        <span>&nbsp;&nbsp;&nbsp;</span>
        <NavLink to="/about" exact activeClassName="active">
          About
        </NavLink>
      </nav>
      <div css={{ marginLeft: 'auto' }}>v{process.env.npm_package_version}</div>
    </header>
  );
};

export interface HeaderProps {
  data: HeaderData;
}

export default Header;
