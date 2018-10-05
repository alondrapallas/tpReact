import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import '../App.css'; 
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';

const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  appBar: {
    position: 'relative',
  },
  toolbarTitle: {
    flex: 1,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
      width: 900,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  cardHeader: {
    backgroundColor: theme.palette.grey[200],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing.unit * 2,
  },
  cardActions: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing.unit * 2,
    },
  },
  footer: {
    marginTop: theme.spacing.unit * 8,
    borderTop: `1px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit * 6}px 0`,
  },
});


const tiers = [
  {
    title: 'Suscripcion Gratuita',
    price: '0',
    description: [
    '2 descargas por dia✅',
    '2 GB tope de descarga✅',
    'acceso a nuestro centro de ayuda✅',
    'soporte via Email✅'],
    buttonText: 'Registrarse Gratis',
    buttonVariant: 'outlined',
  },
  {
    title: 'Premium',
    subheader: 'La mas popular',
    price: '15',
    description: [
      'descargas ilimitadas✅',
      'sin tope de descarga✅',
      'acceso a nuestro centro de ayuda✅',
      'soporte via Email y Chat✅',
    ],
    buttonText: 'Unirse a Premium',
    buttonVariant: 'contained',
  },
];


class Principal extends Component {

    render() {
		
		
		const prem = props => <Link to={{pathname: '/Registro', state: 'premium' }} {...props}/>
		const grat = props => <Link to={{pathname: '/Registro', state: 'gratis'}} {...props}/>
		const { classes } = this.props;
  return (
  
    <React.Fragment>
      <CssBaseline />

      <main className={classes.layout}>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Typography variant="display3" align="center" color="textPrimary" gutterBottom>
            Maneje todas sus descargas de archivos
          </Typography>
          <Typography variant="title" align="center" color="textSecondary" component="p">
            La descarga de archivos es fácil, poseemos funciones que no encontrará en ningún otro lugar.
          </Typography>
        </div>
        {/* End hero unit */}
        <Grid container spacing={24} alignItems="flex-end">
          {tiers.map(tier => (
            
            <Grid item key={tier.title} xs={12} sm={12} md={6}>
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{ align: 'center' }}
                  className={classes.cardHeader}
                />
                <CardContent>
                  <div className={classes.cardPricing}>
                    <Typography component="h2" variant="display2" color="textPrimary">
                      ${tier.price}
                    </Typography>
                    <Typography variant="title" color="textSecondary">
                      /u$d
                    </Typography>
                  </div>
                  {tier.description.map(line => (
                    <Typography variant="subheading" align="center" key={line}>
                      {line}
                    </Typography>
                  ))}
                </CardContent>
                <CardActions className={classes.cardActions}>
                  <Button component ={tier.title === 'Premium' ? prem : grat} fullWidth variant={tier.buttonVariant} color="primary">
                    {tier.buttonText}
					
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <div id="pie"><p>Alondra Pallas - IFTS N°16</p></div>
      </main>

    </React.Fragment>
);
		
	
	}
	
	};
	
Principal.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Principal);