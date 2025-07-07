import { Component, effect, input, output, signal } from '@angular/core';
import { Link } from '@model/Link';

import { LinkMiniFormComponent } from '@modules/links/link-mini-form/link-mini-form.component';
import { LinkComponent } from '@modules/links/link/link.component';

@Component({
  selector: 'app-join-link',
  standalone: true,
  imports: [LinkMiniFormComponent, LinkComponent],
  templateUrl: './join-link.component.html',
  styleUrl: './join-link.component.scss',
})
export class JoinLinkComponent {
  readonly initialLinks = input.required<Link[]>();

  currentLinks = signal<Link[]>([]);
  selectedLink = signal<Link>({} as Link);
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

  editLink(link: Link) {
    this.selectedLink.set(link);
  }
  handleClearForm() {
    this.selectedLink.set({} as Link);
  }

  addLink(link: Link) {
    if (!this.currentLinks().some((t) => t.id === link.id)) {
      const updatedLinks = [...this.currentLinks(), link];
      this.currentLinks.set(updatedLinks);
      this.finalLinks.emit(updatedLinks);
    }
  }

  updateLink(link: Link) {
    const updatedLinks = this.currentLinks().map((t) => (t.id === link.id ? link : t));
    this.currentLinks.set(updatedLinks);
    this.finalLinks.emit(updatedLinks);
  }

  removeLink(link: Link) {
    const updatedLinks = this.currentLinks().filter((t) => t.id !== link.id);
    this.currentLinks.set(updatedLinks);
    this.finalLinks.emit(updatedLinks);
  }
}
