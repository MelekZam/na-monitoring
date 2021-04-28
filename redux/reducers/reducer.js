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
        all: [],
        warning: [],
        average: [],
        high: [],
        disaster: []
    },
    listOfUsers: [],
    socket: null,
    connectedUsers: [],
    messages: []
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
        case 'UPDATE':
            nextState= {
                ...state, hosts: action.value.hosts, problems: action.value.problems
            }
            return nextState;
        case 'UPDATE_PROBLEMS':
            nextState= {
                ...state, problems : action.value
            }
            return nextState;
        case 'CONNECT':
            nextState= {
                ...state, socket: action.value
            }
            return nextState;
        case 'ADD_USERS':
            nextState= {
                ...state, listOfUsers: action.value
            }
            return nextState;
        case 'UPDATE_CONNECTED':
            nextState= {
                ...state, connectedUsers: action.value
            }
            return nextState;
        case 'UPDATE_MESSAGES':
            nextState= {
                ...state, messages: [...state.messages, action.value]
            }
            return nextState;
        default:
            return state;
    }
}

export default userInfo;