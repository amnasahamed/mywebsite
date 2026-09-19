import React, { useEffect } from 'react';
import { Notepad } from './components/notepad/Notepad';
import { analytics } from './analytics';

export default function App() {
  useEffect(() => {
    analytics.pageView();
  }, []);

  return <Notepad />;
}
