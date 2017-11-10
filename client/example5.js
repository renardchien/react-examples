//Function to 'Render' for our SongContainer React Component
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
class SongContainer extends React.Component {
  //constructor will accept attributes from the JSX that made it
  /**
    If an instance of this class is created with the JSX
	<SongContainer songs={[{artist: 'T swift', song: 'trouble'}]} />
	
	Then the props field that comes in will have a songs
	field on it with the array containing objects with artist and song.
	
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
      songs: props.songs
    }; 
	
    //Given the scoping of React components, we need to bind each method
	//of this class to the current scope. Otherwise, the class's scope and
	//React's scope will not align. This is a weird quirk of using class components.
    this.loadSongsFromServer = this.loadSongsFromServer.bind(this);
	
	//triggering a call on creation to start downloading data from the server
	//and re-render if needed. 
    this.loadSongsFromServer();
  }
  
  //method to update our song list with an API call to the server
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
  loadSongsFromServer () {    
    const xhr = new XMLHttpRequest(); //new ajax request
  
    //function to parse the response and set the song container's state.
    const setSongs = () => {
	  //parse response from server into JSON
      const songResponse = JSON.parse(xhr.response);

	  //update our state with the songs from the server to re-render
	  //remember that calling setState triggers a re-render if the data on screen changes
	  //It is an incremental change so it's only the stuff that actually changed.
      this.setState({ songs: songResponse });
    };

	//set the ajax's onload function
    xhr.onload = setSongs;

	//set request to /getSongs
    xhr.open('GET', '/getSongs');

	//send request
    xhr.send();
  }
 
  //Render function
  /**
    This is automatically called when JSX is rendered into the page. Each instance will
	trigger this. 
	
	This JSX will get converted to HTML and displayed on the page where intended. 
  **/  
  render() {
	//check if we have any songs
	//checks our song array in our state
	//if not we will return a custom div and message
    if(this.state.songs.length === 0) {
      return (
        <div>
          <h3>No Songs Yet!</h3>
        </div>
      );
    }

	//For each song, create a <Song> component and pass in props of the artist and songTitle. 
	//This will trigger the <Song> components to create HTML
	/**
	Inside of JSX, curly braces will replace the variable with its value or function call. This allows us to dynamically drop values into our JSX.

	The .map function loops through an array
	and generates a different array based on the return values.

	In this case, for each song, we create a div with the artist and title and return it (thus adding it) to the songList array
	**/
    const songList = this.state.songs.map((song) => {
      return (
        <Song artist={song.artist} songTitle={song.title} />
      );
    });

	//return our song container JSX for the page
	//This will show the div and h1, then replace
	//{songList} with the divs created above.
	//The curly braces in JSX let us drop in a variable or function call and put in its value.
    return (
      <div>
        <h1> My favoritest songs ever!!@! </h1>
        {songList}
      </div>
    )
  }
}

//Function to 'Render' for our Song React Component
/**
  Refer to notes for SongContainer for how it works
**/
//React - class Component
// Extends the React.Component class
class Song extends React.Component {  
  //constructor will accept attributes from the JSX that made it
  constructor(props) {
    super(props);
  }

  //Render function
  /**
    This is automatically called when JSX is rendered into the page. Each instance will
	trigger this. 
	
	This JSX will get converted to HTML and displayed on the page where intended. 
	
	We are drawing based on the attributes sent in as props to this Song.
	
	If the Song was made in JSX as <Song artist={'TSwift'} songTitle={'Trouble'} />
	then this.props.artist would be 'TSwift' and the this.props.songTitle would be 'Trouble'
  **/   
  render() {
    return (
      <div>
        <h2>{this.props.artist} <i>{this.props.songTitle}</i></h2>
      </div>
    )
  }
}

/**
  propTypes allows us to specify the variable type of custom
  props passed in from the parent. It will ensure the parent
  provides the correct variables and functions to the child element.
  
  PropTypes allow type checking on a variable.
  Check out prop type options here
  https://facebook.github.io/react/docs/typechecking-with-proptypes.html
**/
Song.propTypes = {
  artist: PropTypes.string.isRequired,
  songTitle: PropTypes.string.isRequired
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
**/
const init = () => {
  ReactDOM.render(
    <SongContainer songs={[]} />,
    document.getElementById('app')
  );
};

window.onload = init;