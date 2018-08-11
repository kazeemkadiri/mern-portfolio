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
import Slide from 'react-reveal/Slide';


import { styles as serviceStyles } from '../clients/global-component-styles/services-styles';
import { site_text_color, justify_align_center } from '../clients/global-component-styles/styles';


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
    ...serviceStyles()
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

        // console.log(this.state.formObject);
    }

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

                console.log(newServiceList)

                this.setState({
                    services: newServiceList
                })
                
                this.resetServiceForm()

            }
        })


    }

    initialiseServiceDataState = (serviceData) => {

        serviceData.forEach((service) => {

            const { services } = this.state;

            let newServices = services;
    
            let newService = {
                id:'',
                title: '',
                description: '',
                service_img: ''
            };
    
            Object.keys(newService).forEach((key) => {
    
                newService[key] = service[key];
    
            });
            
            newServices.push(newService);

            this.setState({
                services: newServices
            });

        });
        

    }

    setService = (inputService) => {

    }

    resetServiceForm = () => {

        this.setState({
            formObject: this.formObject
        })

    }

    componentWillReceiveProps(nextProps) {

        if(this.state.services.length > 0) return;

        const { serviceData } = nextProps;

        if( (serviceData.error  === undefined) && 
            (serviceData.hasOwnProperty("serviceData")) ) {

            this.initialiseServiceDataState(serviceData.serviceData);

        }

    }

    render() {

        const { classes, serviceData: { loading } } = this.props;

        if(loading) return '';

        const { services, formObject: { title, description, service_img} } = this.state;

        return (
            <Grid container spacing={0} className={ classes.topPageStyles }>

                    {/* Loop through the existing services and render */}
                    {
                        services.length > 0 &&
                        services.map((service, index) => (
                            <Grid item xs={12} sm={12} md={5} key={ index }>
                                <div className={ classes.containerChild } key={service.id}>
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
                                                            <Button size="small">Learn More</Button>
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
                <Grid item xs={12} sm={12} md={11}>
                    <Card className={classes.card}>
                        <CardContent>
                            <Grid container spacing={0} className={ classes.topPageStyles }>
                                
                                <div className={ 
                                        `${classes.justifyAlignCenter} ${classes.siteTextColor}` 
                                    }
                                    style={{ fontSize: 24 }}>
                                    <AddIcon />
                                    <h4> 
                                        Add service 
                                    </h4>
                                </div>

                                <Grid item xs={12} sm={12} md={12} className={ classes.sectionMargin }>
                                    {/* Editor to save new project */}
                                    {/* Editor for about me */}
                                    <h4 className={ classes.siteTextColor }> Service title </h4>
                                    <Editor
                                            apiKey={keys.tinymce_api_key}
                                            initialValue={ title }
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
                                            initialValue={ description }
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
                                            initialValue={ service_img }
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
                                            onClick={ () => this.saveService() }>
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

export default compose(graphql(AddServiceMutation, {name: "addService"}), graphql(ServiceQuery, {name: "serviceData"}))(withStyles(styles)(Services));