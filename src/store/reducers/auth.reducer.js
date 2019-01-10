
const initialState = {
    isAuthenticated: false,
    isAdmin: false,
    userData: {}
}
export default (state = initialState, action) => {
    switch(action.type) {
        case 'SET_AUTHENTICATED': 
        return {
            ...state,
            isAuthenticated: true
        }
        case 'SET_UNAUTHENTICATED': 
        return {
            ...state,
            isAuthenticated: false
        }
        break;
        case 'SET_ISADMIN': 
        return {
            ...state,
            isAdmin: action.payload
        }
        break;
        case 'SET_USER_DATA': 
        return {
            ...state,
            userData: action.payload
        }
        break;
        default: break;
    }
    return state;
}