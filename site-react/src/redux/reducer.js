import { ACTIONS_TYPES } from "./actions.js";

const rootReducer = (state, action) => {
    state = { password: "" };
    switch (action.type) {
        case ACTIONS_TYPES.UPDATE:
            return {
                ...state,
                ...action.payload,
            };
        case ACTIONS_TYPES.GET_TOKEN:
            return {
                ...state,
                ...action.payload,
            };

        default:
            return state;
    }
};

export default rootReducer;
