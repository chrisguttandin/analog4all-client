import { select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IAppState } from '../interfaces';

const isFetchingInstrumentsSelector = (state: IAppState) => state.isFetchingInstruments;

export const createIsFetchingInstrumentsSelector = (store: Observable<IAppState>) => store
    .pipe(
        select(isFetchingInstrumentsSelector)
    );
