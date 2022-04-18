import { Location } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  public addItemIDToURL(currentId: string, newId: string, location: Location, url: string): void {
    // Only change the URL if the user selects a different item then the one already selected.
    if (currentId !== newId) {
      const splitUrl = url.split('/');
      splitUrl.pop();

      // If the user already has an item selected, replace that part of the URL with the new ID.
      location.replaceState(splitUrl.join('/') + '/' + newId);
    }
  }
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

  public removeIDFromURL(location: Location, url: string): void {
    const splitUrl = url.split('/');
    splitUrl.pop();

    location.replaceState(splitUrl.join('/'));
  }
}
