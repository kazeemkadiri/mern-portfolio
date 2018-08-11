import gql from 'graphql-tag'

const updateProjectSlideMutation = gql`
    mutation( $projectId: ID!, $title: String!, $description: String!, $image_path: String! ){
        addProjectSlide(
            projectId: $projectId, 
            title: $title,
            image_path: $image_path,
            description: $description
        ){
            title,
            description,
            image_path
        }

    }
`
export { updateProjectSlideMutation }