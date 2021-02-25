import React from 'react';
import request from 'superagent';
import Loading from './Loading.js';

export default class ListPage extends React.Component {

    state = {
        loading: false,
    }

    componentDidMount = async () => {
        this.state.loading = true;

        await this.fetchGames();
    }

    componentDidUpdate = async (prevProps, prevState) => {
        // Render new pokemon on page change
        if (prevState.currentPage !== this.state.currentPage) {
            await this.fetchPokemon();
        }
    }

    fetchPokemon = async () => {

        this.setState({ loading: true });

        const pokeapiData = await request.get(`https://pokedex-alchemy.herokuapp.com/api/pokedex?page=${this.state.currentPage}&perPage=${this.state.pokemonPerPage}`);

        this.setState({
            loading: false,
            pokemonArray: pokeapiData.body.results,
            totalPokemon: pokeapiData.body.count,
        });
    }

    handleNextPageClick = () => {
        this.setState({
            currentPage: this.state.currentPage + 1
        });
    }

    handlePreviousPageClick = () => {
        this.setState({
            currentPage: this.state.currentPage - 1
        });
    }

    render() {

        const {
            pokemonArray,
            loading,
        } = this.state;

        const lastPage = Math.ceil(this.state.totalPokemon / this.state.pokemonPerPage);

        return (
            <div className="body">
                {this.state.loading && <Loading />}
            </div>
        );
    }
}