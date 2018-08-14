import React from 'react'
import PropTypes from 'prop-types'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

import EditProjectComponent from './add-project'
import EditSlideComponent from './new-slide'
import SlidePreviewComponent from './slide-preview'

import Grid from '@material-ui/core/Grid'
import { withStyles, Icon } from '@material-ui/core'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add'
import green from '@material-ui/core/colors/green'

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import './css/global.css'

import { updateProjectSlideMutation } from './graphql/mutations'
import { justify_align_center, site_text_color } from './css/global';
import { toast } from 'react-toastify';

import { connect } from 'react-redux'


const styles = theme => ({

    topPageStyles: {
        alignItems: 'center'
    },
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    tableHead: {
        background: theme.palette.common.black,
        color: theme.palette.common.white
    },
    icon: {
        margin: theme.spacing.unit,
        fontSize: 32,
        '&:hover': {
            cursor: 'pointer'
        }
    },
    button: {
        margin: theme.spacing.unit,
    },
    justifyAlignCenter: justify_align_center,
    siteTextColor: site_text_color,
    createButton: {
        color: 'white',
        backgroundColor: green[700],
        '&:hover': {
            backgroundColor: green[900],
        }
    },

})

const deleteSlideMutation = gql`
    mutation( 
        $title: String!, 
        $implemented_functionality: String, 
        $image_path: String!, 
        $description: String!, 
        $projectId: String!){

            deleteProjectSlide(
                title: $title,
                implemented_functionality: $implemented_functionality,
                image_path: $image_path,
                description: $description,
                projectId: $projectId
            ){
                title
                implemented_functionality
                image_path
                description
            }
    }`

// Mutation to add a newly created project
const updateProjectMutation = gql`
    mutation($id:ID!, $title: String!, $description: String!, $implementation_details: String!){
        updateProject( id: $id,
                        title: $title, 
                        description: $description, 
                        implementation_details: $implementation_details
                    ){
                        id,
                        title,
                        description,
                        implementation_details,
                        slides {
                            title,
                            implemented_functionality,
                            image_path
                        }
                    }
    }
`

class EditProject extends React.Component {

    state = {
        project: null,
        editSlide: null,
        editingSlideIndex: null,
        newSlide: false,
        isSlideOperation: false,
        viewSlide: null
    }

    componentWillMount() {

        this.setState({ project: this.props.editProject })

    }

    editSlide = (editSlide, editingSlideIndex) => {
        
        this.setState({
            editSlide,
            editingSlideIndex,
            oldSlide: editSlide,
            isSlideOperation: true
        })

    }

    viewSlide = viewSlide => {

        this.setState({
            viewSlide
        })

    }

    isNewSlide = () => {

        const { oldSlide, newSlide } = this.state

        return oldSlide.image_path !== newSlide.image_path

    }

    updateSlide = (slide) => {

        // Run mutation to update the project slides`
        const { project, editingSlideIndex } = this.state;

        let oldSlide = ''

        if(this.isNewSlide()){
            oldSlide = this.state.oldSlide
        }

        this.props.updateProjectSlide({
            variables: {
                oldSlide,
                editingSlideIndex,
                projectId: project.id,
                ...slide
            },
            update: (store, { data, data: { updateProjectSlide } }) => {

                const slides = updateProjectSlide

                this.setState({

                    "project": {
                        ...project,
                        slides
                    },
                    editSlide: null,
                    newSlide: false,
                    isSlideOperation: false
                })

            }
        })

    }

    newSlide = () => {

        this.setState({
            newSlide: true,
            isSlideOperation: true
        })

    }

    deleteSlide = (slide, project) => {

        this.props.deleteSlideMutation({
            variables: {
                ...slide,
                projectId: project.id
            },
            update: async (store, { data: { deleteProjectSlide } }) => {

                // Note the result of the operation returns a new set of slides 

                let { project } = this.state

                const modifiedProject = {
                    ...project,
                    slides: deleteProjectSlide
                }

                this.setState({ project: modifiedProject })

            }
        })

    }

