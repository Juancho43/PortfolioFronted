import { DOCUMENT, Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CanonicalUrlService {
  constructor(
    private router: Router,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.setCanonicalLink();
    });
  }

  setCanonicalLink() {
    if (!isPlatformBrowser(this.platformId)) {
      return; // Skip on server side
    }

    // Create the canonical URL
    const canURL = this.document.URL;

    // Remove any existing canonical links
    this.removeExistingCanonicalLink();

    // Add the new canonical link
    const link: HTMLLinkElement = this.document.createElement('link');
    link.rel = 'canonical';
    link.href = canURL;
    this.document.head.appendChild(link);
  }

  removeExistingCanonicalLink() {
    if (!isPlatformBrowser(this.platformId)) {
      return; // Skip on server side
    }

    const links = this.document.querySelectorAll('link[rel="canonical"]');
    links.forEach(link => {
      link.parentNode?.removeChild(link);
    });
  }
}
