import { State } from "react-native-gesture-handler";

const initialState = {user: {
    nickname:'',
    token:'',
    id:'',
    },
    isLoggedIn: false,
    hosts: {
        available : [],
        unknown: [],
        unavailable: [],
        system: [],
        network: []
    },
    problems: {
        warning: [],
        average: [],
        high: [],
        disaster: []
    }
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
        case 'UPDATE_HOSTS':
            nextState= {
                ...state, hosts: action.value
            }
            return nextState;
        case 'UPDATE_PROBLEMS':
            nextState= {
                ...state, problems : action.value
            }
            return nextState;
        default:
            return state;
    }
}

export default userInfo;