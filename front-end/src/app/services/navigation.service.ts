import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  /**
   * Takes a full URL and gets the current page from it.
   *
   * @param url The current URL.
   * @returns The page the user was on.
   */
  public getCurrentPageFromURL(url: string): string {
    const splitUrl = url.split('/');

    // Magic number, but the third spot is the page that the user is on.
    if (splitUrl.length >= 3) {
      return splitUrl[3];
    }

    return undefined;
  }
}
