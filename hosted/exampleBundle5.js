'use strict';

var songState = {
  songs: []
};

var SongContainer = function SongContainer(props) {
  if (props.songs.length === 0) {
    return React.createElement(
      'div',
      null,
      React.createElement(
        'h3',
        null,
        'No Songs Yet!'
      )
    );
  }

  var songList = props.songs.map(function (song) {
    return React.createElement(Song, { artist: song.artist, songTitle: song.title });
  });

  return React.createElement(
    'div',
    null,
    React.createElement(
      'h1',
      null,
      ' My favoritest songs ever!!@! '
    ),
    songList
  );
};

var loadSongsFromServer = function loadSongsFromServer() {
  var xhr = new XMLHttpRequest();

  var setSongs = function setSongs() {
    var songResponse = JSON.parse(xhr.response);

    songState.songs = songResponse;

    ReactDOM.render(React.createElement(SongContainer, { songs: songState.songs }), document.getElementById('app'));
  };

  xhr.onload = setSongs;

  xhr.open('GET', '/getSongs');

  xhr.send();
};

var Song = function Song(props) {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'h2',
      null,
      props.artist,
      ' ',
      React.createElement(
        'i',
        null,
        props.songTitle
      )
    )
  );
};

Song.propTypes = {
  artist: PropTypes.string.isRequired,
  songTitle: PropTypes.string.isRequired
};

var init = function init() {
  ReactDOM.render(React.createElement(SongContainer, { songs: [] }), document.getElementById('app'));

  loadSongsFromServer();
};

window.onload = init;
