import gql from 'graphql-tag'

const updateProjectSlideMutation = gql`
    mutation( 
        $projectId: ID!, 
        $oldSlide: String,
        $editingSlideIndex: Int!,
        $title: String!, 
        $description: String!, 
        $image_path: String!
    ){
            updateProjectSlide(
                projectId: $projectId, 
                oldSlide: $oldSlide,
                editingSlideIndex: $editingSlideIndex, 
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