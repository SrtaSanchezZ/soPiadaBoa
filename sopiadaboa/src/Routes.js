import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages';
import ListJokes from './pages/ListJokes';
import CreateJoke from './pages/CreateJoke';

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route component={Home} exact path="/" />
                <Route component={ListJokes} exact path="/piadas" />
                <Route component={CreateJoke} exact path="/novapiada" />
            </Switch>
        </BrowserRouter>
    );
}