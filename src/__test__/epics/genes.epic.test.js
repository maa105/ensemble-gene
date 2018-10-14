import { of, throwError } from 'rxjs';
import { toArray } from 'rxjs/operators';

import geneEpics from '../../epics/genes.epic';
import { LOAD_PROTEIN, NOOP, LOADING_PROTEIN, PROTEIN_LOADED, ERROR_LOADING_PROTEIN } from '../../actions/index.js';

const state$ = of(
  { 
    gene: {
      proteins: {
        protein1: { id: 'protein1', seq: 'seq1' }
      },
      loadingProteins: {
        protein2: true
      },
      proteinsWithLoadingError: {
        protein3: { offline: true },
        protein4: { notFound: true }
      }
    }
  }
);

describe('load protein Epic', () => {
  test('noop dispatches in case protein already loaded', (done) => {
    const action$ = of(
      { type: LOAD_PROTEIN, proteinId: 'protein1' }
    );
    const expectedOutputActions = [{type: NOOP}];

    geneEpics(action$, state$)
    .pipe(toArray())
      .subscribe(actualOutputActions => {
        expect(actualOutputActions).toEqual(expectedOutputActions);
        done();
      }
    );
  });

  test('noop dispatches in case protein loading', (done) => {
    const action$ = of(
      { type: LOAD_PROTEIN, proteinId: 'protein2' }
    );
    const expectedOutputActions = [{type: NOOP}];

    geneEpics(action$, state$)
    .pipe(toArray())
      .subscribe(actualOutputActions => {
        expect(actualOutputActions).toEqual(expectedOutputActions);
        done();
      }
    );
  });

  test('noop dispatches in case protein loading had an error protein not found', (done) => {
    const action$ = of(
      { type: LOAD_PROTEIN, proteinId: 'protein4' }
    );
    const expectedOutputActions = [{type: NOOP}];

    geneEpics(action$, state$)
    .pipe(toArray())
      .subscribe(actualOutputActions => {
        expect(actualOutputActions).toEqual(expectedOutputActions);
        done();
      }
    );
  });

  test('loadingProtein and proteinLoaded dispatches in case protein loading had an error other than protein not found', (done) => {
    const action$ = of(
      { type: LOAD_PROTEIN, proteinId: 'protein3' }
    );
    const ajax = { get: jest.fn().mockImplementation(() => of({ response: 'test' })) };
    const expectedOutputActions = [
      { type: LOADING_PROTEIN, proteinId: 'protein3' },
      { type: PROTEIN_LOADED, protein: 'test', proteinId: 'protein3' },
    ];

    geneEpics(action$, state$, {ajax})
    .pipe(toArray())
      .subscribe(actualOutputActions => {
        expect(ajax.get.mock.calls.length).toBe(1);
        expect(ajax.get.mock.calls[0].length).toBe(2);
        expect(ajax.get.mock.calls[0][0]).toBe('http://rest.ensembl.org/sequence/id/protein3?content-type=application/json');
        expect(ajax.get.mock.calls[0][1]).toEqual({ 'Content-type': 'application/json', 'Accept': 'application/json' });
        expect(actualOutputActions).toEqual(expectedOutputActions);
        done();
      }
    );
  });

  test('loadingProtein and proteinLoaded dispatches in case this is a new protein search', (done) => {
    const action$ = of(
      { type: LOAD_PROTEIN, proteinId: 'protein5' }
    );
    const ajax = { get: jest.fn().mockImplementation(() => of({ response: 'test' })) };
    const expectedOutputActions = [
      { type: LOADING_PROTEIN, proteinId: 'protein5' },
      { type: PROTEIN_LOADED, protein: 'test', proteinId: 'protein5' },
    ];

    geneEpics(action$, state$, {ajax})
    .pipe(toArray())
      .subscribe(actualOutputActions => {
        expect(ajax.get.mock.calls.length).toBe(1);
        expect(ajax.get.mock.calls[0].length).toBe(2);
        expect(ajax.get.mock.calls[0][0]).toBe('http://rest.ensembl.org/sequence/id/protein5?content-type=application/json');
        expect(ajax.get.mock.calls[0][1]).toEqual({ 'Content-type': 'application/json', 'Accept': 'application/json' });
        expect(actualOutputActions).toEqual(expectedOutputActions);
        done();
      }
    );
  });

  test('loadingProtein and proteinLoaded dispatches in case this is a new protein search', (done) => {
    const action$ = of(
      { type: LOAD_PROTEIN, proteinId: 'protein6' }
    );
    const ajax = { get: jest.fn().mockImplementation(() => throwError({ errorMessage: 'Not found' })) };
    const expectedOutputActions = [
      { type: LOADING_PROTEIN, proteinId: 'protein6' },
      { type: ERROR_LOADING_PROTEIN, error: { errorMessage: 'Not found' }, proteinId: 'protein6' },
    ];

    geneEpics(action$, state$, {ajax})
    .pipe(toArray())
      .subscribe(actualOutputActions => {
        expect(ajax.get.mock.calls.length).toBe(1);
        expect(ajax.get.mock.calls[0].length).toBe(2);
        expect(ajax.get.mock.calls[0][0]).toBe('http://rest.ensembl.org/sequence/id/protein6?content-type=application/json');
        expect(ajax.get.mock.calls[0][1]).toEqual({ 'Content-type': 'application/json', 'Accept': 'application/json' });
        expect(actualOutputActions).toEqual(expectedOutputActions);
        done();
      }
    );
  });

});
