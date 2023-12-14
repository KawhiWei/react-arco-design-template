import { GlobalContext } from '../context';
import defaultLocale from '../locales';
import { useContext } from 'react';

function useLocale(locale?: any) {
  const { lang } = useContext(GlobalContext);
  return (locale || defaultLocale)[lang] || {};
}

export default useLocale;
