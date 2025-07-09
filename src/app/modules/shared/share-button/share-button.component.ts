import { Component, inject, linkedSignal } from '@angular/core';
import { MetaTagsService } from '@services/utils/meta-tags.service';
import { NgOptimizedImage } from '@angular/common';
import { environment } from '@environments/environment.development';

@Component({
  selector: 'app-share-button',
  imports: [NgOptimizedImage],
  templateUrl: './share-button.component.html',
  styleUrl: './share-button.component.scss',
})
export class ShareButtonComponent {
  private metaService = inject(MetaTagsService);
  show = linkedSignal(()=> !!navigator.share);
  share() {

      navigator
        .share({
          text: this.metaService.getDescription(),
          title: this.metaService.getTitle(),
          url: window.location.href,
        })
        .then(() => {
          alert('Gracias por compartir!');
        })
        .catch(console.error);
  }
}
