/*
import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import './App.css'

class App extends Component {
    constructor() {
        super();
        this.state = {
            naziv: '',
            opis: '',
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
                </form>
              </div>
            </Container>
        );
    }
}

export default App;
*/




import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';



export default class App extends Component  {

    constructor(props) {
      super(props);

      this.state = {
        rows: []
      };
      
      this.renderMyData = this.renderMyData.bind(this);
      this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        this.renderMyData();
    }
    

    renderMyData(){
        fetch('/admin/proizvodi')
            .then((response) => response.json())
            .then((responseJson) => {
                let rows = []
                for (const [key, value] of Object.entries(responseJson)) {
                    const obj = {id: parseInt(key), naziv: value.naziv, opis: value.opis}
                    rows.push(obj)
                }
                this.setState({rows: rows })
            })
            .catch((error) => {
              console.error(error);
            });
    }
    
    handleDelete = async (id) => {
        const response = await fetch('/admin/proizvodi', {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({id: id}),
            });
        
        response.json()
            .then((responseJson) => {
                let rows = []
                for (const [key, value] of Object.entries(responseJson)) {
                    const obj = {id: parseInt(key), naziv: value.naziv, opis: value.opis}
                    rows.push(obj)
                }
                this.setState({rows: rows })
            })
    }
    

    render(){
        if (this.state.rows !== 0) 
               return (
                <TableContainer component={Paper}>
                  <Table className={'table'} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell >Id</TableCell>
                        <TableCell >Naziv</TableCell>
                        <TableCell >Opis</TableCell>
                        <TableCell >Obrisi</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {this.state.rows.map((row) => (
                        <TableRow key={row.id}>
                          <TableCell >{row.id}</TableCell>
                          <TableCell >{row.naziv}</TableCell>
                          <TableCell >{row.opis}</TableCell>
                          <TableCell >
                            <Button variant="contained" color="secondary" onClick={()=>this.handleDelete(row.id)}> Delete</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )
        else return (
                 <h1> Loading </h1>
            )
    }
}
