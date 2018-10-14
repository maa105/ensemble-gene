import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from '../../../pages/app/app.page';
import { createEpicMiddleware } from 'redux-observable';
import { applyMiddleware, createStore } from 'redux';
import { rootEpic } from '../../../epics';
import rootReducer from '../../../reducers';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';

it('renders without crashing', () => {

  const epicMiddleware = createEpicMiddleware();
  const store = createStore(rootReducer, applyMiddleware(epicMiddleware));
  epicMiddleware.run(rootEpic);
  
  const div = document.createElement('div');
  ReactDOM.render(<Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('app should render correctly', () => {

  const epicMiddleware = createEpicMiddleware();
  const store = createStore(rootReducer, applyMiddleware(epicMiddleware));
  epicMiddleware.run(rootEpic);

  const component = renderer.create(
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
