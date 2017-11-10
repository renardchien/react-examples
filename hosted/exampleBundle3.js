'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//Function to 'Render' for our FriendsContainer React Component
/**
  We will create a React component class by extending the 
  React Component class. This is more complicated than
  Functional Stateless Components (FSCs) but they have
  much better performance at the moment. 
  
  Each React component should have a render method
  that will automatically be called when elements of
  this class are created. 

  We will set a React render method to this function.
  A React render method will usually generate appropriate
  HTML or JSX and return it.
  
  Notice the syntax of this is not valid JS, but more like HTML. 
  
  React has a special syntax called JSX which looks like HTML
  but not stored as a string. 
  
  When React calls this, it will convert the JSX/HTML into real
  HTML behind the scenes in a very fast way using a virtual DOM. 
  
  JSX is an HTML/XML like syntax in JS that also allows for
  JS expressions such as variable names. 
  
  JSX let's us write the structure we want on the page, but
  more securely (limiting injection and other security issues)
  and easily than making our own HTML strings. 
  
  JSX can use JS expressions by the use of curly braces.
  For example <p> {user.name} </p> would put the user.name
  variable inside of a <p> tag. 
  Similarly, <p> { user('name') } </p> would call a user function
  with the parameter 'name' and put the return value into the <p> tag.
  
  JSX also let's us reference React Components. 
  For example, if we have a React Component called CustomDiv,
  we could create elements of that (and subsequently call their render functions)
  inside of our JSX.
  It might look like this
  <div>
    <CustomDiv />
  </div>
**/
//React - class Component
// Extends the React.Component class
var FriendsContainer = function (_React$Component) {
  _inherits(FriendsContainer, _React$Component);

  //constructor will accept attributes from the JSX that made it
  /**
    If an instance of this class is created with the JSX
  <FriendsContainer name={'Broden'} friends={['me', 'myself']} />
  
  Then the props field that comes in will have a name
  field on it with the value Broden and a friends field that is
  an array with 'me' and 'myself'
  
  We should always pass these props up to the parent class to register
  them with the parent's code if we are using props.
  **/
  function FriendsContainer(props) {
    _classCallCheck(this, FriendsContainer);

    //set our initial state. 
    /**
      React component instances each hold a state for themselves. They
      are able to reference and change this state internally. 
      
      Here we are setting the initial state based on what was passed in.
    **/
    var _this = _possibleConstructorReturn(this, (FriendsContainer.__proto__ || Object.getPrototypeOf(FriendsContainer)).call(this, props));

    _this.state = {
      name: props.name,
      friends: props.friends
    };

    //Given the scoping of React components, we need to bind each method
    //of this class to the current scope. Otherwise, the class's scope and
    //React's scope will not align. This is a weird quirk of using class components.
    _this.addFriendToContainer = _this.addFriendToContainer.bind(_this);
    return _this;
  }

  //method to add a friend to our friend list.
  /** 
    This method updates the state based on input from the user. This keeps our state matched
  to what is on screen. Our listener in our JSX (in the render method) will fire this code
  to make sure our variable state matches what the physical input on the screen has. 
  
  That way, at any given time, we can use that data to make informed decisions within react,
  such as submissions, autocomplete, previews, screen updates, etc.
  
  Given how react components work, they are controlling the state of elements on the screen,
  so without this, there also could be some behavior that does not seem like the default HTML 
  behavior for certain elements.
  **/


  _createClass(FriendsContainer, [{
    key: 'addFriendToContainer',
    value: function addFriendToContainer(friend) {
      //add a friend to our friends list in the state
      /**
        The setState method is inherited from the React Component class.
        This state change automatically triggers a re-render of the screen
        to update what the user sees. 
        
        This is an incremental update so it's only updating HTML that actually changed
        as opposed to recreating/updating all of the HTML. This is what makes this so
        fast to operate. 
        
        Notice, we are using .concat instead of push.
        The concat function will create a new array
        from the old array with the new values appended.
        
        We are doing this so that we do not modify the original
        array (not pushing to it). This means the original
        array has not been mutated. We call this immutability. 
        
        Why do we want the array to be immutable? 
        Well React and many frameworks check current values
        against the previous value to see differences. This 
        also means we can undo changes 
        (several times if we store several states).
        
        The difference check is actually much easier to maintain 
        and faster to calculate than trying to see if an array
        has been mutated over time (without having separate arrays or history).
        
        Changes in the array can trigger events like re-rendering and such. 
        Immutability makes this process much faster and easier.
      **/
      this.setState({ friends: this.state.friends.concat([friend]) });
    }

    //Render function
    /**
      This is automatically called when JSX is rendered into the page. Each instance will
    trigger this. 
    
    This JSX will get converted to HTML and displayed on the page where intended. 
    
    In the event of other React Components like <AddFriend> and <ShowList>,
    those will get instances of those components, and their render functions will be 
    called to create HTML or more JSX.
    
    Notice we are passing the addFriendToContainer method from this component to the
    AddFriend component. That way the AddFriend component can call up to this component
    in order to communicate data between them. The addFriendToContainer method will
    come in as a prop to the AddFriend component and exposes functionality from this
    component. To the AddFriend component, it will be called addNew and will be in the props.
    
    Similarly, the ShowList component is receiving names as a prop. We are passing our friends
    array to the ShowList component as an array that it can redraw from.
    **/

  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(
          'h3',
          null,
          ' Name: ',
          this.state.name,
          ' '
        ),
        React.createElement(AddFriend, { addNew: this.addFriendToContainer, newFriend: '' }),
        React.createElement(ShowList, { names: this.state.friends })
      );
    }
  }]);

  return FriendsContainer;
}(React.Component);

