/**
 * @format
 */

import { Navigation } from 'react-native-navigation';
import Home from './src/scene/Home.tsx';
import Settings from './src/scene/Settings.tsx';
import AddRecord from './src/scene/AddRecord.tsx';
import Records from './src/scene/Records.tsx';

Navigation.registerComponent('Home', () => Home);
Navigation.registerComponent('AddRecord', () => AddRecord);
Navigation.registerComponent('Settings', () => Settings);
Navigation.registerComponent('Records', () => Records);

Navigation.setDefaultOptions({
  statusBar: {
    backgroundColor: '#4d089a',
  },
  topBar: {
    title: {
      color: 'white',
    },
    backButton: {
      color: 'white',
    },
    background: {
      color: '#4d089a',
    },
  },
});
Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'Home',
            },
          },
        ],
      },
    },
  });
});
