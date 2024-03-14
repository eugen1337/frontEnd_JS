const action = () => {
    return { type: "", payload: {} };
};

export const ACTIONS_TYPES = {
    UPDATE: "update",
    GET_TOKEN: "get_token",
};

export const ACTIONS_CREATORS = {
    UPDATE: (field, value) => {
        let a = action();
        a.type = ACTIONS_TYPES.UPDATE;
        a.payload[field] = value;
        return a;
    },

    GET_TOKEN: (field, value) => {
        let a = action();
        a.type = ACTIONS_TYPES.GET_TOKEN;
        a.payload[field] = value;
        return a;
    },
};
