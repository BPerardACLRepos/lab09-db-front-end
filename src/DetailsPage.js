import React from 'react';
import Loading from './Loading.js';
import { deleteGame, updateGame, getCategories, getGame } from './ApiUtils.js';

export default class CreatePage extends React.Component {
    state = {
        name: '',
        max_players: 0,
        min_players: 0,
        expansion: false,
        category_id: 1,
        complete: false,
        categories: [],
        loading: false,
    }

    componentDidMount = async () => {
        await this.fetchGameAndCategories();
    }

    fetchGameAndCategories = async () => {
        this.setState({ loading: true })

        const categoriesData = await getCategories();

        const gameId = this.props.match.params.gameId
        const gameData = await getGame(gameId);

        this.setState({
            name: gameData.name,
            max_players: gameData.max_players,
            min_players: gameData.min_players,
            expansion: gameData.expansion,
            category_id: gameData.category_id,
            categories: categoriesData,
            loading: false,
        });
    }

    handleNameChange = (e) => this.setState({ name: e.target.value })

    handleMaxPlayersChange = (e) => this.setState({ max_players: Number(e.target.value) })

    handleMinPlayersChange = (e) => this.setState({ min_players: Number(e.target.value) })

    handleExpansionChange = () => {
        this.setState({
            expansion: !this.state.expansion
        })
    }

    handleCategoryChange = (e) => this.setState({
        category_id: Number(e.target.value),
    })


    handleUpdateGame = async (e) => {
        e.preventDefault();

        const gameId = this.props.match.params.gameId
        await updateGame(gameId, this.state);

        this.props.history.push('/');

    }

    handleDeleteGame = async (e) => {
        e.preventDefault();

        const gameId = this.props.match.params.gameId
        await deleteGame(gameId);

        this.props.history.push('/');

    }

    render() {
        return (
            <div>
                {this.state.loading && <Loading />}
                {!this.state.loading &&
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            <p>Game Name</p>
                            <input value={this.state.name} onChange={this.handleNameChange} />
                        </label>
                        <label>
                            <p>Maximum Players</p>
                            <input value={this.state.max_players} type="number" onChange={this.handleMaxPlayersChange} />
                        </label>
                        <label>
                            <p>Minimum Players</p>
                            <input value={this.state.min_players} type="number" onChange={this.handleMinPlayersChange} />
                        </label>
                        <label>
                            Check box if this is an expansion
                    <input value={this.state.expansion} type="checkbox" onChange={this.handleExpansionChange} checked={this.state.expansion} />
                        </label>
                        <label>
                            <select value={this.state.category_id} onChange={this.handleCategoryChange}>
                                {this.state.categories.map(category =>
                                    <option value={category.id}
                                        key={category.id}>
                                        {category.category}
                                    </option>
                                )}
                            </select>
                        </label>
                        <button onClick={this.handleUpdateGame}>Update Game</button>
                        <div className="warning">
                            <button onClick={this.handleDeleteGame}>Delete Game</button>
                        </div>
                    </form>
                }
            </div>
        )
    }
}