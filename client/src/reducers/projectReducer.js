import { EDIT_PROJECT } from '../actions/types'

const initialState = {
    editProject: null
}

export default (state = initialState, action) => {

    switch(action.type){
        case EDIT_PROJECT:
            return {
                ...state,
                editProject: action.payload
            }
        default:
            return state
    }

}