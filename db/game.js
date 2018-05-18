const db = require('./index');


const CREATE_GAME = 'INSERT INTO games(room_name, status, current_turn, last_hand) VALUES($1, $2, $3, $4) RETURNING *'
const DELETE_GAME = 'DELETE FROM games WHERE game_id=$1'
const CHANGE_STATUS = 'UPDATE games SET status=$1 WHERE game_id=$2'
const AVAILABLE_GAMES = 'SELECT * FROM games WHERE status=\'open\''
const FIND_GAME_BY_ID = 'SELECT * FROM games WHERE game_id=$1'
const FIND_GAME_BY_NAME = 'SELECT * FROM games WHERE room_name=$1'
const UPDATE_LAST_HAND = 'UPDATE games SET last_hand=$1 WHERE game_id=$2'
const UPDATE_CURRENT_TURN = 'UPDATE games SET current_turn=$1 WHERE game_id=$2 RETURNING *'


    const create = (room_name, current_turn) => {
        const tmpArr = [room_name, 'open', current_turn, 1]
        return db.one(CREATE_GAME, tmpArr);
    }

    const availableGames = (status) =>  {
        return db.any(AVAILABLE_GAMES);
    }

    const findGameById = (id) => {
        return db.one(FIND_GAME_BY_ID, id)
    }


    const changeStatus = (status, gameId) => {
        return db.any(CHANGE_STATUS, [status, gameId])
    }


    const deleteGame = (gameId) => {
        return db.none(DELETE_GAME, gameId)
    }


    const findGameByName = (room_name) => {
        return db.one( FIND_GAME_BY_NAME, room_name )
    }

    const updateLastHand = (handid, gameid) => {
        return db.none( UPDATE_LAST_HAND, [handid, gameid] )
    }

    const updateCurrentTurn = (userid, gameid) => {
        return db.one( UPDATE_CURRENT_TURN, [userid, gameid] )
    }



module.exports = {
    create,
    availableGames,
    findGameById,
    changeStatus,
    deleteGame,
    findGameByName,
    updateLastHand,
    updateCurrentTurn
}
