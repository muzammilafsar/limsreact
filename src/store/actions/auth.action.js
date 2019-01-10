export const SET_AUTHENTICATED = () => {
    return {
        type: 'SET_AUTHENTICATED'
    }
}
export const SET_UNAUTHENTICATED = () => {
    return {
        type: 'SET_UNAUTHENTICATED'
    }
}
export const SET_USER_DATA = (data) => {
    return {
        type: 'SET_USER_DATA',
        payload: data
    }
}
export const SET_ISADMIN = (data) => {
    return {
        type: 'SET_ISADMIN',
        payload: data
    }
}