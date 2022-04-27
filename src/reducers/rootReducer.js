const initState = {
    quotes: []
};

const rootReducer = (state = initState, action) => {
    switch (action.type) {
        case 'app/load':
            return {
                quotes: action.payload
            }
        case 'quote/add':
            return {
                ...state,
                quotes: [...state.quotes, action.payload]
            }
        case 'quote/edit':
            return {
                ...state,
                quotes: [
                    ...state.quotes,
                    action.payload
                ]
            }
        case 'quote/delete':
            return {
                ...state,
                quotes: action.payload
            }
        default:
            return state
    }
}

export default rootReducer;