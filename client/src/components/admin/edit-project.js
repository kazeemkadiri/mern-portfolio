import React from 'react'
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
import ViewIcon from '@material-ui/icons/Slideshow';
import AddIcon from '@material-ui/icons/Add'
import green from '@material-ui/core/colors/green'

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import './css/global.css'

import { updateProjectSlideMutation } from './graphql/mutations'
import { justify_align_center, site_text_color } from './css/global';

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
        '&:hover':{
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
    }

`

class EditProject extends React.Component {

    state = {
        project: null,
        editSlide: null,
        newSlide: false,
        isSlideOperation: false,
        viewSlide: null
    }

    componentWillMount() {

        this.setState({ project: this.props.project })

    }

    editSlide = (editSlide) => {

        this.setState({
            editSlide,
            isSlideOperation: true
        })

    }

    viewSlide = viewSlide => {

        this.setState({
            viewSlide
        })

    }

    addSlide = (slide) => {

        // Run mutation to update the project slides`
        const { project, project: { slides } } = this.state;

        this.props.updateProjectSlide({
            variables:{
                projectId: project.id,
                ...slide
            },
            update: (store, { data, data: { updateProjectSlide, addProjectSlide } }) => {

                console.log(data, updateProjectSlide, addProjectSlide)

                const slides = updateProjectSlide || addProjectSlide

               // console.log(slides)

                this.setState({

                    "project": {
                        ...project,
                        slides
                    }

                })

                this.setState({
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

    hideSlidePreview = viewSlide => {

        this.setState({
            viewSlide
        })

    }

    render() {

        const { classes } = this.props

        const { 
            project, 
            editProject, 
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

                        <EditProjectComponent editProject={project} />

                    </Grid>

                    {/* Project slides are displayed in tabular form */}
                    { !isSlideOperation && 
                        <Grid item xs={12} sm={12} md={12}>

                            <Grid container spacing={0}>
                                <Grid item md={6} style={{ display: 'flex', alignItems: 'center' }}>
                                    <h3 className={ `${classes.justifyAlignCenter} ${classes.siteTextColor}` }>
                                        SLIDES
                                    </h3>
                                </Grid>
                                <Grid item md={6}>
                                    {/* New slide button */}
                                    <Button variant="extendedFab" 
                                            size='small'
                                            className={ `${classes.button} ${classes.createButton}` }
                                            onClick = { () => this.newSlide() }>
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
                                        { (project.slides.length > 0) && project.slides.map((slide, index) => {
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
                                                            onClick={() => this.editSlide(slide)} />


                                                        <DeleteIcon
                                                            className={ `${classes.icon} bg-red` }
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

                        <Grid item xs={12} sm={12} md={12}>

                            <h3 className={ classes.siteTextColor }>EDIT SLIDE </h3>

                            <EditSlideComponent 
                                addSlide={ this.addSlide }
                                editSlide={ editSlide }
                                newSlide={ newSlide } />

                        </Grid>

                    }

                    {/* Displayed if previewing a slide */}
                    {
                        viewSlide &&

                        <SlidePreviewComponent 
                            slide={viewSlide} 
                            slidePreviewClosed={ previewState => this.hideSlidePreview(previewState) } />
                    }

                </Grid>

            </div>
                    )
            
                }
            
            }
            
export default compose(graphql(deleteSlideMutation, {name: "deleteSlideMutation" }),
                        graphql(updateProjectSlideMutation, {name: "updateProjectSlide" }),)
                        (withStyles(styles)(EditProject))