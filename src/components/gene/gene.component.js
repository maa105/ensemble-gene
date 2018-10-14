import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';

class Gene extends Component {

  render() {
    const gene = this.props.gene;
    
    return (
      <Panel defaultExpanded>
        <Panel.Heading>
          <Panel.Title toggle>
            { gene.display_name } ({ gene.id })
          </Panel.Title>
        </Panel.Heading>
        <Panel.Collapse>
          <Panel.Body>
            { gene.description }
          </Panel.Body>
        </Panel.Collapse>
      </Panel>
    );
  }
}

export default Gene;
