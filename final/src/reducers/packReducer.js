import constants from '../constants/actionTypes'

let initialState = {
      packs: [],
      selectedPack: null
}

const packReducer = (state = initialState, action) => {
      let updated = Object.assign({}, state);

      switch(action.type) {
            case constants.FETCH_PACKS:
                  updated['packs'] = action.packs || [];
                  updated['selectedPack'] = (action.packs && action.packs.length) ? action.packs[0] : null;
                  return updated;
            case constants.SET_PACKS:
                  updated['selectedPack'] = action.selectedPack;
                  return updated;
            default:
                  return state;
      }
}

export default packReducer;