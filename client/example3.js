const friendState = {
  name: 'Cody',
  friends: ['My', 'Myself', 'I', 'The gangs all here'], 
}

const newFriendState = {
  newFriend: ''
};

const addFriendToContainer = (friend) => {
  friendState.friends = friendState.friends.concat([friend]);
  
  ReactDOM.render(
    <FriendsContainer />,
    document.getElementById('app')
  );
};

const FriendsContainer = (props) => {
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
  return (
    <div>
      <h3> Name: {props.name} </h3>
      <AddFriend addNew={addFriendToContainer} newFriend={newFriendState.newFriend} />
      <ShowList names={props.friends} />
    </div>
  )
};

const ShowList = function(props) {
  //map is a build-in for-each loop for an array
  //but lets you selectively add/edit/remove
  //on the fly while building a new array
  const listItems = props.names.map((friend) => {
    return <li> {friend} </li>;
  });
  return (
    <div>
      <h3> Friends </h3>
      <ul>
        {listItems}
      </ul>
    </div>
  );
};

const updateNewFriend = (e) => {
  newFriendState.newFriend = e.target.value;
  
  ReactDOM.render(
    <FriendsContainer name={friendState.name} friends={friendState.friends} />,
    document.getElementById('app')
  );
};

const addNewFriend = function(e) {
  addFriendToContainer(newFriendState.newFriend);

  newFriendState.newFriend = '';
  
  ReactDOM.render(
    <FriendsContainer name={friendState.name} friends={friendState.friends} />,
    document.getElementById('app')
  );
};

const AddFriend = (props) => {
  return (
    <div>
      <input type="text" value={props.newFriend} onChange={updateNewFriend} />
      <button onClick={addNewFriend}> Add Friend </button>
    </div>
  ); 
};

AddFriend.propTypes = {
  addNew: PropTypes.func.isRequired,
  newFriend: PropTypes.string.isRequired
};

const init = () => {
  ReactDOM.render(
    <FriendsContainer name={friendState.name} friends={friendState.friends} />,
    document.getElementById('app')
  );
};

window.onload = init;