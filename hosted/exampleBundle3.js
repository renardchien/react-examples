'use strict';

var friendState = {
  name: 'Cody',
  friends: ['My', 'Myself', 'I', 'The gangs all here']
};

var newFriendState = {
  newFriend: ''
};

var addFriendToContainer = function addFriendToContainer(friend) {
  friendState.friends = friendState.friends.concat([friend]);

  ReactDOM.render(React.createElement(FriendsContainer, null), document.getElementById('app'));
};

var FriendsContainer = function FriendsContainer(props) {
  /** Items passed in as attributes are called props.
      These will be inherited as this.props in children
      made by this element. 
    
      The attribute name is the variable name
      <ShowList names=['Cody', 'V'] />
      would make a new ShowList object
      with this.props.names set equal to ['Cody', 'V']
      
      In this 
      <AddFriend addNew={this.addFriendToContainer} />
      line we are setting a prop inside of
      an AddFriend object as this.props.addNew 
      that is set equal to the Container object's 
      this.addFriendToContainer function.
      
      That has to be a function, because our
      AddFriend object's have a propTypes config
      for addNew set to a React.PropTypes.func 
      which is a function. 
      
      PropTypes allow type checking on a variable.
      Check out prop type options here
      https://facebook.github.io/react/docs/typechecking-with-proptypes.html
  **/
  return React.createElement(
    'div',
    null,
    React.createElement(
      'h3',
      null,
      ' Name: ',
      props.name,
      ' '
    ),
    React.createElement(AddFriend, { addNew: addFriendToContainer, newFriend: newFriendState.newFriend }),
    React.createElement(ShowList, { names: props.friends })
  );
};

var ShowList = function ShowList(props) {
  //map is a build-in for-each loop for an array
  //but lets you selectively add/edit/remove
  //on the fly while building a new array
  var listItems = props.names.map(function (friend) {
    return React.createElement(
      'li',
      null,
      ' ',
      friend,
      ' '
    );
  });
  return React.createElement(
    'div',
    null,
    React.createElement(
      'h3',
      null,
      ' Friends '
    ),
    React.createElement(
      'ul',
      null,
      listItems
    )
  );
};

var updateNewFriend = function updateNewFriend(e) {
  newFriendState.newFriend = e.target.value;

  ReactDOM.render(React.createElement(FriendsContainer, { name: friendState.name, friends: friendState.friends }), document.getElementById('app'));
};

var addNewFriend = function addNewFriend(e) {
  addFriendToContainer(newFriendState.newFriend);

  newFriendState.newFriend = '';

  ReactDOM.render(React.createElement(FriendsContainer, { name: friendState.name, friends: friendState.friends }), document.getElementById('app'));
};

var AddFriend = function AddFriend(props) {
  return React.createElement(
    'div',
    null,
    React.createElement('input', { type: 'text', value: props.newFriend, onChange: updateNewFriend }),
    React.createElement(
      'button',
      { onClick: addNewFriend },
      ' Add Friend '
    )
  );
};

AddFriend.propTypes = {
  addNew: PropTypes.func.isRequired,
  newFriend: PropTypes.string.isRequired
};

var init = function init() {
  ReactDOM.render(React.createElement(FriendsContainer, { name: friendState.name, friends: friendState.friends }), document.getElementById('app'));
};

window.onload = init;
