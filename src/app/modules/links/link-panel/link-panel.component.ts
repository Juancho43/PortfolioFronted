import { Component, inject, signal } from '@angular/core';
import { Link } from '@model/Link';
import { rxResource } from '@angular/core/rxjs-interop';
import { LinkService } from '@http/link.service';
import { LinkComponent } from '@modules/links/link/link.component';
import { LinkFormComponent } from '@modules/links/link-form/link-form.component';

@Component({
  selector: 'app-link-panel',
  standalone: true,
  imports: [LinkComponent, LinkFormComponent],
  templateUrl: './link-panel.component.html',
  styleUrl: './link-panel.component.scss',
})
export default class LinkPanelComponent {
  private service = inject(LinkService);
  currentLink = signal<Link>({} as Link);
  linksResource = rxResource({
    loader: () => {
      return this.service.getAll();
    },
  });

  selectHandler(link: Link) {
    this.currentLink.set(link);
  }

  handleClearForm() {
    this.currentLink.set({} as Link);
    this.linksResource.reload();
  }
}
