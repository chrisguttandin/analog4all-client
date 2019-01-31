import { select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TAppState } from '../types';

const isFetchingInstrumentsSelector = (state: TAppState) => state.isFetchingInstruments;

export const createIsFetchingInstrumentsSelector = (store: Observable<TAppState>) => store
    .pipe(
        select(isFetchingInstrumentsSelector)
    );
