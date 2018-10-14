import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import GeneAndProteins from '../../components/gene/gene-and-protiens.component';
import { geneSymbolInputValueChange, touchGeneSymbolInput, geneProteinIndexInputValueChange, geneProteinValueInputValueChange } from '../../actions';
import { FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';
import { MIN_GENE_SYMBOL_DIGITS, PROTEIN_ALPHABET, PROTEIN_ALPHABET_ARRAY, PROTEIN_SEQUENCE_START_INDEX } from '../../constants';

class ProteinFinder extends Component {
  constructor(props) {
    super(props);

    this.geneSymbolInputValueChange = this.geneSymbolInputValueChange.bind(this);
    this.touchGeneSymbolInput = this.touchGeneSymbolInput.bind(this);
    this.geneProteinIndexInputValueChange = this.geneProteinIndexInputValueChange.bind(this);
    this.geneProteinValueInputValueChange = this.geneProteinValueInputValueChange.bind(this);

    this.validateGeneSymbol = this.validateGeneSymbol.bind(this);
    this.validateGeneProteinIndex = this.validateGeneProteinIndex.bind(this);
    this.validateGeneProteinValue = this.validateGeneProteinValue.bind(this);
  }

  geneSymbolInputValueChange(e) {
    this.props.geneSymbolInputValueChange(e.target.value);
  }
  touchGeneSymbolInput() {
    this.props.touchGeneSymbolInput();
  }
  geneProteinIndexInputValueChange(e) {
    this.props.geneProteinIndexInputValueChange(e.target.value);
  }
  geneProteinValueInputValueChange(e) {
    this.props.geneProteinValueInputValueChange(e.target.value);
  }

  validateGeneSymbol() {
    if(this.props.geneSymbolInputTouched && this.props.geneSymbolInputValue.length < MIN_GENE_SYMBOL_DIGITS) {
      return 'warning';
    }
  }
  validateGeneProteinIndex() {
    if(this.props.geneProteinIndexInputValue < PROTEIN_SEQUENCE_START_INDEX) {
      return 'error';
    }
  }
  validateGeneProteinValue() {
    if(!PROTEIN_ALPHABET[this.props.geneProteinValueInputValue.toUpperCase()]) {
      return 'error';
    }
  }

  render() {    
    return (
      <React.Fragment>
        <FormGroup controlId="geneSymbol" validationState={this.validateGeneSymbol()}>
          <ControlLabel>Gene Symbol</ControlLabel>
          <FormControl
            onBlur={this.touchGeneSymbolInput}
            type="text"
            value={this.props.geneSymbolInputValue}
            placeholder="e.g. BRAF"
            onChange={this.geneSymbolInputValueChange}
          />
          <FormControl.Feedback />
          {
            this.props.geneSymbolInputTouched && this.props.geneSymbolInputValue.length < MIN_GENE_SYMBOL_DIGITS ? 
              <HelpBlock>Symbol length is at least 3 digits</HelpBlock> : null
          }
        </FormGroup>
        <FormGroup controlId="proteinIndex" validationState={this.validateGeneProteinIndex()}>
          <ControlLabel>Protien Index</ControlLabel>
          <FormControl
            type="number"
            value={this.props.geneProteinIndexInputValue}
            placeholder="e.g. 600"
            onChange={this.geneProteinIndexInputValueChange}
          />
          <FormControl.Feedback />
          {
            this.props.geneProteinIndexInputValue < 0 ? 
              <HelpBlock>Index should not be negative</HelpBlock> : null
          }
        </FormGroup>
        <FormGroup controlId="proteinValue">
          <ControlLabel>Protien Value</ControlLabel>
          <FormControl
            type="text"
            componentClass="select" 
            value={this.props.geneProteinValueInputValue}
            placeholder="Protein letter e.g. V"
            onChange={this.geneProteinValueInputValueChange}
          >
            {
              _.map(PROTEIN_ALPHABET_ARRAY, (val) =>
                <option key={val.key} value={val.key}>{val.key} - {val.name} ({val.symbol})</option>
              )
            }
          </FormControl>
          <FormControl.Feedback />
          {
            PROTEIN_ALPHABET[this.props.geneProteinValueInputValue.toUpperCase()] < 0 ? 
              <HelpBlock>Index should not be negative</HelpBlock> : null
          }
        </FormGroup>
        <GeneAndProteins />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  geneSymbolInputValue: state.gene.geneSymbolInputValue,
  geneSymbolInputTouched: state.gene.geneSymbolInputTouched,
  geneProteinIndexInputValue: state.gene.geneProteinIndexInputValue,
  geneProteinValueInputValue: state.gene.geneProteinValueInputValue
});

const mapDispatchToProps = dispatch => ({
  geneSymbolInputValueChange: (value) => dispatch(geneSymbolInputValueChange(value)),
  touchGeneSymbolInput: () => dispatch(touchGeneSymbolInput()),
  geneProteinIndexInputValueChange: (value) => dispatch(geneProteinIndexInputValueChange(value)),
  geneProteinValueInputValueChange: (value) => dispatch(geneProteinValueInputValueChange(value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProteinFinder);
