import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';
import { mergeMap } from 'rxjs/operators';

import { ToastActions } from '../actions';

@Injectable()
export class ToastEffects {
  public showToast = createEffect(() =>
    this.actions.pipe(
      ofType(ToastActions.showToast),
      mergeMap(action => {
        let message = action.message;

        if (typeof message !== 'string') {
          message = 'An unexpected error occured';
        }

        this.toastrService[action.toastType](message, '', {
          closeButton: true,
          positionClass: 'toast-bottom-right',
          timeOut: 5000
        });

        return [];
      })
    ),
    { dispatch: false }
  );

  constructor(
    private actions: Actions,
    private toastrService: ToastrService
  ) {}
}
