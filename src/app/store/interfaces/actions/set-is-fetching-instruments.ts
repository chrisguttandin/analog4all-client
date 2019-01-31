import { Action } from '@ngrx/store';

export interface ISetIsFetchingInstrumentsAction extends Action {

    readonly payload: boolean;

    type: 'SET_IS_FETCHING_INSTRUMENTS';

}
