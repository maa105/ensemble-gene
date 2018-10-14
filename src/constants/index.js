import _ from 'lodash';

export const MIN_GENE_SYMBOL_DIGITS = 3;
export const MIN_HGVS_INPUT_LENGTH = 8;
export const PROTEIN_SEQUENCE_START_INDEX = 1;
export const PROTEIN_NUMBER_MIN_LENGTH = 11;
export const PROTEIN_NUMBER_MAX_LENGTH = 11;

export const PROTEIN_ALPHABET = {
  G: { name: 'Glycine', symbol: 'Gly' },
  P: { name: 'Proline', symbol: 'Pro' },
  A: { name: 'Alanine', symbol: 'Ala' },
  V: { name: 'Valine', symbol: 'Val' },
  L: { name: 'Leucine', symbol: 'Leu' },
  I: { name: 'Isoleucine', symbol: 'Ile' },
  M: { name: 'Methionine', symbol: 'Met' },
  C: { name: 'Cysteine', symbol: 'Cys' },
  F: { name: 'Phenylalanine', symbol: 'Phe' },
  Y: { name: 'Tyrosine', symbol: 'Tyr' },
  W: { name: 'Tryptophan', symbol: 'Trp' },
  H: { name: 'Histidine', symbol: 'His' },
  K: { name: 'Lysine', symbol: 'Lys' },
  R: { name: 'Arginine', symbol: 'Arg' },
  Q: { name: 'Glutamine', symbol: 'Gln' },
  N: { name: 'Asparagine', symbol: 'Asn' },
  E: { name: 'Glutamic Acid', symbol: 'Glu' },
  D: { name: 'Aspartic Acid', symbol: 'Asp' },
  S: { name: 'Serine', symbol: 'Ser' },
  T: { name: 'Threonine', symbol: 'Thr' },
  X: { name: 'X', symbol: 'X' }
};

export const PROTEIN_ALPHABET_ARRAY = _.map(PROTEIN_ALPHABET, (val, key) => ({
  key,
  name: val.name,
  symbol: val.symbol
})).sort((a, b) => {
  return a.key.charCodeAt(0) - b.key.charCodeAt(0);
});
