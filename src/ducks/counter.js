// change this to true to see test results on the black diamond section.
export const BLACK_DIAMOND = false;

var initialState = {
    futureValues: [],
    currentValue: 0,
    previousValues: []
}

const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
const UNDO = 'UNDO';
const REDO = 'REDO';

export function increment(amt){
    return {
        type: INCREMENT,
        payload: amt
    }
}

export function decrement(amt){
    return{
        type: DECREMENT,
        payload: amt
    }
}

export function undo(){
    return{
        type: UNDO
    }
}

export function redo(){
    return{
        type: REDO
    }
}

function counter(state = initialState, action){
    switch (action.type){
        case INCREMENT:
            return Object.assign({}, state, {
                previousValues: [state.currentValue, ...state.previousValues],
                currentValue: state.currentValue + action.payload
            })
        case DECREMENT:
            return Object.assign({}, state, {
                previousValues: [state.currentValue, ...state.previousValues],
                currentValue: state.currentValue - action.payload
            })
        case UNDO:
            return Object.assign({}, state, {
                futureValues: [state.currentValue, ...state.futureValues],
                currentValue: state.previousValues[0],
                previousValues: state.previousValues.slice(1)
            })
        case REDO: 
            return Object.assign({}, state, {
                futureValues: state.futureValues.slice(1),
                currentValue: state.futureValues[0],
                previousValues: [state.currentValue, ...state.previousValues]
            })
    }
}

export default counter;

