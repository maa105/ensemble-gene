export const NOOP = 'NOOP';

export const LOAD_GENE = 'LOAD_GENE';
export const LOADING_GENE = 'LOADING_GENE';
export const GENE_LOADED = 'GENE_LOADED';
export const ERROR_LOADING_GENE = 'ERROR_LOADING_GENE';

export const LOAD_GENE_PROTEINS = 'LOAD_GENE_PROTEINS';
export const LOADING_GENE_PROTEINS = 'LOADING_GENE_PROTEINS';
export const GENE_PROTEINS_LOADED = 'GENE_PROTEINS_LOADED';
export const ERROR_LOADING_GENE_PROTEINS = 'ERROR_LOADING_GENE_PROTEINS';

export const LOAD_PROTEIN = 'LOAD_PROTEIN';
export const LOADING_PROTEIN = 'LOADING_PROTEIN';
export const PROTEIN_LOADED = 'PROTEIN_LOADED';
export const ERROR_LOADING_PROTEIN = 'ERROR_LOADING_PROTEIN';

export const GENE_SYMBOL_INPUT_VALUE_CHANGE = 'GENE_SYMBOL_INPUT_VALUE_CHANGE';
export const TOUCH_GENE_SYMBOL_INPUT = 'TOUCH_GENE_SYMBOL_INPUT';
export const GENE_PROTEIN_INDEX_INPUT_VALUE_CHANGE = 'GENE_PROTEIN_INDEX_INPUT_VALUE_CHANGE';
export const GENE_PROTEIN_VALUE_INPUT_VALUE_CHANGE = 'GENE_PROTEIN_VALUE_INPUT_VALUE_CHANGE';

export const HGVS_INPUT_VALUE_CHANGE = 'HGVS_INPUT_VALUE_CHANGE';
export const TOUCH_HGVS_INPUT = 'TOUCH_HGVS_INPUT';

export const noopAction = () => ({
  type: NOOP
});

export const loadGeneProteins = (gene) => ({
  type: LOAD_GENE_PROTEINS,
  gene
});

export const loadingGeneProteins = (gene) => ({
  type: LOADING_GENE_PROTEINS,
  gene
});

export const geneProteinsLoaded = (proteins, gene) => ({
  type: GENE_PROTEINS_LOADED,
  proteins,
  gene
});

export const errorLoadingGeneProteins = (error, gene) => ({
  type: ERROR_LOADING_GENE_PROTEINS,
  error,
  gene
});

export const loadGene = (symbol, species = 'homo_sapiens') => ({
  type: LOAD_GENE,
  symbol,
  species
});

export const loadingGene = (symbol, species = 'homo_sapiens') => ({
  type: LOADING_GENE,
  symbol,
  species
});

export const geneLoaded = (gene, symbol, species) => ({
  type: GENE_LOADED,
  gene,
  symbol,
  species
});

export const errorLoadingGene = (error, symbol, species) => ({
  type: ERROR_LOADING_GENE,
  error,
  symbol,
  species
});

export const loadProtein = (proteinId) => ({
  type: LOAD_PROTEIN,
  proteinId
});

export const loadingProtein = (proteinId) => ({
  type: LOADING_PROTEIN,
  proteinId
});

export const proteinLoaded = (protein, proteinId) => ({
  type: PROTEIN_LOADED,
  protein,
  proteinId
});

export const errorLoadingProtein = (error, proteinId) => ({
  type: ERROR_LOADING_PROTEIN,
  error,
  proteinId
});

export const geneSymbolInputValueChange = (value) => ({
  type: GENE_SYMBOL_INPUT_VALUE_CHANGE,
  value
});

export const touchGeneSymbolInput = () => ({
  type: TOUCH_GENE_SYMBOL_INPUT
});

export const geneProteinIndexInputValueChange = (value) => ({
  type: GENE_PROTEIN_INDEX_INPUT_VALUE_CHANGE,
  value
});

export const geneProteinValueInputValueChange = (value) => ({
  type: GENE_PROTEIN_VALUE_INPUT_VALUE_CHANGE,
  value
});

export const HGVSInputValueChange = (value) => ({
  type: HGVS_INPUT_VALUE_CHANGE,
  value
});

export const touchHGVSInput = (value) => ({
  type: TOUCH_HGVS_INPUT,
  value
});
