export default (state={ loader : false}, action) => {
    switch(action.type) {
        case 'UI_LOADER': 
        state = {
            ...state,
            loader: action.payload
        }
        break;
        default: break;
    }
    return state;
}