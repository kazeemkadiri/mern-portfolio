import React, { Component } from 'react';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag'
import { Editor } from '@tinymce/tinymce-react';
import { keys } from '../../keys';
import { environment } from '../../environment';
import { extractImageSrc } from '../clients/utils/utils'

import  withStyles  from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Grid from '@material-ui/core/Grid';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import Slide from 'react-reveal/Slide';


import { styles as serviceStyles } from '../clients/global-component-styles/services-styles';
import { site_text_color, justify_align_center } from '../clients/global-component-styles/styles';
import { toast } from 'react-toastify';


const styles = theme => ({

    siteTextColor: site_text_color,
    justifyAlignCenter: justify_align_center,
    topPageStyles:{
        alignItems: "center"
    },
    button: {
        margin: theme.spacing.unit,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    sectionMargin: {
        marginBottom: '1.4rem'
    },
    ...serviceStyles(),
    containerChild: {
        marginLeft: '0% !important'                            
    }
})

const servicePropsTemplate = ` description,
                                service_img,
                                title,
                                id
                            `;

const AddServiceMutation = gql`
    mutation(
             $description: String!, 
             $title: String!,
             $service_img: String!
            ){
        addService(
            title: $title,
            description: $description,
            service_img: $service_img
        ){
            ${servicePropsTemplate}
        }   
    }
`;

const updateServiceMutation = gql`
    mutation(
             $id: ID!,
             $description: String!, 
             $title: String!,
             $service_img: String!,
             $old_service_img: String
            ){
        updateService(
            id: $id,
            title: $title,
            description: $description,
            service_img: $service_img,
            old_service_img: $old_service_img
        ){
            ${servicePropsTemplate}
        }   
    }
`;

const ServiceQuery = gql`
    {
        serviceData {
            id,
            ${servicePropsTemplate}
        }
    }
`;

class Services extends Component{

    constructor() {

        super()

        this.formObject = {
            id:'',
            title: '',
            description: '',
            service_img: ''
        }

        this.state = {
            formObject: this.formObject,
            isEditService: false,
            oldServiceImage: null,
            services: []
        }

    }

    updateFormParametersObject(value, formField) {

        this.setState({
            "formObject": {
                ...this.state.formObject,
                [formField]: value
            }
        }) 

    }

    /**
     * Creates/Saves a new service
     */
    saveService = () => {

        // Send a gql mutation to save bio
        this.props.addService({
            variables: {
                ...this.state.formObject
            },
            update: async (store, { data: { addService } }) => {

                const { services } = this.state

                const newServiceList = [
                    ...services,
                    addService
                ]

                this.setState({
                    services: newServiceList
                })
                
                this.resetServiceForm()

            }
        })


    }

    initialiseServiceDataState = services => {

        this.setState({
            services
        })
        

    }

    setService = (inputService) => {

    }

    resetServiceForm = () => {

        this.setState({
            formObject: this.formObject
        })

    }

    /**
     * @param formObject is passed in service to edit
     */

    editService = formObject => {

        this.setState({ 
            formObject,
            old_service_img: formObject.image_path,
            isEditService: true
         })

         this.scrollToEditServiceForm()

    }

    scrollToEditServiceForm = () => {

        document.querySelector('.new-service-form').scrollIntoView(true)

    }

    /**
     * Updates the service being edited currently
     */
    updateService = () => {

        const { formObject } = this.state

        this.props.updateService(
            {
                variables: {
                    ...formObject
                },
                update: async (store, { data }) => {

                    const { updateService } = data

                    if(!updateService){

                        toast.error("Update Failed")

                        return

                    }

                    toast.success("Update successful")

                    const updatedServicesList = this.state.services.map( service => {

                        if(updateService.id === service.id)
                        return updateService

                        return service

                    })

                    this.setState({ 
                        services: updatedServicesList,
                        isEditService: false
                     })

                }
            }
        )

    }

    componentWillReceiveProps({ serviceData }) {

        if(this.state.services.length > 0) return;

        this.checkAndInitializeServiceData(serviceData)
    }

    componentWillMount() {

        const { serviceData } = this.props

        this.checkAndInitializeServiceData(serviceData)
        
    }

    checkAndInitializeServiceData = (serviceData) => {

        if( (serviceData.error  === undefined) && 
            (!serviceData.loading) &&
            (serviceData.hasOwnProperty("serviceData")) ) {

            this.initialiseServiceDataState(serviceData.serviceData);

        }

    }

    render() {

        const { classes, serviceData: { loading } } = this.props;

        if(loading) return '';

        const { 
            services, 
            isEditService,
            formObject: { 
                title, 
                description, 
                service_img
            }
        } = this.state;


        return (
            <Grid container spacing={0} className={ classes.topPageStyles }>

                    {/* Loop through the existing services and render */}
                    {
                        services.length > 0 &&
                        services.map((service, index) => (
                            <Grid item xs={12} sm={12} md={8} key={ index }>
                                <div className={ classes.containerChild }
                                     key={service.id}>
                                    <Slide left={ index % 2 === 0 } right={ index % 2 === 1 } >
                                        <Card className={ `${classes.card} ${classes.serviceContainer}` }>
                                            <CardContent style={{ width: '100%' }}>
                                            <Grid container spacing={0} style={{ width: '100%' }}>
                                                <Grid item md={4}>
                                                    <div style={
                                                                    { 
                                                                        overflow:'hidden', 
                                                                        height: '90px', 
                                                                        width: '100%',
                                                                        margin: '18px 4%' 
                                                                    }
                                                                }>
                                                        <img src={ extractImageSrc(service.service_img) } 
                                                            alt={service.title}
                                                            style={{ width: 'inherit' }} />
                                                    </div>
                                                </Grid>

                                                <Grid item md={8}>
                                                    <div className={ classes.cardChildDescription }>
                                                        

                                                            <Typography 
                                                                className={classes.title} 
                                                                color="textSecondary"
                                                                dangerouslySetInnerHTML={{__html: service.title}}>
                                                                
                                                            </Typography>

                                                            <Typography 
                                                                className={classes.serviceDescription} 
                                                                color="textSecondary"
                                                                dangerouslySetInnerHTML={{__html: service.description}}>
                                                                
                                                            </Typography>
                                                        <CardActions>
                                                            <Button 
                                                                size="small" 
                                                                variant="contained"
                                                                onClick={ () => this.editService(service) }>Edit</Button>
                                                        </CardActions>
                                                    </div>
                                                </Grid>
                                            </Grid>
                                            </CardContent>
                                        </Card>
                                    </Slide>
                                </div>
                            </Grid>
                        ))
                    }
                    {/* End of list of existing services */}


                {/* Form to add new service */}
                <Grid item xs={12} sm={12} md={11} className="new-service-form">
                    <Card className={classes.card}>
                        <CardContent>
                            <Grid container spacing={0} className={ classes.topPageStyles }>
                                
                                <div className={ 
                                        `${classes.justifyAlignCenter} ${classes.siteTextColor}` 
                                    }
                                    style={{ fontSize: 24 }}>
                                    { isEditService ? <AddIcon /> : <EditIcon /> }
                                    <h4> 
                                        { isEditService ? 'Edit service' : 'Add service' }
                                    </h4>
                                </div>

                                <Grid item xs={12} sm={12} md={12} className={ classes.sectionMargin }>
                                    {/* Editor to save new project */}
                                    {/* Editor for about me */}
                                    <h4 className={ classes.siteTextColor }> Service title </h4>
                                    <Editor
                                            apiKey={keys.tinymce_api_key}
                                            value={ title }
                                            init={{
                                                theme: "modern",
                                                height: 350,
                                                plugins: ['link image code'],
                                                toolbar: `undo redo | bold italic | alignleft aligncenter alignright | code
                                                        | image | link`,
                                                file_browser_callback_types: 'file image media',
                                                images_upload_url: `${environment.serverUrl}/file-upload`
                                            
                                            }}
                                            onChange={event => this.updateFormParametersObject(event.target.getContent(),
                                                                    "title") }
                                        />
                                </Grid>

                                <Grid item xs={12} sm={12} md={12} className={ classes.sectionMargin }>
                                    {/* Editor for about me */}
                                    <h4 className={ classes.siteTextColor }> Service description </h4>
                                    <Editor
                                            apiKey={keys.tinymce_api_key}
                                            value={ description }
                                            init={{
                                                theme: "modern",
                                                height: 350,
                                                plugins: ['link image code'],
                                                toolbar: `undo redo | bold italic | alignleft aligncenter alignright | code
                                                        | image | link`,
                                                file_browser_callback_types: 'file image media',
                                                images_upload_url: `${environment.serverUrl}/file-upload`
                                            
                                            }}
                                            onChange={event => this.updateFormParametersObject(event.target.getContent(),
                                                                    "description") }
                                        />
                                </Grid>

                                <Grid item xs={12} sm={12} md={12} className={ classes.sectionMargin }>
                                    {/* Editor for about me */}
                                    <h4 className={ classes.siteTextColor }> Service image </h4>
                                    <Editor 
                                            apiKey={keys.tinymce_api_key}
                                            value={ service_img }
                                            init={{
                                                theme: "modern",
                                                height: 350,
                                                plugins: ['link image code'],
                                                toolbar: `undo redo | bold italic | alignleft aligncenter alignright | code
                                                        | image | link`,
                                                file_browser_callback_types: 'file image media',
                                                images_upload_url: `${environment.serverUrl}/file-upload`
                                            
                                            }}
                                            onChange={event => this.updateFormParametersObject(event.target.getContent(),
                                                                    "service_img") }
                                        />
                                </Grid>

                                <Grid item xs={12} sm={12} md={12} className={ classes.justifyAlignCenter }>
                                    <Button variant="contained" color="primary"
                                            className={`sendButton ${classes.button}`}
                                            onClick={ () => {
                                                 isEditService ? this.updateService() : this.saveService() 
                                                } 
                                            }>
                                        <Icon>send</Icon>&nbsp; &nbsp; Save
                                    </Button>
                                </Grid>
                            </Grid>
                            {/* End of form to add new service */}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        )

    }

}

export default compose(graphql(AddServiceMutation, {name: "addService"}), 
                        graphql(updateServiceMutation, {name: 'updateService'}),
                        graphql(ServiceQuery, {name: "serviceData"}))(withStyles(styles)(Services));