import { InitialData } from 'starter/core/model/response.model';

export const extractInitialData = (props: any): InitialData | null => {
  const initialDataOnServer = () => (props && props.staticContext) || null;

  // Ref: https://stackoverflow.com/a/7956249
  const initialDataOnClient = () => {
    if (typeof window !== typeof undefined) {
      return JSON.parse(document.getElementById('__STARTER_DATA__')?.textContent || 'null');
    }
    return null;
  };

  return initialDataOnServer() || initialDataOnClient();
};
