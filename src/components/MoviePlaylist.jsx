import { createRandomMovie } from "../data/data";
import { addMovie, removeMovie } from "../store/Store";
import { useSelector, useDispatch } from "react-redux";

function MoviePlaylist() {
    const dispatch = useDispatch()
    const moviePlaylist =
        // JSON.parse(localStorage.getItem(
        useSelector((state) => { // get the added state
            return state.addedMovie
        })
    // ||
    // [])
    // )

    const handleMovieAdd = (movie) => {
        const action = addMovie(movie)
        dispatch(action)
    };
    const handleMovieRemove = (movie) => {
        const action = removeMovie(movie)
        dispatch(action)
    };

    const renderedMovies = moviePlaylist.map((movie) => {
        return (
            <li key={movie}>
                {movie}
                <button
                    onClick={() => handleMovieRemove(movie)}
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
                <h3 className="subtitle is-3">Movie Playlist</h3>
                <div className="buttons">
                    <button
                        onClick={() => handleMovieAdd(createRandomMovie())}
                        className="button is-link"
                    >
                        + Add Movie to Playlist
                    </button>
                </div>
            </div>
            <ul>{renderedMovies}</ul>
        </div>
    );
}

export default MoviePlaylist;
