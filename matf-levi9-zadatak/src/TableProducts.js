import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';



export default class TableProducts extends Component  {

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
