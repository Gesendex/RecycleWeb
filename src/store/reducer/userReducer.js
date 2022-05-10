const initState = {
    user: null
}
const SetUser = 'SetUser'
const RemoveUser = 'RemoveUser'

export const userReducer = (state = initState, action) => {
    switch (action.type) {
        case SetUser: {
            state = {...state, user: action.payload};
            break
        }
        case RemoveUser: {
            state = {...state, user: null}
            break
        }

    }
    return state;
}



