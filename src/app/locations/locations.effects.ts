import { Injectable } from "@angular/core";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { tap } from "rxjs";
import { persistObject } from "../json-storage";
import { addLocation } from "./locations.actions";
import { locationsSelector } from "./locations.selectors";
import { LocationsState } from "./locations.state";

@Injectable()
export class LocationsEffects {

    persistLocationsState$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addLocation),
            concatLatestFrom(() => this.locationsStore.select(locationsSelector)),
            tap(([, locations]) => {
                persistObject("locations", locations);
            })
        ),
        { dispatch: false }
    );

    constructor(
        private actions$: Actions,
        private locationsStore: Store<LocationsState>
    ) { }
}