
import {BrowserRouter as Router} from 'react-router-dom'

import Encuestas from './encuestas';
import Secciones from './secciones';
import Preguntas from './preguntas';

function Formularios() {
 
  return (   
    
    <Router>        
        <Encuestas></Encuestas>
        <Secciones></Secciones>
        <Preguntas></Preguntas>                   
    </Router>
  );
}

export default Formularios;