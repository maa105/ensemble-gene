import React, { Component } from 'react';
import ProteinSequence from './protein-sequence.component';
import { Panel } from 'react-bootstrap';

class Protein extends Component {

  render() {
    const { protein, defaultExpanded, position, check, replacement, eventKey = 1 } = this.props;

    return (
      <Panel defaultExpanded={defaultExpanded} eventKey={eventKey}>
        <Panel.Heading>
          <Panel.Title toggle>{protein.id}</Panel.Title>
        </Panel.Heading>
        <Panel.Body collapsible>
          <ProteinSequence sequence={protein.seq} position={position} check={check} replacement={replacement} />
        </Panel.Body>
      </Panel>
    );
  }
}

export default Protein;
