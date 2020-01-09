import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';
import { mergeMap } from 'rxjs/operators';

import { ToastActions } from '../actions';

@Injectable()
export class ToastEffects {
  constructor(
    private actions: Actions,
    private toastrService: ToastrService
  ) {}

  public showToast = createEffect(() =>
    this.actions.pipe(
      ofType(ToastActions.showToast),
      mergeMap(action => {
        this.toastrService[action.toastType](action.message, '', {
          positionClass: 'toast-bottom-center',
          timeOut: 3000
        });

        return [];
      })
    ),
    { dispatch: false }
  );
}
