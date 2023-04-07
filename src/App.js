import React from 'react';
import { BrowserRouter} from 'react-router-dom';


import { Helmet } from 'react-helmet';
import AppRouter from './Components/AppRouter';

function App() {

  //let [count, setCount] = React.useState(0);

  return (
    <BrowserRouter>
      <AppRouter/>
    </BrowserRouter>
  );
}

export default App;