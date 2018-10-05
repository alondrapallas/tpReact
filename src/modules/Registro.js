import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CreditCardInput from 'react-credit-card-input';
import Cards from 'react-credit-cards'
import 'react-credit-cards/es/styles-compiled.css';
import MenuItem from '@material-ui/core/MenuItem';
import { CountryDropdown } from 'react-country-region-selector';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import '../App.css';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';


const styles = theme => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap'
	},
	formControl: {
		margin: theme.spacing.unit,
		minWidth: 120
	},
	selectEmpty: {
		marginTop: theme.spacing.unit * 2
	},
	chips: {
		display: 'flex',
		flexWrap: 'wrap'
	},
	chip: {
		margin: theme.spacing.unit / 4
	}
});
const listaCountries = require('country-list')();
const countries = listaCountries.getNames();


class Principal extends React.Component {
  constructor (props) { super(props);
  this.state = {
      country: '',
      region: '',
      apellido: '',
      nombre: '',
      expiry: '',
      cvc: '',
      number: '',
      email: '',
      tipo: '',
    };
}
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
};
  selectCountry(val) {
    this.setState({ country: val });
}
  componentDidMount () {
    this.setState({ tipo: this.props.location.state })
}

realizarPago(){
    if (this.state.tipo === 'premium'){
      return (<div>
                <CreditCardInput fieldClassName="input"
                    cardNumberInputProps={{ onChange: e => this.handleChange(e), name:"number" }}
                    cardExpiryInputProps={{ onChange: e => this.handleChange(e), name:"expiry" }}
                    cardCVCInputProps={{ onChange: e => this.handleChange(e), name:"cvc" }}
					
                />
                <Cards
                    number={this.state.number}
                    name={this.state.nombre}
                    expiry={this.state.expiry}
                    cvc={this.state.cvc}
                    focused={''}
                />
              </div>);
	}

}  

registrarse(tipo){
    if (tipo === 'premium') {
      var user = {
        tipo: this.state.tipo,
        nombre: this.state.nombre,
        apellido:this.state.apellido,
        email: this.state.email,
        pais: this.state.country,
        cardNumber: this.state.number,
        cardExpiry: this.state.expiry,
        cardVc: this.state.cvc,
      } 
    } else {
      var user = {
        tipo: this.state.tipo,
        nombre: this.state.nombre,
        apellido:this.state.apellido,
        email: this.state.email,
        pais: this.state.country,
      }
};

    fetch('https://server-subscripcion-jsbrbnwqfv.now.sh/subscripciones', {
			method: "POST",
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*'
			},
      body: JSON.stringify(user, '\t')
		})
		.then((response) => { return response.json(); })
		.then((user) => { console.log('¡Registro exitoso!', user); window.Materialize.toast('¡Registro exitoso!', 1000);})
		.catch((error) => { console.log(error, 'error');});
};

  render(){ 
	const princ = props => <Link to={{pathname: '/', }} {...props}/>
    const {country, email, number, expiry, cvc, tipo, nombre, apellido} = this.state;
    let userPost;
	const { classes } = this.props;
    if (tipo === 'premium') {
			userPost =
				((country.length > 0) &&
				(number.length > 0) &&
				(expiry.length > 0) &&
				(email.length > 0) &&
				(nombre.length > 0) &&
				(apellido.length > 0) &&
				(cvc.length > 0))
    } else {
      userPost = 
        ((nombre.length > 0) &&
        (apellido.length > 0) &&
        (country.length > 0) &&
        (email.length > 0))
    }
	
return (

<div className="App">
      <p className="App-intro"> Registro </p> <hr />
      <div className = "country" >
        <React.Fragment>
          <Grid container spacing={48}>
            <Grid item xs={4} sm={4}> <TextField required id="nombre" name="nombre" label="Nombre" fullWidth onChange={e => this.handleChange(e)} autoComplete="nombre"/>
            </Grid>			
            <Grid item xs={4} sm={4}>
              <TextField required id="apellido" name="apellido" label="Apellido" onChange={e => this.handleChange(e)} fullWidth autoComplete="apellido" />
            </Grid>						
            <Grid className="country"  >
			<CountryDropdown value={country} onChange={(val) => this.selectCountry(val)} className="showBlock" name="country" />
			</Grid> 			
            <Grid item xs={8} sm={8}>
              <TextField required id="email" name="email" label="Email" onChange={e => this.handleChange(e)} fullWidth autoComplete="email"/>
            </Grid>
            <Grid className = "creditcard">
              <div>{this.realizarPago(this.state.tipo)}</div>
            </Grid>
          </Grid>
        </React.Fragment>
      </div>
      <Grid>
        <Button component = {princ} disabled={!userPost} size="small" onClick={() => {this.registrarse(tipo)}} > Registrarse </Button>
      </Grid>  
      <div className="pie"><p>Alondra Pallas - IFTS N°16</p></div>
    </div>
       
  );
  }
}

Principal.propTypes = {
classes: PropTypes.object.isRequired,

//
}

export default withStyles(styles)(Principal);



