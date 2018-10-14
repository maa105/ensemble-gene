import { combineEpics } from 'redux-observable';
import genesEpic from './genes.epic';

export const rootEpic = combineEpics(
  genesEpic
);
