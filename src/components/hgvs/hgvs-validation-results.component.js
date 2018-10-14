import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Panel, ProgressBar } from 'react-bootstrap';
import Protein from '../protein/protein.component';
import { PROTEIN_SEQUENCE_START_INDEX, PROTEIN_ALPHABET } from '../../constants';

class HGVSValidationResult extends Component {
  constructor(props) {
    super(props);

    this.errorRef = React.createRef();
  }

  render() {
    const validationResult = this.props.validationResult;
    if(!validationResult) {
      return null;
    }
    
    const { input, protein, proteinId, isLoadingProtein, proteinLoadingError } = this.props;
    const { error, at, sourceAminoAcid } = validationResult;

    const aminoAcidIndex = validationResult.aminoAcidIndex;
    const zeroIndexAminoAcidIndex = validationResult.aminoAcidIndex - PROTEIN_SEQUENCE_START_INDEX;

    let aminoAcidAtPositionCheck = true;
    if(protein && sourceAminoAcid && zeroIndexAminoAcidIndex !== null && zeroIndexAminoAcidIndex !== undefined && zeroIndexAminoAcidIndex < protein.seq.length) {
      aminoAcidAtPositionCheck = protein.seq[zeroIndexAminoAcidIndex].toLowerCase() === sourceAminoAcid.toLowerCase();
    }

    let proteinPart;
    if(!proteinId) {
      proteinPart = (
        <Panel>
          <Panel.Body>
            No valid protein sequence detected so far
          </Panel.Body>
        </Panel>
      );
    }
    else if(isLoadingProtein) {
      proteinPart = (
        <ProgressBar active now={100} label={'Loading Protein ' + proteinId} />
      );
    }
    else if(proteinLoadingError) { // error loading protein
      proteinPart = (
        <Panel>
          <Panel.Body>
            {
              proteinLoadingError.notFound ? ('No protein with id ' + proteinId + ' found') : (proteinLoadingError.offline ? 'It seems you are offline' : ('Error loading protein data for protein ' + proteinId))
            }
          </Panel.Body>
        </Panel>
      );
    }
    else if(protein) {
      if(error || !aminoAcidAtPositionCheck) { // parsing error
        proteinPart = (
          <React.Fragment>
            <h4>Protein detected so far</h4>
            <Protein defaultExpanded protein={protein} position={validationResult.aminoAcidIndex ? (validationResult.aminoAcidIndex - PROTEIN_SEQUENCE_START_INDEX) : null} check={validationResult.sourceAminoAcid} replacement={validationResult.replacementAminoAcid} />
          </React.Fragment>
        );
      }
      else {
        proteinPart = (
          <React.Fragment>
            <h4>Protein found:</h4>
            <Protein defaultExpanded protein={protein} position={validationResult.aminoAcidIndex ? (validationResult.aminoAcidIndex - PROTEIN_SEQUENCE_START_INDEX) : null} check={validationResult.sourceAminoAcid} replacement={validationResult.replacementAminoAcid} />
          </React.Fragment>
        );
      }
    }
    else {
      proteinPart = null;
    }


    let splitInput = null;
    if(error || !aminoAcidAtPositionCheck) {
      const inputCharArray = input.split('');

      splitInput = (
        <div>
          <h3>
            Your input:&nbsp;
            {
              inputCharArray.map((char, i) => {
                if(i === at || (i === at - 1 && at === inputCharArray.length)) {
                  return (<div ref={this.errorRef} key={i} className={'hgvs-split-input-char at'}>{char}</div>);
                }
                else {
                  return (<div key={i} className={'hgvs-split-input-char'}>{char}</div>);
                }
              })
            }
          </h3>
          {
            error ? <Panel>
              <Panel.Body>
                {error}
              </Panel.Body>
            </Panel> : null
          }
          {
            !aminoAcidAtPositionCheck ? <Panel>
              <Panel.Body>
                Amino acid of protein {proteinId} at index {aminoAcidIndex} is actually {PROTEIN_ALPHABET[protein.seq[zeroIndexAminoAcidIndex].toUpperCase()].name}({PROTEIN_ALPHABET[protein.seq[zeroIndexAminoAcidIndex].toUpperCase()].symbol}) not {PROTEIN_ALPHABET[sourceAminoAcid.toUpperCase()].name}({PROTEIN_ALPHABET[sourceAminoAcid.toUpperCase()].symbol}) as indicated
              </Panel.Body>
            </Panel> : null
          }
        </div>
      );
    }

    return (
      <div className={'hgvs-validation-results'}>
        { splitInput }
        { proteinPart }
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const proteinId = ownProps.validationResult && ownProps.validationResult.proteinId && ownProps.validationResult.proteinId;
  const proteinIdLower = proteinId && proteinId.trim().toLowerCase();
  if(proteinId) {
    return {
      proteinId: proteinId,
      protein: state.gene.proteins[proteinIdLower],
      isLoadingProtein: state.gene.loadingProteins[proteinIdLower],
      proteinLoadingError: state.gene.proteinsWithLoadingError[proteinIdLower]
    };
  }
  return {};
}

export default connect(
  mapStateToProps,
  null
)(HGVSValidationResult);
