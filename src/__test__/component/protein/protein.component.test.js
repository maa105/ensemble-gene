import React from 'react';
import ProteinSequence from '../../../components/protein/protein-sequence.component';
import Protein from '../../../components/protein/protein.component';
import renderer from 'react-test-renderer';
import { stubComponent } from '../../componentStubber';

describe('protien component test', function() {
  stubComponent(ProteinSequence);
  
  const props = { 
    protein: {
      proteinId: 'proteinId',
      seq: 'seq'
    }, 
    defaultExpanded: true,
    position: 600,
    check: 'A',
    replacement: 'V',
    eventKey: 2
  };

  test('Protein with proper props to render correctly', () => {
    const component = renderer.create(
      <Protein {...props} />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    const sequences = component.root.findAllByType(ProteinSequence);
    expect(sequences.length).toBe(1);
    
    const sequenceProps = sequences[0].props;

    // props passed down properly to Protein sequence
    expect(sequenceProps).toEqual({ sequence: 'seq', position: 600, check: 'A', replacement: 'V' });

  });
});
