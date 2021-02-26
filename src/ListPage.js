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
        filtered_games: [],
        category: 'all',

    }

    componentDidMount = async () => {
        await this.fetchGamesAndCategories();
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevState.category !== this.state.category) {
            if (this.state.category === 'all') {
                this.setState({ filtered_games: this.state.board_games });
            } else {
                this.setState({ filtered_games: this.state.board_games.filter(game => game.category === this.state.category) });
            }
        }
    }

    fetchGamesAndCategories = async () => {

        this.setState({ loading: true });

        const boardGameData = await getBoardGames();

        const categoriesData = await getCategories();

        this.setState({
            loading: false,
            board_games: boardGameData,
            filtered_games: boardGameData,
            categories: [...categoriesData, {
                id: 0,
                category: 'all'
            }],
        });
    }

    handleCategoryChange = (e) => {
        this.setState({ category: e.target.value });
    }

    render() {

        const renderGames = this.state.filtered_games.map(game =>
            <Link to={`/details/${game.id}`} key={game.id} className>
                <div className="game">
                    <h2>{game.name}</h2>
                    <p>{`${game.min_players}-${game.max_players} players`}</p>
                    <p>Type: {game.category}</p>
                    <p>{game.expansion ? 'This is an expansion pack.'
                        : 'This is a base game.'}</p>
                </div>
            </Link>
        );

        return (
            <div>
                <label className="filter">
                    <p>Filter Game Category</p>
                    <select value={this.state.category} onChange={this.handleCategoryChange}>
                        {this.state.categories.map(category =>
                            <option value={category.category}
                                key={category.id}>
                                {category.category}
                            </option>
                        )}
                    </select>
                </label>
                <div className="main">
                    {this.state.loading && <Loading />}
                    {!this.state.loading && renderGames}
                </div>
            </div>
        );
    }
}