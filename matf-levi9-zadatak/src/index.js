import React from 'react';
import ReactDOM from 'react-dom';
import {Route, BrowserRouter} from 'react-router-dom'

import App from './App'
import AddProducts from './AddProducts'
import TableProducts from './TableProducts'

ReactDOM.render(
  <BrowserRouter>
    <Route exact path='/' component={App} />
    <Route exact path='/admin/proizvodi' component={TableProducts} />
    <Route exact path='/admin/unos-novog-proizvoda' component={AddProducts} />
  </BrowserRouter>,
  document.getElementById('root')
)
