import { EDIT_PROJECT } from './types'

export const setEditProject = (project) => (dispatch) => {

    dispatch({
        type: EDIT_PROJECT,
        payload: project
    })

}
