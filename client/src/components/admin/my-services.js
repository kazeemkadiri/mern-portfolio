import React, { Component } from 'react';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag'
import { Editor } from '@tinymce/tinymce-react';
import { keys } from '../../keys';

import  withStyles  from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Slide from 'react-reveal/Slide';


import { styles as serviceStyles } from '../clients/global-component-styles/services-styles';


const styles = theme => ({

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
    ...serviceStyles()
})

const servicePropsTemplate = ` description,
                                service_img,
                                title
                            `;

const updateServiceMutation = gql`
    mutation(
             $id: String!,
             $description: String!, 
             $title: String!,
             $service_img: String!
            ){
        updateService(
            id: $id,
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

        this.state = {
            formObject:{
                id:'',
                title: '',
                description: '',
                service_img: ''
            },
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

        console.log(this.state.formObject);
    }

    saveService = () => {

        // Send a gql mutation to save bio
        this.props.updateService({
            variables: {
                ...this.state.formObject
            },
            update: async (store, { data: { updateService } }) => {

                console.log(updateService);
                // const data = store.readQuery({ query: BioQuery });



                // store.writeQuery({ query: newBioObject });


            }
        })


    }

    initialiseServiceDataState = (serviceData) => {

        

        serviceData.forEach((service) => {

            const { formObject, services } = this.state;

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

                <Grid item xs={12} sm={12} md={8}>
                    {/* Loop through the services and render */}
                    {
                        services.length > 0 &&
                        services.map((service) => (

                            <div className={ classes.containerChild } key={service.id}>
                                <Slide left={true} >
                                        <Card className={classes.card}>
                                            <div className={ classes.cardChildImg }>
                                                <img src={service.service_img} alt={service.title}/>
                                            </div>

                                            <div className={ classes.cardChildDescription }>
                                                <CardContent>
                                                <Typography className={classes.title} color="textSecondary">
                                                    { service.description }
                                                </Typography>
                                                </CardContent>
                                                <CardActions>
                                                <Button size="small">Learn More</Button>
                                                </CardActions>
                                            </div>
                                        </Card>
                                    </Slide>
                                </div>

                        ))
                    }


                </Grid>

                <Grid item xs={12} sm={12} md={8}>
                    <Grid container spacing={0} className={ classes.topPageStyles }>

                        <Grid item xs={12} sm={12} md={12}>
                            {/* Editor to save new project */}
                            {/* Editor for about me */}
                            <Editor
                                    initialValue={ title }
                                    init={{
                                    plugins: 'link image code',
                                    toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
                                    }}
                                    onChange={event => this.updateFormParametersObject(event.target.getContent(),
                                                            "title") }
                                />
                        </Grid>

                        <Grid item xs={12} sm={12} md={12}>
                            {/* Editor for about me */}
                            <Editor
                                    initialValue={ description }
                                    init={{
                                    plugins: 'link image code',
                                    toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
                                    }}
                                    onChange={event => this.updateFormParametersObject(event.target.getContent(),
                                                            "description") }
                                />
                        </Grid>

                        <Grid item xs={12} sm={12} md={12}>
                            {/* Editor for about me */}
                            <Editor
                                    initialValue={ service_img }
                                    init={{
                                    plugins: 'link image code',
                                    toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
                                    }}
                                    onChange={event => this.updateFormParametersObject(event.target.getContent(),
                                                            "service_img") }
                                />
                        </Grid>

                        <Grid item xs={12} sm={12} md={12}>
                            <Button variant="contained" color="primary"
                                    className={`sendButton ${classes.button}`}
                                    onClick={ () => this.saveService() }>
                                <Icon>send</Icon>&nbsp; &nbsp; Save
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )

    }

}

export default compose(graphql(updateServiceMutation, {name: "updateService"}),
                       graphql(ServiceQuery, {name: "serviceData"}))
                      (withStyles(styles)(Services));