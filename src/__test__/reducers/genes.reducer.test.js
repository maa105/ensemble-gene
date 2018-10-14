import { GENE_SYMBOL_INPUT_VALUE_CHANGE } from '../../actions/index.js';
import geneReducer from '../../reducers/genes.reducer';

const state = {
  geneSymbolInputValue: '',
  geneSymbolInputTouched: false,
  geneProteinIndexInputValue: 600,
  geneProteinValueInputValue: 'V',
  HGVSInputValue: '',
  HGVSInputValueValidationResult: null,
  HGVSInputTouched: false,

  genes: {},
  proteinsByGene: {},
  proteins: {},

  loadingGenes: {},
  loadingGeneProteins: {},
  loadingProteins: {},

  genesWithLoadingError: {},
  genesWithProteinsLoadingError: {},
  proteinsWithLoadingError: {}
};

describe('gene reducer', () => {
  test('check initial state of gene reducer', () => {
    const initState = geneReducer(undefined, {});
    expect(initState).toEqual({
      geneSymbolInputValue: '',
      geneSymbolInputTouched: false,
      geneProteinIndexInputValue: 600,
      geneProteinValueInputValue: 'V',
      HGVSInputValue: '',
      HGVSInputValueValidationResult: null,
      HGVSInputTouched: false,
    
      genes: {},
      proteinsByGene: {},
      proteins: {},
    
      loadingGenes: {},
      loadingGeneProteins: {},
      loadingProteins: {},
    
      genesWithLoadingError: {},
      genesWithProteinsLoadingError: {},
      proteinsWithLoadingError: {}
    });
  });

  test('should return same state if no known action is called', () => {
    const returnedState = geneReducer(state, { type: 'xyz' });
    expect(returnedState).toBe(state);
  });

  test('should change geneSymbolInputValue when GENE_SYMBOL_INPUT_VALUE_CHANGE is called without mutating the original state', () => {
    const returnedState = geneReducer(state, { type: GENE_SYMBOL_INPUT_VALUE_CHANGE, value: 'something' });
    expect(returnedState.geneSymbolInputValue).toBe('something');
    expect(state.geneSymbolInputValue).toBe('');
  });

});
