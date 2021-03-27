import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages';
import ListaPiadas from './pages/ListaPiadas';

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route component={Home} exact path="/" />
                <Route component={ListaPiadas} exact path="/piadas" />
            </Switch>
        </BrowserRouter>
    );
}