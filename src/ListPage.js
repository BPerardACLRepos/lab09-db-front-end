import React from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading.js';
import { getBoardGames, getCategories } from './ApiUtils.js';
import './App.css';

export default class ListPage extends React.Component {

    state = {
        loading: false,
        board_games: [],
        categories: [],
    }

    componentDidMount = async () => {
        await this.fetchGamesAndCategories();
    }

    fetchGamesAndCategories = async () => {

        this.setState({ loading: true });

        const boardGameData = await getBoardGames();

        const categoriesData = await getCategories();

        this.setState({
            loading: false,
            board_games: boardGameData,
            categories: categoriesData,
        });
    }

    render() {

        return (
            <div className="main">
                {this.state.loading && <Loading />}
                {this.state.board_games.map(game =>
                    <Link to={`/details/${game.id}`} key={game.id}>
                        <div className="game">
                            <h2>{game.name}</h2>
                            <p>{`${game.min_players}-${game.max_players} players`}</p>
                            <p>Type: {game.category}</p>
                            <p>{game.expansion ? 'This is an expansion pack.'
                                : 'This is a base game.'}</p>
                        </div>
                    </Link>
                )}
            </div>
        );
    }
}