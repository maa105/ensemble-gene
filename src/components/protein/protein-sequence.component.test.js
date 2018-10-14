import React from 'react';
import ProteinSequence from './protein-sequence.component';
import renderer from 'react-test-renderer';

test('Protein sequence with position, correct check and replacement', () => {
  const component = renderer.create(
    <ProteinSequence sequence={'ACDE'} position={2} check={'D'} replacement={'G'} />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Protein sequence with position and wrong check', () => {
  const component = renderer.create(
    <ProteinSequence sequence={'ACDE'} position={2} check={'V'} />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Protein sequence with position and no check', () => {
  const component = renderer.create(
    <ProteinSequence sequence={'ACDE'} position={2} />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Protein sequence with no position and no check', () => {
  const component = renderer.create(
    <ProteinSequence sequence={'ACDE'} />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
