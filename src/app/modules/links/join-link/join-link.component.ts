import { Component, effect, inject, input, output, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Link } from '@model/Link';
import { LinkService } from '@http/link.service';
import { LinkFormComponent } from '@modules/links/link-form/link-form.component';
import { LinkComponent } from '@modules/links/link/link.component';

@Component({
  selector: 'app-join-link',
  imports: [LinkFormComponent, LinkComponent],
  templateUrl: './join-link.component.html',
  styleUrl: './join-link.component.css',
  standalone: true,
})
export class JoinLinkComponent {
  private service = inject(LinkService);
  readonly initialLinks = input<Link[]>();
  tagsResource = rxResource({
    loader: () => {
      return this.service.getAll();
    },
  });
  currentLinks = signal<Link[]>([]);
  finalLinks = output<Link[]>();

  show = signal<boolean>(false);

  constructor() {
    effect(() => {
      this.initialLinks();
      this.currentLinks.set(this.initialLinks()!);
    });
  }

  toggleShow() {
    this.show.set(!this.show());
  }

  reset() {
    this.currentLinks.set([]);
  }

  removeLink(link: Link) {
    const updatedLinks = this.currentLinks().filter((t) => t.id !== link.id);
    this.currentLinks.set(updatedLinks);
    this.finalLinks.emit(updatedLinks);
  }

  addLink(link: Link) {
    if (!this.currentLinks().some((t) => t.id === link.id)) {
      const updatedLinks = [...this.currentLinks(), link];
      this.currentLinks.set(updatedLinks);
      this.finalLinks.emit(updatedLinks);
    }
  }
}
