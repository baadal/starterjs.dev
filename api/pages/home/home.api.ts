import { HomePageData } from 'model/pagedata.model';

export const homePageData = (): HomePageData => ({
  title: 'React Starter Kit',
  description: 'Start Building!',
  message: 'Build something awesome!',
  seo: {
    title: 'Starter.js',
    description: 'A modern way of building Web Apps',
    meta: {
      keywords: 'Starter.js, React starter kit, SSR, Server-side rendering, React, PWA, TypeScript',
    },
  },
});
