import React from 'react';
import Protein from '../../../components/protein/protein.component';
import Proteins from '../../../components/protein/proteins.component';
import renderer from 'react-test-renderer';
import { stubComponent } from '../../componentStubber';

describe('protien component test', function() {
  stubComponent(Protein);
  
  const props = { 
    proteins: [
      { id: 'protein1', seq: 'seq1' },
      { id: 'protein2', seq: 'seq2' }
    ],
    position: 600 
  };

  test('Proteins with proper props to render correctly', () => {
    const component = renderer.create(
      <Proteins {...props} />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    const proteins = component.root.findAllByType(Protein);
    expect(proteins.length).toBe(2);
    
    const protein1Props = proteins[0].props;
    const protein2Props = proteins[1].props;

    // props passed down properly to Protein 
    expect(protein1Props).toEqual({
      bsStyle: undefined, // from react bootstrap
      eventKey: 0,
      protein: { id: 'protein1', seq: 'seq1' },
      position: 600
    });
    expect(protein2Props).toEqual({
      bsStyle: undefined, // from react bootstrap
      eventKey: 1,
      protein: { id: 'protein2', seq: 'seq2' },
      position: 600
    });

  });
});
