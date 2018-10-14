import React from 'react';
import TopNav from '../../../components/top-nav/top-nav.component';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';

test('Top nav renders as expected', () => {
  const component = renderer.create(
    <Router>
      <TopNav />
    </Router>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
