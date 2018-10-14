import React, { Component } from 'react';
import Protein from './protein.component';
import { PanelGroup } from 'react-bootstrap';

class Proteins extends Component {

  render() {
    const { proteins, position } = this.props;

    return (
      <PanelGroup id="proteins" accordion>
      {
        proteins.map((protein, i) => (
          <Protein key={protein.id} eventKey={i} protein={protein} position={position} />
        ))
      }
      </PanelGroup>
    );
  }
}

export default Proteins;
