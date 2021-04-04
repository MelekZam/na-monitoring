const initialState = {user: {
    nickname:'',
    token:'',
    id:'',
    },
    isLoggedIn: false
}

function userInfo (state= initialState, action) {
    let nextState;
    switch (action.type) {
        case 'LOGIN':
            nextState= {
                ...state, user: action.value, isLoggedIn: true
            }
            return nextState;
        case 'LOGOUT':
            nextState= {
                ...state, user: {
                    nickname:'',
                    token:'',
                    id:'',
                }, isLoggedIn: false
            }
            return nextState;
        default:
            return state;
    }
}

export default userInfo;