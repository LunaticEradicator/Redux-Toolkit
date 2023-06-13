import { createRandomSong } from "../data/data";
import { useDispatch, useSelector } from 'react-redux'
import { addSong, removeSong } from '../store/Store.jsx' // Action-Creator 

function SongPlaylist() {
    const songPlaylist = useSelector((state) => {
        return (state.addedSongs)
    });
    const dispatch = useDispatch();

    const handleSongAdd = (song) => {
        const action = addSong(song)
        console.log(dispatch(action));
    };
    const handleSongRemove = (song) => {
        const action = removeSong(song)
        console.log(dispatch(action))
    };

    const renderedSongs = songPlaylist.map((song) => {
        return (
            <li key={song}>
                {song}
                <button
                    onClick={() => handleSongRemove(song)}
                    className="button is-danger"
                >
                    X
                </button>
            </li>
        );
    });

    return (
        <div className="content">
            <div className="table-header">
                <h3 className="subtitle is-3">Song Playlist</h3>
                <div className="buttons">
                    <button
                        onClick={() => handleSongAdd(createRandomSong())}
                        className="button is-link"
                    >
                        + Add Song to Playlist
                    </button>
                </div>
            </div>
            <ul>{renderedSongs}</ul>
        </div>
    );
}

export default SongPlaylist;
