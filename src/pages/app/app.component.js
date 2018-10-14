import React, { Component } from 'react';
import TopNav from '../../components/top-nav/top-nav.component';
import { Route, withRouter, Redirect } from 'react-router-dom';
import ProteinFinder from '../protein-finder/protein-finder.page';
import HGVS from '../hgvs/hgvs.page';

class App extends Component {

  render() {    
    return (
      <div>
        <TopNav/>
        <div className={'container'}>
          <Route path="/find-proteins" exact={true} component={ProteinFinder} />
          <Route path="/hgvs" exact={true} component={HGVS} />
          <Route path="/" exact={true} render={() => <Redirect to={'/find-proteins'} />} />
        </div>
      </div>
    );
  }
}

export default withRouter(App);
