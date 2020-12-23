
import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import TableProducts from './TableProducts.js'

import './App.css'

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            naziv: '',
            opis: '',
            prikaz: false
        };
        
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    
    handleSubmit = async e => {
        e.preventDefault();
        console.log(this.state.naziv + " " + this.state.opis);
        
        if (this.state.naziv.length > 1 && this.state.opis.length > 1) {
            await fetch('/admin/unos-novog-proizvoda', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ naziv: this.state.naziv, opis: this.state.opis }),
            });
        } else {
            console.log('Niste uneli naziv ili opis')
        }
    };
    
    render() {
        if (this.state.prikaz) {
            console.log(this.state.prikaz)
            return <TableProducts />
        }
        else 
        return (
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <div className={'paper'}>
                <Typography component="h1" variant="h5">
                  PROIZVODI
                </Typography>
                <form className={'form'} noValidate onSubmit={this.handleSubmit}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="naziv_proizvoda"
                    label="Naziv proizvoda"
                    name="naziv_proizvoda"
                    autoComplete="naziv_proizvoda"
                    autoFocus
                    defaultValue={this.state.naziv}
                    onChange={event => {
                      const { value } = event.target;
                      this.setState({ naziv: value });
                    }}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="opis_proizvoda"
                    label="Opis proizvoda"
                    type="opis_proizvoda"
                    id="opis_proizvoda"
                    autoComplete="current-opis_proizvoda"
                    defaultValue={this.state.opis}
                    onChange={event => {
                      const { value } = event.target;
                      this.setState({ opis: value });
                    }}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={'submit'}
                  >
                    Dodaj
                  </Button>
                  
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="secondary"
                    className={'submit'}
                    onClick={() => this.setState({prikaz: true})}
                  >
                    Prikaži proizvode
                  </Button>
                </form>
              </div>
            </Container>
        );
    }
}

