import { LOADING_GENE, GENE_LOADED, ERROR_LOADING_GENE, LOADING_GENE_PROTEINS, GENE_PROTEINS_LOADED, ERROR_LOADING_GENE_PROTEINS, GENE_SYMBOL_INPUT_VALUE_CHANGE, GENE_PROTEIN_INDEX_INPUT_VALUE_CHANGE, GENE_PROTEIN_VALUE_INPUT_VALUE_CHANGE, TOUCH_GENE_SYMBOL_INPUT, LOADING_PROTEIN, HGVS_INPUT_VALUE_CHANGE, TOUCH_HGVS_INPUT, PROTEIN_LOADED, ERROR_LOADING_PROTEIN } from '../actions';
import _ from 'lodash';
import { MIN_HGVS_INPUT_LENGTH } from '../constants';
import parse from '../utils/parser.util';

const genesReducer = (state = {
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
}, action) => {
  switch (action.type) {
    case GENE_SYMBOL_INPUT_VALUE_CHANGE:
      return _.assign({}, state, { 
        geneSymbolInputValue: action.value
      });
    case TOUCH_GENE_SYMBOL_INPUT:
      if(state.geneSymbolInputTouched) {
        return state;
      }
      return _.assign({}, state, { 
        geneSymbolInputTouched: true
      });
    case GENE_PROTEIN_INDEX_INPUT_VALUE_CHANGE:
      return _.assign({}, state, { 
        geneProteinIndexInputValue: parseInt(action.value, 10) || 0
      });
    case GENE_PROTEIN_VALUE_INPUT_VALUE_CHANGE:
      return _.assign({}, state, { 
        geneProteinValueInputValue: (action.value ? action.value.substr(action.value.length - 1).toUpperCase() : '')
      });
    case HGVS_INPUT_VALUE_CHANGE:
      return _.assign({}, state, { 
        HGVSInputValue: action.value,
        HGVSInputValueValidationResult: action.value.length >= MIN_HGVS_INPUT_LENGTH ? parse(action.value) : null
      });
    case TOUCH_HGVS_INPUT:
      if(state.HGVSInputTouched) {
        return state;
      }
      return _.assign({}, state, { 
        HGVSInputTouched: true
      });
    case LOADING_PROTEIN:
      return _.assign({}, state, { 
        loadingProteins: _.assign({}, state.loadingProteins, { [action.proteinId.trim().toLowerCase()]: true }),
        proteinsWithLoadingError: _.assign({}, state.proteinsWithLoadingError, { [action.proteinId.trim().toLowerCase()]: false })
      });
    case PROTEIN_LOADED:
      return _.assign({}, state, { 
        proteins: _.assign({}, state.proteins, { [action.proteinId.trim().toLowerCase()]: action.protein }),
        loadingProteins: _.assign({}, state.loadingProteins, { [action.proteinId.trim().toLowerCase()]: false })
      });
    case ERROR_LOADING_PROTEIN:
      const proteinLoadingError = {
        status: action.error.status,
        message: action.error.response && action.error.response.error,
        notFound: action.error.response && (action.error.response.error.indexOf('ID \'') === 0) && (action.error.response.error.indexOf('not found') > 0),
        offline: !action.error.response
      };
      return _.assign({}, state, {
        proteinsWithLoadingError: _.assign({}, state.proteinsWithLoadingError, { [action.proteinId.trim().toLowerCase()]: proteinLoadingError }),
        loadingProteins: _.assign({}, state.loadingProteins, { [action.proteinId.trim().toLowerCase()]: false })
      });
    case LOADING_GENE:
      return _.assign({}, state, { 
        loadingGenes: _.assign({}, state.loadingGenes, { [action.symbol.trim().toLowerCase()]: true }),
        genesWithLoadingError: _.assign({}, state.genesWithLoadingError, { [action.symbol.trim().toLowerCase()]: false })
      });
    case GENE_LOADED:
      return _.assign({}, state, { 
        genes: _.assign({}, state.genes, { [action.symbol.trim().toLowerCase()]: action.gene }),
        loadingGenes: _.assign({}, state.loadingGenes, { [action.symbol.trim().toLowerCase()]: false })
      });
    case ERROR_LOADING_GENE:
      const geneLoadingError = {
        status: action.error.status,
        message: action.error.response && action.error.response.error,
        notFound: action.error.response && (action.error.response.error.indexOf('No valid lookup found for symbol ') === 0),
        offline: !action.error.response
      };
      return _.assign({}, state, {
        genesWithLoadingError: _.assign({}, state.genesWithLoadingError, { [action.symbol.trim().toLowerCase()]: geneLoadingError }),
        loadingGenes: _.assign({}, state.loadingGenes, { [action.symbol.trim().toLowerCase()]: false })
      });
    case LOADING_GENE_PROTEINS:
      return _.assign({}, state, { 
        loadingGeneProteins: _.assign({}, state.loadingGeneProteins, { [action.gene.display_name.toLowerCase()]: true }),
        genesWithProteinsLoadingError: _.assign({}, state.genesWithProteinsLoadingError, { [action.gene.display_name.toLowerCase()]: false})
      });
    case GENE_PROTEINS_LOADED:
      return _.assign({}, state, { 
        proteinsByGene: _.assign({}, state.proteinsByGene, { [action.gene.display_name.toLowerCase()]: action.proteins}),
        loadingGeneProteins: _.assign({}, state.loadingGeneProteins, { [action.gene.display_name.toLowerCase()]: false })
      });
    case ERROR_LOADING_GENE_PROTEINS:
      const geneProteinsLoadingError = {
        status: action.error.status,
        message: action.error.response && action.error.response.error,
        offline: !action.error.response
      };
      return _.assign({}, state, { 
        genesWithProteinsLoadingError: _.assign({}, state.genesWithProteinsLoadingError, { [action.gene.display_name.toLowerCase()]: geneProteinsLoadingError}),
        loadingGeneProteins: _.assign({}, state.loadingGeneProteins, { [action.gene.display_name.toLowerCase()]: false })
      });
    default:
      return state;
  }
};

export default genesReducer;
