import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

const RouterDecorator = (Story: React.FC) => (
  <Router>
    <Story />
  </Router>
);

export default RouterDecorator;
