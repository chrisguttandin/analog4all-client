import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
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
            .catch((err) => {
                this._router.navigate([ '/' ]);

                return Observable.empty();
            });
    }

}
