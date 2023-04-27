import { createStore } from "redux";


const reducer = (prevState,action) =>{
        switch (action.type) {
            // case 'CHANGE_COMP_A' :
            //     return {
            //         compA:action.data,
            //         compB:123,
            //         compC:null,
            //     }
            case 'CHANGE_COMP_A':
                return {
                    ...prevState,
                    compA: action.data,
                }
             case 'CHANGE_COMP_B' :
                return {
                     ...prevState,
                    compB:action.data,
                }
            case 'CHANGE_COMP_C' :
                return {
                     ...prevState,
                    compC:action.data,
                }
            //type 오타방지
            default:
                return prevState;
        }
    
}

const initialState ={
    compA:'a',
    compB:123,
    compC:null,
};

// const nextState ={
//     compA: action.data,
//     compB:123,
//     compC:null,
// };

// const nextState = {
//     ...initialState,
//     compA: action.data,
// };

const store = createStore(reducer, initialState);

store.subscribe(() => { 
    console.log("changed")
})

console.log('1st', store.getState());

//actoin 생성자

// const changeCompAtoB = {
//     compA:'b',
//     compB:123,
//     compC:null,
// }
// const changeCompAtoC = {
//     compA:'c',
//     compB:123,
//     compC:null,
// }

// 중복작성을 막기위해 함수로 만든다.
const changeCompA = (data) => {
    //action
    return {
        type:'CHANGE_COMP_A',
        data
    }
}

// store.dispatch({
//     type: 'CHANGE_COMP_A',
//     data: 'b'
// })

store.dispatch(changeCompA('b'))

console.log('2nd',store.getState());
