'use strict';

var handleNameChange = function handleNameChange(e) {
  ReactDOM.render(React.createElement(HelloUser, { username: e.target.value }), document.getElementById('app'));
};

var HelloUser = function HelloUser(props) {
  //onChange is a custom react listener for element.onchange. 
  //We can embed it in elements, but it doesn't get rendered into the HTML
  //Instead it gets interpreted by JSX and adds a listener
  return React.createElement(
    'div',
    null,
    'Hello ',
    props.username,
    React.createElement(
      'p',
      null,
      'Change Name:'
    ),
    React.createElement('input', { type: 'text', value: props.username, onChange: handleNameChange })
  );
};

var init = function init() {
  ReactDOM.render(React.createElement(HelloUser, { username: 'Cody' }), document.getElementById('app'));
};

window.onload = init;
