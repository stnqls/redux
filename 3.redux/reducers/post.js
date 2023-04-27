// export const postReducer = (prevState, action) => {
//         switch (action.type) {
//             case 'ADD_POST' :
//                 return {
//                     posts:[...prevState,action.data],
//                 }
//             default:
//                 return prevState;
//         }
    
// }

const initialState = [];

const postReducer = (prevState = initialState, action) => {
        switch (action.type) {
            case 'ADD_POST' :
                return [...prevState,action.data]
                
            default:
                return prevState;
        }
    
}

module.export = postReducer;