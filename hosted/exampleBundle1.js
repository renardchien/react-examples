'use strict';

var HelloWorld = function HelloWorld() {
  return React.createElement(
    'div',
    null,
    'Hello World!'
  );
};

var init = function init() {
  ReactDOM.render(React.createElement(HelloWorld, null), document.getElementById('app'));
};

window.onload = init;
