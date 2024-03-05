import * as React from 'react';

import { ZonkaFeedback } from 'react-native-zonkafeedback';
import ViewMore from './viewMore';

export default function App() {
  return (
    <ZonkaFeedback value={{ token: '3sL4cB', region: 'US' }}>
      <ViewMore />
    </ZonkaFeedback>
  );
}
