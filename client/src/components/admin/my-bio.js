import React, { Component } from 'react';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag'
import { Editor } from '@tinymce/tinymce-react';
import { keys } from '../../keys';
import { environment } from '../../environment';

import  withStyles  from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { site_text_color } from './css/global'


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
    siteTextColor: site_text_color

})

const bioPropsTemplate = `  id,
                            description,
                            about_me_img,
                            header_bg_img,
                            header_bg_img_text,
                            phone_no,
                            email
                            `;

const updateBioMutation = gql`
    mutation(
             $id: ID,
             $phone_no: String!, 
             $email: String!,
             $header_bg_img_text: String!,
             $description: String!,
             $about_me_img: String!,
             $header_bg_img: String!,
            ){
        updateBio(
            id: $id,
            header_bg_img_text: $header_bg_img_text,
            description: $description,
            about_me_img: $about_me_img,
            header_bg_img: $header_bg_img,
            phone_no: $phone_no,
            email: $email
        ){
            ${bioPropsTemplate}
        }   
    }
`;

const BioQuery = gql`
    {
        getBioData {
            ${bioPropsTemplate}
        }
    }
`;

class MyBio extends Component{

    constructor() {

        super()

        this.state = {
            formObject:{
                id:'',
                description: '',
                about_me_img: '',
                header_bg_img: '',
                header_bg_img_text: '',
                phone_no: '',
                email: ''
            }
        }

    }

    updateFormParametersObject(value, formField) {

        const { formObject } = this.state;

        this.setState({
            "formObject": {
                ...formObject,
                [formField]: value
            }
        }) 

        // console.log(this.state.formObject);
    }

    saveBio = () => {

        // Send a gql mutation to save bio
        this.props.updateBio({
            variables: {
                ...this.state.formObject
            },
            update: async (store, { data: { updateBio } }) => {

                this.updateBioDataState(updateBio);

            }
        })


    }

    updateBioDataState = (getBioData) => {

        const { formObject } = this.state;

        if(formObject.id !== '') return;

        Object.keys(formObject).forEach((key) => {

            formObject[key] = getBioData[key];

        });
        
        formObject.id = getBioData.id

        this.setState({
            formObject: { ...formObject }
        });

    }

    componentDidUpdate() {

        const { BioData } = this.props;

        if( (BioData.error  === undefined) && (BioData.hasOwnProperty("getBioData")) ) {

            this.updateBioDataState(BioData.getBioData);

        }

    }

    render() {

        const { classes, BioData: { loading } } = this.props;

        if(loading) return '';

        const { formObject: { description, about_me_img, header_bg_img, header_bg_img_text, phone_no, email} } = this.state;
        
        // console.log(this.state.formObject)
        
        return (
            <Grid container spacing={0} className={ classes.topPageStyles }>
                <Grid item xs={12} sm={12} md={8}>
                <Card className={classes.card}>
                    <CardContent>
                    <Grid container spacing={0} className={ classes.topPageStyles }>

                        <Grid item xs={12} sm={12} md={12}>
                            {/* Editor for header background image */}
                            <h3 className={ classes.siteTextColor }>Header background image</h3>
                            <Editor
                                    apiKey={ keys.tinymce_api_key }
                                    initialValue={ header_bg_img }
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
                                                            "header_bg_img") }
                                />
                        </Grid>

                        <Grid item xs={12} sm={12} md={12}>
                            {/* Editor for text displayed over header bg image */}
                            <h3 className={ classes.siteTextColor }>Header background image text</h3>
                            <Editor
                                    apiKey={ keys.tinymce_api_key }
                                    initialValue={ header_bg_img_text }
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
                                                            "header_bg_img_text") }
                                />
                        </Grid>

                        <Grid item xs={12} sm={12} md={12}>
                            {/* Editor for about me image */}
                            <h3 className={ classes.siteTextColor }>About me image</h3>
                            <Editor
                                    apiKey={ keys.tinymce_api_key }
                                    initialValue={ about_me_img }
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
                                                            "about_me_img") }
                                />
                        </Grid>

                        <Grid item xs={12} sm={12} md={12}>
                            {/* Editor for description */}
                            <h3 className={ classes.siteTextColor }>About me description</h3>
                            <Editor
                                    apiKey={ keys.tinymce_api_key }
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

                        <Grid item xs={12} sm={12} md={12}>
                            {/* Editor to save new project */}
                            <TextField
                                id="phone_no"
                                label="Phone No"
                                className={ classes.textField }
                                style={{ width: "100%" }}
                                value={ phone_no || '' }
                                onChange={ event => this.updateFormParametersObject(event.target.value, "phone_no") }
                                margin="normal"
                                />
                        </Grid>

                        <Grid item xs={12} sm={12} md={12}>
                            {/* Editor to save new project */}
                            <TextField
                                id="email"
                                label="Email"
                                className={ classes.textField }
                                style={{ width: "100%" }}
                                value={ email || '' }
                                onChange={ event => this.updateFormParametersObject(event.target.value, "email") }
                                margin="normal"
                                />
                        </Grid>

                        <Grid item xs={12} sm={12} md={12}>
                            <Button variant="contained" color="primary"
                                    className={`sendButton ${classes.button}`}
                                    onClick={ () => this.saveBio() }>
                                <Icon>send</Icon>&nbsp; &nbsp; Save
                            </Button>
                        </Grid>
                    </Grid>
                    </CardContent>
                    </Card>
                </Grid>
            </Grid>
        )

    }

}

export default compose(graphql(updateBioMutation, {name: "updateBio"}), graphql(BioQuery, {name: "BioData"}))(withStyles(styles)(MyBio));