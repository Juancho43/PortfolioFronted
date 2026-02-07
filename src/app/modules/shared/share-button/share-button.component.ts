import { Component, inject, linkedSignal } from '@angular/core';
import { MetaTagsService } from '@services/utils/meta-tags.service';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-share-button',
  imports: [NgOptimizedImage],
  templateUrl: './share-button.component.html',
  styleUrl: './share-button.component.scss',
})
export class ShareButtonComponent {
  private metaService = inject(MetaTagsService);
  show = linkedSignal(() => typeof window !== 'undefined' && !!window.navigator && !!window.navigator.share);
  share() {

      navigator
        .share({
          text: 'Portfolio Bravo Juan Alè',
          title: this.metaService.getTitle(),
          url: window.location.href,
        })
        .then(() => {
          alert('Gracias por compartir!');
        })
        .catch(console.error);
  }
}
