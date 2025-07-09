import { inject, Injectable, linkedSignal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { environment } from '@environments/environment.development';
import { Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class CanonicalUrlService {
  private router = inject(Router);
  private meta = inject(Meta);
  url = linkedSignal(() => environment.base_url + this.router.url);

  public setupCanonicalLink(): void {
    // Update canonical URL on route changes
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.url.set(environment.base_url + this.router.url);

      // Remove any existing canonical link
      this.removeExistingCanonicalLink();

      this.setCanonicalLink(this.url());


    });

    this.setInitialCanonicalLink();

  }


  private setCanonicalLink(url: string): void {
    // Remove any existing canonical link
    this.removeExistingCanonicalLink();

    // Create a new canonical link element
    const link: HTMLLinkElement = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    link.setAttribute('href', url);

    // Append the canonical link to the document head
    document.head.appendChild(link);
  }


  /**
   * Sets the initial canonical link based on the current URL.
   * This is called when the service is initialized to ensure the canonical link is set correctly.
   */
  private setInitialCanonicalLink(): void {
    const initialUrl = environment.base_url + this.router.url;
    this.meta.updateTag({ property: 'og:url', content: initialUrl });
  }

  /**
   * Removes any existing canonical link from the document head.
   */
  private removeExistingCanonicalLink(): void {
    const existingLink = document.querySelector('link[rel="canonical"]');
    if (existingLink) {
      existingLink.remove();
    }
  }
}
