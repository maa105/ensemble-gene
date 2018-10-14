import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Panel, ProgressBar } from 'react-bootstrap';
import { PROTEIN_ALPHABET, PROTEIN_SEQUENCE_START_INDEX } from '../../constants';
import Gene from './gene.component';
import Proteins from '../protein/proteins.component';

class GeneAndProteins extends Component {

  render() {
    const symbol = this.props.geneSymbolInputValue.trim().toLowerCase();

    const { geneProteinValueInputValue } = this.props;
    const geneProteinIndexInputValue = this.props.geneProteinIndexInputValue;
    const zeroIndexedGeneProteinIndexInputValue = geneProteinIndexInputValue - PROTEIN_SEQUENCE_START_INDEX;

    const gene = this.props.genes[symbol];
    const isGeneLoading = this.props.loadingGenes[symbol];
    const geneLoadError = this.props.genesWithLoadingError[symbol];

    const protiens = this.props.proteinsByGene[symbol];
    const isGeneProtiensLoading = this.props.loadingGeneProteins[symbol];
    const geneProtiensLoadError = this.props.genesWithProteinsLoadingError[symbol];

    if(geneLoadError) {
      return (
        <Panel>
          <Panel.Body>
          {
            geneLoadError.notFound ? 'Gene not found' : (geneLoadError.offline ? 'It seems you are offline' : 'Error loading data')
          }
          </Panel.Body>
        </Panel>
      );
    }
    if(isGeneLoading || isGeneProtiensLoading) {
      return (
        <ProgressBar active now={100} />
      );
    }
    if(!gene) {
      return null;
    }
    const filteredProteins = protiens && protiens.filter((protein) => {
      return protein.seq && protein.seq.length > zeroIndexedGeneProteinIndexInputValue && protein.seq[zeroIndexedGeneProteinIndexInputValue].toLowerCase() === geneProteinValueInputValue.toLowerCase();
    });
    return (
      <div>
        <Gene gene={gene} />
        <h2>Proteins:</h2>
        {
          protiens ? (protiens.length ? 
            (filteredProteins.length ? <Proteins proteins={filteredProteins} position={zeroIndexedGeneProteinIndexInputValue} /> : 
            <Panel>
              <Panel.Body>
                No proteins found with { PROTEIN_ALPHABET[geneProteinValueInputValue.toUpperCase()].name } amino acid at { geneProteinIndexInputValue }
              </Panel.Body>
            </Panel>) : 
            <Panel>
              <Panel.Body>
                This gene has no transcripting proteins
              </Panel.Body>
            </Panel>) : 
            (geneProtiensLoadError ? 
              <Panel>
                <Panel.Body>
                  { geneProtiensLoadError.offline ? 'It seems you are offline' : 'Error loading gene\'s proteins' }
                </Panel.Body>
              </Panel> : 
              <Panel>
                <Panel.Body>
                  Could not load protiens
                </Panel.Body>
              </Panel>)
        }
      </div>
    );
  }
}

const mapStateToProps = state => (state.gene);

const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GeneAndProteins);
