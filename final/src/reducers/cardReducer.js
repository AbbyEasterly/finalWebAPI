import constants from '../constants/actionTypes'

const initialState = {
    cards: []
}

const cardReducer = (state = initialState, action) => {
    let updated = Object.assign({}, state);

    switch (action.type) {
        case constants.FETCH_CARDS:
            updated['cards'] = action.cards || [];
            return updated;
        case constants.SET_CARDS:
            updated['cards'] = action.cards || [];
            return updated;
        default:
            return state;
    }
}

export default cardReducer;
