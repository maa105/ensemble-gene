import _ from 'lodash';
import { PROTEIN_ALPHABET_ARRAY, PROTEIN_NUMBER_MIN_LENGTH, PROTEIN_NUMBER_MAX_LENGTH } from '../constants';

const aminoAcidSymbols = _.map(PROTEIN_ALPHABET_ARRAY, 'symbol');
const aminoAcidSymbolsStr = aminoAcidSymbols.join();

const parseAllowedChars = (str, index, data, key, allowed) => {
  let i = index;
  for(; i < str.length; i++) {
    if(allowed.indexOf(str[i]) < 0) {
      if(index === i) {
        return -1;
      }
      data[key] = str.substring(index, i);
      return i;
    }
  }
  if(index === i) {
    return -1;
  }
  data[key] = str.substring(index, i);
  return i;
};

const parseOptions = (str, index, data, key, options) => {
  let matches = [];
  let i = index;
  const parseOptionsFilterFunction = (opt) => {
    if(opt[i - index].toUpperCase() !== str[i].toUpperCase()) {
      return false;
    }
    if(opt.length - 1 === i - index) {
      matches.push({ opt, i: i + 1 });
      return false;
    }
    return true;
  }
  for(; i < str.length && options.length; i++) {
    options = _.filter(options, parseOptionsFilterFunction);
  }
  if(matches.length) {
    const match = _.last(matches);
    data[key] = match.opt;
    return match.i;
  }
  return - 1;
};

const parse = (str) => {
  str = str.trim();
  const data = {};
  let i = 0;
  let j = parseAllowedChars(str, i, data, 'prefix', 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_-');
  if(j === -1) {
    return _.assign(data, {
      error: 'Missing prefix',
      at: i
    });
  }

  i = j;

  j = parseAllowedChars(str, i, data, 'number', '0123456789');
  if(j === -1) {
    return _.assign(data, {
      error: 'Missing number',
      at: i
    });
  }

  if(data.number.length < PROTEIN_NUMBER_MIN_LENGTH) {
    return _.assign(data, {
      error: 'Number length too short(' + data.number.length + ') should be at least ' + PROTEIN_NUMBER_MIN_LENGTH + ' numbers',
      at: i
    });
  }
  if(data.number.length > PROTEIN_NUMBER_MAX_LENGTH) {
    return _.assign(data, {
      error: 'Number length too long(' + data.number.length + ') should be at most ' + PROTEIN_NUMBER_MAX_LENGTH + ' numbers',
      at: i
    });
  }

  data.proteinId = data.prefix + data.number;

  i = j;
  if(str[i] === '.') { // version
    i++; // skip the .
    j = parseAllowedChars(str, i, data, 'version', '0123456789');
    if(j === -1) {
      return _.assign(data, {
        error: 'Missing version number after "."',
        at: i
      });
    }

    data.proteinId = data.prefix + data.number + '.' + data.version;

    i = j;
    if(str[i] !== ':') {
      return _.assign(data, {
        error: 'Missing ":" after version',
        at: i
      });
    }
  }
  else if(str[i] !== ':') {
    return _.assign(data, {
      error: 'Missing "."(for version) or ":"(for type) after number',
      at: i
    });
  }

  i++;  // skip the ":"

  j = parseOptions(str, i, data, 'type', ['p']);

  if(j === -1) {
    return _.assign(data, {
      error: 'Missing type should be "p."',
      at: i
    });
  }
  
  i = j;

  if(str[i] !== '.') {
    return _.assign(data, {
      error: 'Missing "." after p',
      at: i
    });
  }

  i++;  // skip the "."

  if(i === str.length) {
    return _.assign(data, {
      error: 'Missing source amino acid symbol after "p."',
      at: i
    });
  }

  j = parseOptions(str, i, data, 'sourceAminoAcid', aminoAcidSymbols);

  if(j === -1) {
    return _.assign(data, {
      error: 'Missing valid source amino acid symbol after "p." should be one of [' + aminoAcidSymbolsStr + ']',
      at: i
    });
  }

  data.sourceAminoAcid = _.find(PROTEIN_ALPHABET_ARRAY, (letter) => {
    return letter.symbol.toLowerCase() === data.sourceAminoAcid.toLowerCase();
  }).key;

  i = j;

  j = parseAllowedChars(str, i, data, 'aminoAcidIndex', '0123456789');

  if(j === -1) {
    return _.assign(data, {
      error: 'Missing position number after source amino acid',
      at: i
    });
  }

  data.aminoAcidIndex = parseInt(data.aminoAcidIndex, 10);

  i = j;

  if(i === str.length) {
    return _.assign(data, {
      error: 'Missing replacement amino acid after position index',
      at: i
    });
  }

  j = parseOptions(str, i, data, 'replacementAminoAcid', aminoAcidSymbols);

  if(j === -1) {
    return _.assign(data, {
      error: 'Missing valid replacement amino acid after position index should be one of [' + aminoAcidSymbolsStr + ']',
      at: i
    });
  }

  data.replacementAminoAcid = _.find(PROTEIN_ALPHABET_ARRAY, (letter) => {
    return letter.symbol.toLowerCase() === data.replacementAminoAcid.toLowerCase();
  }).key;

  i = j;

  if(i !== str.length) {
    return _.assign(data, {
      error: 'Invalid extra characters after replacement amino acid',
      at: i
    });
  }

  return data;
};

export default parse;
