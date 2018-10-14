import React, { Component } from 'react';

class ProteinSequence extends Component {

  render() {
    const { sequence, position, check, replacement } = this.props;
    
    const hasPosition = (position !== undefined && position !== null && position < sequence.length);
    const hasReplacement = (replacement !== undefined && replacement !== null);
    const hasCheck = hasPosition && (check !== undefined && check !== null);

    const pre = (hasPosition) ? sequence.substring(0, position) : '';
    const self = (hasPosition) ? sequence[position] : '';
    const post = (hasPosition) ? sequence.substring(position + 1) : sequence;

    const checkPasses = !hasCheck || self === check;

    if(!checkPasses) {
      return (
        <div className={'protein-sequence'}>
          {pre}&nbsp;<span className={'protein-sequence-selected-position'}>[actual:{self}&nbsp;not:{check}]</span>&nbsp;{post}
        </div>
      );
    }

    if(hasCheck && checkPasses && hasReplacement) {
      return (
        <div className={'protein-sequence'}>
          {pre}&nbsp;<span className={'protein-sequence-selected-position replacement'}>{self}</span><span className={'protein-sequence-selected-position'}>&nbsp;&gt;&nbsp;{replacement}</span>&nbsp;{post}
        </div>
      );
    }

    return (
      <div className={'protein-sequence'}>
        {pre}&nbsp;<span className={'protein-sequence-selected-position'}>{self}</span>&nbsp;{post}
      </div>
    );
  }
}

export default ProteinSequence;
