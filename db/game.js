const db = require('./index');



const CREATE_GAME = 'INSERT INTO games(room_name, status, current_turn, last_hand) VALUES($1, $2, $3, $4) ';
const DELETE_GAME = 'DELETE FROM games WHERE game_id=$1';
const CHANGE_STATUS = 'UPDATE games SET status=$1 WHERE game_id=$2';
const AVAILABLE_GAMES = 'SELECT * FROM games WHERE status=\'open\'';
const FIND_GAME_BY_ID = 'SELECT * FROM games WHERE game_id=$1';
const FIND_GAME_BY_NAME = 'SELECT * FROM games WHERE room_name=$1';
const UPDATE_LAST_HAND = 'UPDATE games SET last_hand=$1 WHERE game_id=$2';
const UPDATE_CURRENT_TURN = 'UPDATE games SET current_turn=$1 WHERE game_id=$2 ';
const UPDATE_GAME_POT = 'UPDATE games SET game_pot=$1 WHERE game_id=$2 ';
const GET_GAME_POT = 'SELECT game_pot FROM games WHERE game_id=$1 ';
const UPDATE_CARDS_PLAYED = 'UPDATE games SET cards_played=$1 WHERE game_id=$2 ';
const GET_CARDS_PLAYED = 'SELECT cards_played FROM games WHERE game_id=$1 ';

const GET_GAME_STATE = 'SELECT game_state FROM games WHERE game_id=$1';
const UPDATE_GAME_STATE = 'UPDATE games SET game_state=$1 WHERE game_id=$2 ';
const GET_SEATS_TAKEN = 'SELECT seats_taken FROM games WHERE game_id=$1';
const UPDATE_SEATS_TAKEN = 'UPDATE games SET seats_taken=$1 WHERE game_id=$2 RETURNING seats_taken';
const GET_COMMUNITY = 'SELECT community FROM games WHERE game_id=$1 ';
const UPDATE_COMMUNITY = 'UPDATE games SET community=$1 WHERE game_id=$2';

const getGameState = (gameid) =>{
    return db.one(GET_GAME_STATE, gameid);
}

const updateGameState = (state, gameid) => {
    return db.one(UPDATE_GAME_STATE, [state, gameid]);
}

const getSeatsTaken = (gameid) => {
    return db.one(GET_SEATS_TAKEN, gameid);
};

const updateSeatsTaken = (seats, gameid) => {
    return db.one(UPDATE_SEATS_TAKEN, [seats, gameid]);
}

const getCommunity = (gameid) => {
    return db.one(GET_COMMUNITY, gameid);
}

const updateCommunity = (community, gameid) => {
    return db.one(UPDATE_COMMUNITY, [community, gameid]);
}


    const create = (room_name, current_turn) => {
        const tmpArr = [room_name, 'open', current_turn, 1];
        return db.one(CREATE_GAME, tmpArr);
    }

    const deleteGame = (gameId) => {
        return db.none(DELETE_GAME, gameId);
    }

    const changeStatus = (status, gameId) => {
        return db.any(CHANGE_STATUS, [status, gameId]);
    }

    const availableGames = (status) =>  {
        return db.any(AVAILABLE_GAMES);
    }

    const findGameById = (id) => {
        return db.one(FIND_GAME_BY_ID, id);
    }

    const findGameByName = (room_name) => {
        return db.one( FIND_GAME_BY_NAME, room_name );
    }

    const updateLastHand = (handid, gameid) => {
        return db.none( UPDATE_LAST_HAND, [handid, gameid] );
    }

    const updateCurrentTurn = (userid, gameid) => {
        return db.one( UPDATE_CURRENT_TURN, [userid, gameid] );
    }

    const updateGamePot = (gamepot, gameid) => {
        return db.one(UPDATE_GAME_POT, [gamepot, gameid]);
    }

    const getGamePot = (gameid) => {
        return db.one(GET_GAME_POT, gameid);
    }

    const updateCardsPlayed = (cardsplayed, gameid) => {
        return db.one(UPDATE_CARDS_PLAYED, [cardsplayed, gameid]);
    }

    const getCardsPlayed = (gameid) => {
        return db.one(GET_CARDS_PLAYED, gameid);
    }



module.exports = {
    create,
    deleteGame,
    changeStatus,
    availableGames,
    findGameById,
    findGameByName,
    updateLastHand,
    updateCurrentTurn,
    updateGamePot,
    getGamePot,
    updateCardsPlayed,
    getCardsPlayed,
    getGameState,
    getCommunity,
    getSeatsTaken,
    updateGameState,
    updateCommunity,
    updateSeatsTaken
}
