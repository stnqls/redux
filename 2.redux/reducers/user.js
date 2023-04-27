// export const userReducer = (prevState, action) => {
//         switch (action.type) {
//             case 'LOG_IN':
//                 return {
//                     ...prevState,
//                     user: action.data,
//                 }
//              case 'LOG_OUT' :
//                 return {
//                     ...prevState,
//                     user:null,
//                 }
//             default:
//                 return prevState;
//         }
    
// }

const initialState = {
    isLoggingIn:true,
    data:null,
}

const userReducer = (prevState=initialState, action) => {
        switch (action.type) {
            case 'LOG_IN':
                return {
                    ...prevState,
                    data: action.data,
                    isLoggingIn:true,
                }
             case 'LOG_OUT' :
                return {
                    ...prevState,
                    data: null,
                    isLoggingIn: false,
                }
            default:
                return prevState;
        }
    
}

module.export = userReducer;