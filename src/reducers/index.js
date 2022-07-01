

const asyncReducer = (state , action) => {
    switch(action.type) {
        case "FETCH_USER":
    
            return{
                data:'CREATE'
            }
            
        case "FETCHED_USER":
            return{
                data:'EDIT'
            }
            
        case "RECEIVE_ERROR":
            return{
                data:'DELETED'
            }
          
          
        default:
            return {data:'CREATE'};
    }
}

export default asyncReducer