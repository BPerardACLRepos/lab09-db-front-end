import React from 'react';
import Loading from './Loading.js';
import { addGame, getCategories } from './ApiUtils.js';

export default class CreatePage extends React.Component {
    state = {
        name: '',
        max_players: 0,
        min_players: 0,
        expansion: false,
        category_id: 7,
        complete: false,
        categories: [],
        loading: false,
    }

    componentDidMount = async () => {
        await this.fetchCategories();
    }

    fetchCategories = async () => {
        this.setState({ loading: true })
        const categoriesData = await getCategories();

        this.setState({
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


    handleAddGame = async (e) => {
        e.preventDefault();

        await addGame(this.state);

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
                    <input value={this.state.expansion} type="checkbox" onChange={this.handleExpansionChange} />
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
                        <button onClick={this.handleAddGame}>Add Game</button>
                    </form>
                }
            </div>
        )
    }
}