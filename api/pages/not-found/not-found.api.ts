import { NotFoundPageData } from 'model/pagedata.model';

export const notFoundPageData = (): NotFoundPageData => ({
  title: 'Page Not Found (404)',
  description: 'This page does not exist.',
  message: 'Return to Homepage',
  seo: {
    title: 'Page Not Found',
    description: 'This page does not exist',
  },
});
