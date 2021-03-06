// import React from "react";
// import {render} from "react-dom";

// import { User } from './components/User';
// import { Main } from './components/Main';

// class App extends React.Component {
//     constructor() {
//         super();
//         this.state = {
//             username: "Max"
//         };
//     }

//     changeUsername(newName) {
//         this.setState({
//             username: newName
//         });
//     }

//     render() {
//         return (
//             <div className="container">
//                 <Main changeUsername={this.changeUsername.bind(this)}/>
//                 <User username={this.state.username}/>
//             </div>
//         );
//     }
// }

// render(<App />, window.document.getElementById('app'));



import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from 'redux-logger'

const userReducer = (state = {
    name: "Max",
    age: "27"
}, action) => {
    switch (action.type) {
        case "SET_NAME":
            state = {
                ...state,
                name: action.payload
            }
            break;

        case "SET_AGE":
            state = {
                ...state,
                age: action.payload
            }
            break;
    }

    return state;
};

const mathReducer = (state = {
    result: 1,
    lastValues: []
}, action) => {
    switch (action.type) {
        case "ADD":
            state = {
                ...state,
                result: state.result + action.payload,
                lastValues: [...state.lastValues, action.payload]
            }
            break;

        case "SUBTRACT":
            state = {
                ...state,
                result: state.result - action.payload,
                lastValues: [...state.lastValues, action.payload]
            }
            break;
    }

    return state;
};


// Custom logger
//
// const myLogger = (store) => (next) => (action) => {
//     console.log("Logged Action ", action);
//     next(action);
// }
//const store = createStore(combineReducers({mathReducer, userReducer}), {}, applyMiddleware(myLogger));

// Using the redux-logger logger
const store = createStore(combineReducers({mathReducer, userReducer}), {}, applyMiddleware(createLogger()));

store.subscribe(() => {
    //console.log('store updated', store.getState());
});

store.dispatch({
    type: "ADD",
    payload: 4
})


store.dispatch({
    type: "ADD",
    payload: 100
});

store.dispatch({
    type: "SUBTRACT",
    payload: 40
});

store.dispatch({
    type: "SET_NAME",
    payload: "henry"
});

store.dispatch({
    type: "SET_AGE",
    payload: 18
});