//Function to 'Render' for our AddFriend React Component
/**
  Refer to notes for FriendsContainer for how it works
**/
//React - class Component
// Extends the React.Component class


var AddFriend = function (_React$Component2) {
  _inherits(AddFriend, _React$Component2);

  function AddFriend(props) {
    _classCallCheck(this, AddFriend);

    //set our initial state. 
    /**
      React component instances each hold a state for themselves. They
      are able to reference and change this state internally. 
      
      Here we are setting the initial state based on what was passed in.
    **/
    var _this2 = _possibleConstructorReturn(this, (AddFriend.__proto__ || Object.getPrototypeOf(AddFriend)).call(this, props));
    //constructor will accept attributes from the JSX that made it


    _this2.state = {
      newFriend: props.newFriend
    };

    //Given the scoping of React components, we need to bind each method
    //of this class to the current scope. Otherwise, the class's scope and
    //React's scope will not align. This is a weird quirk of using class components.
    _this2.updateNewFriend = _this2.updateNewFriend.bind(_this2);
    _this2.addNewFriend = _this2.addNewFriend.bind(_this2);
    return _this2;
  }

  //method update our new friend name
  /** 
    This method updates the state based on input from the user. This keeps our state matched
  to what is on screen. Our listener in our JSX (in the render method) will fire this code
  to make sure our variable state matches what the physical input on the screen has. 
  
  That way, at any given time, we can use that data to make informed decisions within react,
  such as submissions, autocomplete, previews, screen updates, etc.
  
  Given how react components work, they are controlling the state of elements on the screen,
  so without this, there also could be some behavior that does not seem like the default HTML 
  behavior for certain elements.
  **/


  _createClass(AddFriend, [{
    key: 'updateNewFriend',
    value: function updateNewFriend(e) {
      //remember that calling setState triggers a re-render if the data on screen changes
      //It is an incremental change so it's only the stuff that actually changed.
      this.setState({ newFriend: e.target.value });
    }

    //method to add our new friend name to the friends list
    /** Refer to notes for above updateNewFriend method  **/

  }, {
    key: 'addNewFriend',
    value: function addNewFriend(e) {
      //call up to our prop function (passed in from <FriendsContainer>)
      //in order to call its addFriendToContainer method (passed in as addNew)
      this.props.addNew(this.state.newFriend);
      //clear the field on the screen so the user can type again.
      //remember that calling setState triggers a re-render if the data on screen changes
      //It is an incremental change so it's only the stuff that actually changed.
      this.setState({ newFriend: '' });
    }

    //Method to render our JSX as HTML and attach listeners
    /** Refer to notes from FriendsContainer **/

  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement('input', { type: 'text', value: this.state.newFriend, onChange: this.updateNewFriend }),
        React.createElement(
          'button',
          { onClick: this.addNewFriend },
          ' Add Friend '
        )
      );
    }
  }]);

  return AddFriend;
}(React.Component);

//Function to 'Render' for our ShowList React Component
/**
  Refer to notes for FriendsContainer for how it works
**/
//React - class Component
// Extends the React.Component class


var ShowList = function (_React$Component3) {
  _inherits(ShowList, _React$Component3);

  //constructor will accept attributes from the JSX that made it
  function ShowList(props) {
    _classCallCheck(this, ShowList);

    return _possibleConstructorReturn(this, (ShowList.__proto__ || Object.getPrototypeOf(ShowList)).call(this, props));
  }

  //Method to render our JSX as HTML and attach listeners
  /** Refer to notes from FriendsContainer **/


  _createClass(ShowList, [{
    key: 'render',
    value: function render() {
      //map is a build-in for-each loop for an array
      //but lets you selectively add/edit/remove
      //on the fly while building a new array
      var listItems = this.props.names.map(function (friend) {
        return React.createElement(
          'li',
          null,
          ' ',
          friend,
          ' '
        );
      });
      //pass in our new <li> listItems array to our JSX
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
    }
  }]);

  return ShowList;
}(React.Component);

//ReactDOM.render allows us to 'render' React classes/components
//to the page. 
/**
  ReactDOM.render will generate or update HTML on the page
  very quickly with the new structure given.

  The first argument is the JSX to render to the page
  and all subsequent JSX elements. The JSX will be 
  converted into normal valid HTML. 

  The second argument is where on the page to add it.
  
  The attibutes of our JSX are sent in to the FriendContainer component
  as an argument called props. This allows us to pass data and functions
  into our components. 
  
  In this case, the FriendsContainer component will receive a props object
  that has a variable called 'name' set to our friendState.name and
  a variable called friends set to our friendState.friends array.
**/


var init = function init() {
  var name = 'Cody';
  var friends = ['My', 'Myself', 'I', 'The gangs all here'];

  ReactDOM.render(React.createElement(FriendsContainer, { name: 'Cody', friends: friends }), document.getElementById('app'));
};

window.onload = init;
