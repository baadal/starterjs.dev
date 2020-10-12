import { RouteComponentProps } from 'react-router-dom';

export interface StringIndexable<T = any> {
  [key: string]: T;
}

export interface PropsRoot extends RouteComponentProps<any> {}
