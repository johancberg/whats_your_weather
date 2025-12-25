import { boot } from 'quasar/wrappers';
import createStore, { storeKey } from 'src/store';

export default boot(({ app }) => {
  const Store = createStore({});
  app.use(Store, storeKey);

  app.config.globalProperties.$store = Store;
});
