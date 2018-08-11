import { removeWebKit, servicesAlignment } from './styles.js'
import { site_text_color, justify_align_center } from './styles'

const styles = () => ({

    removeWebKit: removeWebKit,
    servicesAlignment: servicesAlignment,
    siteTextColor: site_text_color,
    justifyAlignCenter: justify_align_center,
    container: {
        display: "flex",
        justifyContent: "space-between"
    },
    containerChild: {
        flex: 1,
        flexBasis: "40%",
        position: "relative",
        margin: "10px 2%"
    },
    cardChildImg: {
        flex: 1,
        margin: "10px 2%"
    },
    cardChildDescription: {
        flex: 2,
        margin: "10px 4%",
        marginLeft: '50px',
        height: '180px'
    },
    sectionHeader: {
        ...servicesAlignment,
        color: "#0c2e8a"
    },
    underLine: {
        background: "#50d8af",
        width: "3%",
        height: "3px",
        float: "left",
        border: "1px solid #50d8af",
        ...removeWebKit
    },
    card: {
        minWidth: 275,
        display: "flex",
    },
    serviceContainer: {
        padding: '20px',
        marginBottom: '35px',
        boxShadow: '8px 8px 12px rgba(74, 79, 91, 0.1)',
        '&:hover': {
            boxShadow: '0.2px 0.2px 28px rgba(74, 79, 91, 0.12)',
            transform: 'translateY(-10px)',
            '-webkit-transform': 'translateY(-10px)'
        },
        transition: '0.3s'
    },
    serviceDescription:{
        height: '90px !important',
        overflow: 'hidden'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        marginBottom: 16,
        fontSize: 22,
        fontWeight: 700,
        textTransform: 'capitalize'
    },
    pos: {
        marginBottom: 12,
    }
  });

  export { styles };