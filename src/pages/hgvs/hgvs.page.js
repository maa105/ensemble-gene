import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import { MIN_HGVS_INPUT_LENGTH } from '../../constants';
import { HGVSInputValueChange, touchHGVSInput, loadProtein } from '../../actions';
import HGVSValidationResult from '../../components/hgvs/hgvs-validation-results.component';

class HGVS extends Component {
  constructor(props) {
    super(props);

    this.validateHGVS = this.validateHGVS.bind(this);
    this.touchHGVSInput = this.touchHGVSInput.bind(this);
    this.HGVSInputValueChange = this.HGVSInputValueChange.bind(this);
  }

  validateHGVS() {
    if(!this.props.HGVSInputTouched && !this.props.HGVSInputValue.length) {
      return null;
    }
    if(this.props.HGVSInputValue.length < MIN_HGVS_INPUT_LENGTH) {
      return 'warning';
    }
    if(this.props.HGVSInputValueValidationResult.error) {
      return 'warning';
    }
    return null;
  }

  touchHGVSInput() {
    this.props.touchHGVSInput();
  }

  HGVSInputValueChange(e) {
    this.props.HGVSInputValueChange(e.target.value);
  }

  render() {    

    return (
      <React.Fragment>
        <FormGroup controlId="hgvsInput" validationState={this.validateHGVS()}>
          <ControlLabel>HGVS Input</ControlLabel>
          <FormControl
            onBlur={this.touchHGVSInput}
            type="text"
            value={this.props.HGVSInputValue}
            placeholder="e.g. ENSP00000419060.2:p.Val600Glu"
            onChange={this.HGVSInputValueChange}
          />
          <FormControl.Feedback />
          {
            (this.props.HGVSInputTouched || this.props.HGVSInputValue.length) && this.props.HGVSInputValue.length < MIN_HGVS_INPUT_LENGTH ? 
              <HelpBlock>Input too short</HelpBlock> : null
          }
        </FormGroup>
        <HGVSValidationResult validationResult={this.props.HGVSInputValueValidationResult} input={this.props.HGVSInputValue} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  HGVSInputValue: state.gene.HGVSInputValue,
  HGVSInputValueValidationResult: state.gene.HGVSInputValueValidationResult,
  HGVSInputTouched: state.gene.HGVSInputTouched,
  proteins: state.gene.proteins,
  loadingProteins: state.gene.loadingProteins,
  proteinsWithLoadingError: state.gene.proteinsWithLoadingError
});

const mapDispatchToProps = dispatch => ({
  HGVSInputValueChange: (value) => dispatch(HGVSInputValueChange(value)),
  touchHGVSInput: () => dispatch(touchHGVSInput()),
  loadProtein: (proteinId) => dispatch(loadProtein(proteinId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HGVS);
