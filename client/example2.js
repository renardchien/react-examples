//Function to 'Render' for our HelloUser React Component
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
  
  The following function is fairly simple as it
  just generates <div> Hello World! </div> 
  any time someone adds a <HelloUser /> tag to the page.
**/
//React - class Component
// Extends the React.Component class
class HelloUser extends React.Component {
	
  //constructor will accept attributes from the JSX that made it
  /**
    If an instance of this class is created with the JSX
	<HelloUser username={'Broden'} />
	
	Then the props field that comes in will have a username
	field on it with the value Broden.
	
	Similarly, if we made an instance of this with
	<HelloUser username={'broden'} age={20} increase={someFunction} />
	
	Then the props field that comes in would have a username field
	set to the value Broden, an age field set to 20 and an increase
	field set to a reference to the function someFunction.
	
	We should always pass these props up to the parent class to register
	them with the parent's code if we are using props.
  **/
  constructor(props) {
    super(props);
    
	//set our initial state. 
	/**
	  React component instances each hold a state for themselves. They
	  are able to reference and change this state internally. 
	  
	  Here we are setting the initial state based on what was passed in.
	**/
    this.state = {
      username: props.username,
    };
    
	//Given the scoping of React components, we need to bind each method
	//of this class to the current scope. Otherwise, the class's scope and
	//React's scope will not align. This is a weird quirk of using class components.
    this.handleNameChange = this.handleNameChange.bind(this);
  }
  
  //handle name change method.
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
  handleNameChange (e) {
	//set our state's username to what the user typed in
	/**
	  The setState method is inherited from the React Component class.
	  This state change automatically triggers a re-render of the screen
	  to update what the user sees. 
	  
	  This is an incremental update so it's only updating HTML that actually changed
	  as opposed to recreating/updating all of the HTML. This is what makes this so
	  fast to operate. 
	**/
    this.setState({ username: e.target.value });
  }
  
  //Render function
  /**
    This is automatically called when JSX is rendered into the page. Each instance will
	trigger this. 
	
	This JSX will get converted to HTML and displayed on the page where intended. 
  **/
  render() {
    return (
      <div>
        Hello {this.state.username}
        <p>Change Name:</p>
        <input type="text" value={this.state.username} onChange={this.handleNameChange} />
      </div>
    );
  }
}

//ReactDOM.render allows us to 'render' React components
//to the page. 
/**
  ReactDOM.render will generate or update HTML on the page
  very quickly with the new structure given.

  The first argument is the JSX to render to the page
  and all subsequent JSX elements. The JSX will be 
  converted into normal valid HTML. 

  The second argument is where on the page to add it.

  In this example, we are adding a <HelloUser /> JSX
  tag to the app div. Since <HelloUser /> is JSX, 
  it will get converted to HTML by calling the HelloUser
  function. That function will give back
  the HTML for the this element (or more JSX that will
  also be converted to HTML).
**/
const init = () => {
  ReactDOM.render(
    <HelloUser username='Cody' />,
    document.getElementById('app')
  );
};

window.onload = init;