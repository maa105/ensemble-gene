import _ from 'lodash';

var lifecycleMethods = [
  'render',
  'componentWillMount',
  'componentDidMount',
  'componentWillReceiveProps',
  'shouldComponentUpdate',
  'componentWillUpdate',
  'componentDidUpdate',
  'componentWillUnmount'
];

var stubComponent = function(componentClass) {
  var originalPropTypes, mocked = [];

  beforeEach(function() {
    originalPropTypes = componentClass.propTypes;

    componentClass.propTypes = {};

    _.forEach(lifecycleMethods, function(method) {
      if(typeof componentClass.prototype[method] !== 'undefined') {
        mocked.push(method);
        const spy = jest.spyOn(componentClass.prototype, method).mockImplementation(() => null);
        componentClass.prototype[method].spy = spy;
      }
    });
  });

  afterEach(function() {
    componentClass.propTypes = originalPropTypes;
    _.forEach(mocked, function(method) {
      componentClass.prototype[method].spy.mockRestore();
    });
  });
};

module.exports = {
  stubComponent: stubComponent
};
