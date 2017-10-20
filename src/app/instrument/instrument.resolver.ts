import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { empty } from 'rxjs/observable/empty';
import { catchError } from 'rxjs/operators';
import { IInstrument } from '../interfaces';
import { InstrumentsService } from '../shared';

@Injectable()
export class InstrumentResolver implements Resolve<IInstrument> {

    constructor (
        private _instrumentsService: InstrumentsService,
        private _router: Router
    ) { }

    public resolve (activatedRoute: ActivatedRouteSnapshot) {
        return this._instrumentsService
            .get(activatedRoute.params['id'])
            .pipe(
                catchError(() => {
                    this._router.navigate([ '/' ]);

                    return empty();
                })
            );
    }

}
