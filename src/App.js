import './App.css';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import Usuarios from './components/usuarios';
import CrearUsuarios from './components/crearUsuario';
import Encuestas from './components/encuestas';
import CrearEncuestas from './components/crearEncuesta';
import Secciones from './components/secciones';
import CrearSecciones from './components/crearSeccion';
import Preguntas from './components/preguntas';
import CrearPreguntas from './components/crearPregunta';
import Login from './components/login';
import Header from './pages/header';
import Formularios from './components/formulario';
import imgInicial from './inicio-encuesta.jpg'
import 'bootstrap/dist/css/bootstrap.min.css'
import constantes from './constantes';

function App() {

   let logueo = <>
      <div className='login'>
        <Link className="btn btn-primary" to="/login">Iniciar Sesión</Link>
      </div>
      <div className='register'>
        <Link className="btn btn-primary" to="/usuarios/Crear">Registrarme</Link>
      </div>
      </>;
    
    if(constantes.isUser) {      
      logueo=""
    }
 
  return (   
    
    <Router>
        <Header></Header>        
          <Switch>
            <Route exact path="/login" component={Login}>                   
            </Route>
            <Route exact path="/usuarios" component={Usuarios}>          
            </Route>
            <Route exact path="/usuarios/Crear" component={CrearUsuarios}>          
            </Route>                     
            <Route exact path="/encuestas" component={Encuestas}>      
            </Route>
            <Route exact path="/encuestas/Crear" component={CrearEncuestas}>         
            </Route>
            <Route exact path="/encuestas/:getIdEncuesta/secciones" component={Secciones}>      
            </Route>
            <Route exact path="/encuestas/:getIdEncuesta/secciones/:getIdSeccion/Crear" component={CrearSecciones}>          
            </Route>
            <Route exact path="/encuestas/:getIdEncuesta/secciones/:getIdSeccion/preguntas" component={Preguntas}>        
            </Route>
            <Route exact path="/encuestas/:getIdEncuesta/secciones/:getIdSeccion/preguntas/:getIdPregunta/Crear" component={CrearPreguntas}>          
            </Route>
            <Route exact path="/formularios" component={Formularios}>          
            </Route>
            <Route path="/">
              <div className="img-inicial2">
              <img src={imgInicial} alt="inicio" className="img-inicial"/>
              </div>
            {logueo}
            </Route>                               
          </Switch>          
    </Router>
  );
}

export default App;