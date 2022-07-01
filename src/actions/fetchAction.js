import store from '../store'

export const fetch_post = () => {
    return {
        type: "FETCH_USER"
    }
}

export const receive_post = () => {
    return {
        type: "FETCHED_USER",
    }
}

export const receive_error = () => {
    return {
        type: "RECEIVE_ERROR"
    }
}

export const thunk_action_creator = () => {
    store.dispatch(fetch_post());
    return function(dispatch, getState) {
        // dispatch
        // async
        // return
        // isFetch
    }
}
export const thunk_action_creator2 = () => {
    store.dispatch(receive_post());
    return function(dispatch, getState) {
    }
}
export const thunk_action_creator3 = () => {
    store.dispatch(receive_error());
    return function(dispatch, getState) {
    }
}