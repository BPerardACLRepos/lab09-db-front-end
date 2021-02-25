import request from 'superagent';

const URL = 'https://vast-shore-83500.herokuapp.com/';

export async function getBoardGames() {
    const response = await request.get(`${URL}/board_games`);

    return response.body;
}

export async function getGame(id) {
    const response = await request.get(`${URL}/board_games/${id}`);

    return response.body;
}

export async function deleteGame(id) {
    const response = await request.delete(`${URL}/board_games/${id}`);

    return response.body;
}

export async function updateGame(id, gameInfo) {
    const response = await request.put(`${URL}/board_games/${id}`)
        .send(gameInfo);

    return response.body;
}

export async function addGame(gameInfo) {
    const response = await request.post(`${URL}/board_games/`)
        .send(gameInfo);

    return response.body;
}

export async function getCategories() {
    const response = await request.get(`${URL}/categories`);

    return response.body;
}

export async function getCategoryId(categoryString) {
    const categories = await getCategories();

    const categoryId = categories.find(category => {
        category.category === categoryString;
    });

    return categoryId.id;
}