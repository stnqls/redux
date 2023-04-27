import { createStore } from "redux";


const reducer = (prevState,action) =>{
        switch (action.type) {
            case 'LOG_IN':
                return {
                    ...prevState,
                    user: action.data,
                }
             case 'LOG_OUT' :
                return {
                    ...prevState,
                    user:null,
                }
            case 'ADD_POST' :
                return {
                     ...prevState,
                    posts:[...prevState.posts,action.data],
                }
            default:
                return prevState;
        }
    
}

const initialState ={
    user: null,
    posts:[]
};

const store = createStore(reducer, initialState);

store.subscribe(() => { 
    console.log("changed")
})

console.log('1st', store.getState());

//actoin 생성자
const logIn = (data) => {
    //action
    return {
        type:'LOG_IN',
        data
    }
}

const logOut = () => {
    //action
    return {
        type:'LOG_OUT',
    }
}

const addPost = (data) => { 
    return {
        type: 'ADD_POST',
        data,
    }
}

console.log('1st',store.getState())
store.dispatch(logIn({
    id: 1,
    name: 'zerocho',
    admin: true,
}));

console.log('2nd',store.getState())

store.dispatch(addPost({
    userId: 1,
    id: 1,
    content: '안녕하세요. 리덕스',
}));


console.log('3rd', store.getState());

store.dispatch(addPost({
    userId: 1,
    id: 2,
    content: '두번째 게시글입니다. 리덕스',
}));


console.log('4th',store.getState());

store.dispatch(logOut())

console.log('5th',store.getState());