    updateProject = (formObject) => {

        // Use graphql tag to send a mutation query
        this.props.updateProject({
            variables: {
                ...formObject
            },
            update: (store, { data: { updateProject } }) => {

                if (!updateProject.hasOwnProperty('id')) {

                    // Display error notification
                    toast.error("Operation failed");

                    return;

                }

                this.setState({ project: updateProject })

                toast.success("Operation successful")

            }
        })

    }

    hideSlidePreview = viewSlide => {

        this.setState({
            viewSlide
        })

    }

    render() {

        const { classes } = this.props

        const {
            project,
            editSlide,
            newSlide,
            isSlideOperation,
            viewSlide
        } = this.state

        return (
            <div className="projectComponent">

                <Grid container spacing={0}>

                    {/* Project to edit is passed into component and rendered */}
                    <Grid item xs={12} sm={12} md={12}>

                        <EditProjectComponent editProject={project} updateProject={this.updateProject} />

                    </Grid>

                    {/* Project slides are displayed in tabular form */}
                    {!isSlideOperation &&
                        <Grid item xs={12} sm={12} md={12} style={{ marginTop: '20px' }}>

                            <Grid container spacing={0}>
                                <Grid item md={6} style={{ display: 'flex', alignItems: 'center' }}>
                                    <h3 className={`${classes.justifyAlignCenter} ${classes.siteTextColor}`}>
                                        SLIDES
                                    </h3>
                                </Grid>
                                <Grid item md={6}>
                                    {/* New slide button */}
                                    <Button variant="raised"
                                        size='small'
                                        className={`${classes.button} ${classes.createButton}`}
                                        onClick={() => this.newSlide()}>
                                        <AddIcon className={classes.icon} /> New Slide
                                    </Button>
                                </Grid>
                            </Grid>

                            <Paper className={classes.root}>
                                <Table className={classes.table}>
                                    <TableHead className={classes.tableHead}>
                                        <TableRow>
                                            <TableCell style={{ color: 'inherit' }}>S/No.</TableCell>
                                            <TableCell style={{ color: 'inherit' }}>Slide title</TableCell>
                                            <TableCell style={{ color: 'inherit' }}>Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {(project.slides.length > 0) && project.slides.map((slide, index) => {
                                            return (
                                                <TableRow key={index}>

                                                    <TableCell component="th" scope="row">
                                                        {index + 1}
                                                    </TableCell>

                                                    <TableCell>{slide.title}</TableCell>

                                                    <TableCell>

                                                        <Icon
                                                            className={classes.icon}
                                                            onClick={() => this.viewSlide(slide)}>
                                                            visibility
                                                        </Icon>

                                                        <EditIcon
                                                            className={classes.icon}
                                                            onClick={() => this.editSlide(slide, index)} />


                                                        <DeleteIcon
                                                            className={`${classes.icon} bg-red`}
                                                            onClick={() => this.deleteSlide(slide, project)} />

                                                    </TableCell>

                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </Paper>

                        </Grid>
                    }

                    {/* Block below is displayed if editing a slide  */}
                    {
                        isSlideOperation &&

                        <Grid item xs={12} sm={12} md={12} style={{ marginTop: "20px" }}>

                            <EditSlideComponent
                                updateSlide={this.updateSlide}
                                editSlide={editSlide}
                                newSlide={newSlide} />

                        </Grid>

                    }

                    {/* Displayed if previewing a slide */}
                    {
                        viewSlide &&

                        <SlidePreviewComponent
                            slide={viewSlide}
                            slidePreviewClosed={previewState => this.hideSlidePreview(previewState)} />
                    }

                </Grid>

            </div>
        )

    }

}

EditProject.propTypes = {
    editProject: PropTypes.object.isRequired
}

const mapStateToProps = ({ project }) => ({

    editProject: project.editProject

})

export default compose(graphql(deleteSlideMutation, { name: "deleteSlideMutation" }),
    graphql(updateProjectSlideMutation, { name: "updateProjectSlide" }),
    graphql(updateProjectMutation, { name: 'updateProject' })
)(withStyles(styles)( connect( mapStateToProps )(EditProject) ))