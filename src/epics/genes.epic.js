import { LOAD_GENE, GENE_LOADED, LOAD_GENE_PROTEINS, LOAD_PROTEIN, GENE_SYMBOL_INPUT_VALUE_CHANGE, HGVS_INPUT_VALUE_CHANGE } from '../actions';
import { noopAction, loadGene, loadingGene, loadGeneProteins, loadingGeneProteins, geneProteinsLoaded, errorLoadingGeneProteins, geneLoaded, errorLoadingGene, loadProtein, loadingProtein, proteinLoaded, errorLoadingProtein } from '../actions';
import { of, concat } from 'rxjs';
import { withLatestFrom, switchMap, catchError, map, debounceTime } from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';
import _ from 'lodash';
import { MIN_GENE_SYMBOL_DIGITS } from '../constants';
import { ajax } from 'rxjs/ajax';

const geneSymbolInputValueChangeEpic = (action$) => action$.pipe(
  ofType(GENE_SYMBOL_INPUT_VALUE_CHANGE),
  debounceTime(1000),
  map((action) => {
    if(action.value.length >= MIN_GENE_SYMBOL_DIGITS) {
      return loadGene(action.value);
    }
    else {
      return noopAction();
    }
  })
);

const hgvsInputValueChangeEpic = (action$, state$) => action$.pipe(
  ofType(HGVS_INPUT_VALUE_CHANGE),
  debounceTime(1000),
  withLatestFrom(state$),
  map(([action,state]) => {
    let proteinId = state.gene.HGVSInputValueValidationResult && state.gene.HGVSInputValueValidationResult.proteinId;
    if(proteinId) {
      return loadProtein(proteinId);
    }
    else {
      return noopAction();
    }
  })
);

const geneProteinsLoadedEpic = action$ => action$.pipe(
  ofType(GENE_LOADED),
  map((action) => loadGeneProteins(action.gene))
);

const loadGeneEpic = (action$, state$, { ajax }) => action$.pipe(
  ofType(LOAD_GENE),
  withLatestFrom(state$),
  switchMap(([action,state]) => {
    const geneSymbol = action.symbol.trim().toLowerCase();
    if(!state.gene.genes[geneSymbol] && 
      !state.gene.loadingGenes[geneSymbol] && 
      (!state.gene.genesWithLoadingError[geneSymbol] || 
        !state.gene.genesWithLoadingError[geneSymbol].notFound)) {
      return concat(of(loadingGene(action.symbol, action.species)),
        ajax.get('http://rest.ensembl.org/lookup/symbol/' + action.species + '/' + geneSymbol.toUpperCase() + '.json?;expand=1',
          { 'Accept': 'application/json' }).pipe(
          map(result => {
            return geneLoaded(result.response, action.symbol, action.species);
          }),
          catchError((err) => of(errorLoadingGene(err, action.symbol, action.species)))
        )
      );
    }
    else {
      return of(noopAction());
    }
  })
);

const loadGeneProteinsEpic = (action$, state$, { ajax }) => action$.pipe(
  ofType(LOAD_GENE_PROTEINS),
  withLatestFrom(state$),
  switchMap(([action, state]) => {
    const geneSymbol = action.gene.display_name.toLowerCase();
    if(!state.gene.proteinsByGene[geneSymbol] && 
      !state.gene.loadingGeneProteins[geneSymbol] && 
      (!state.gene.genesWithLoadingError[geneSymbol] ||
        !state.gene.genesWithLoadingError[geneSymbol].notFound)) {
      const ids =_.map(action.gene.Transcript, 'id');
      return concat(of(loadingGeneProteins(action.gene)),
        ajax.post('http://rest.ensembl.org/sequence/id', 
          '{"ids":' + JSON.stringify(ids) + ',"type":"protein"}',
          { 'Content-type': 'application/json', 'Accept': 'application/json' }).pipe(
          map(result => {
            return geneProteinsLoaded(result.response, action.gene);
          }),
          catchError((err) => of(errorLoadingGeneProteins(err, action.gene)))
        )
      );
    }
    else {
      return of(noopAction());
    }
  })
);

const loadProteinEpic = (action$, state$, { ajax }) => action$.pipe(
  ofType(LOAD_PROTEIN),
  withLatestFrom(state$),
  switchMap(([action, state]) => {
    const proteinId = action.proteinId.trim().toLowerCase();
    if(!state.gene.proteins[proteinId] && 
      !state.gene.loadingProteins[proteinId] && 
      (!state.gene.proteinsWithLoadingError[proteinId] ||
        !state.gene.proteinsWithLoadingError[proteinId].notFound)) {
      return concat(of(loadingProtein(proteinId)),
        ajax.get('http://rest.ensembl.org/sequence/id/' + proteinId + '?content-type=application/json', 
          { 'Content-type': 'application/json', 'Accept': 'application/json' }).pipe(
          map(result => {
            return proteinLoaded(result.response, proteinId);
          }),
          catchError((err) => of(errorLoadingProtein(err, proteinId)))
        )
      );
    }
    else {
      return of(noopAction());
    }
  })
);

const genesEpic = (...args) => combineEpics(
  geneSymbolInputValueChangeEpic,
  hgvsInputValueChangeEpic,
  geneProteinsLoadedEpic,
  loadGeneEpic,
  loadGeneProteinsEpic,
  loadProteinEpic
)(...args, { ajax });

export default genesEpic;
