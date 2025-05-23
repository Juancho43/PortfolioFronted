import { Component, effect, inject, input, output, signal } from '@angular/core';
import { Link } from '@model/Link';
import { LinkService } from '@http/link.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

/**
 * Component for creating and editing links.
 * Provides a form interface with validation for managing links with create, update, and delete operations.
 */
@Component({
  selector: 'app-link-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './link-form.component.html',
  styleUrls: ['../../../core/styles/forms.css','../../../core/styles/mini-form.css','./link-form.component.css'],
})
export class LinkFormComponent {
  /** Service for handling link API operations */
  private service = inject(LinkService);

  /** Input property that receives the link to be edited */
  currentLink = input<Link>({} as Link);

  /** Output event emitted when a new link is created */
  linkCreated = output<Link>();

  /** Output event emitted when an existing link is updated */
  linkUpdated = output<Link>();

  /** Output event emitted when the form is cleaned/reset */
  cleaned = output<boolean>();

  /** Signal that indicates if the component is in edit mode */
  edit = signal<boolean>(false);

  /** Form group for link data input with validation */
  linkForm = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', [Validators.required]),
    url: new FormControl('', [Validators.required, Validators.pattern('https?://.+')]),
  });

  /**
   * Sets up a reactive effect to monitor changes to currentLink
   * and update the form and edit state accordingly.
   */
  constructor() {
    effect(() => {
      const link = this.currentLink();
      // Only consider it an edit operation if the link has a valid ID
      if (link && link.id) {
        this.update();
      } else {
        this.edit.set(false);
      }
    });
  }

  /**
   * Updates the form with current link data and sets edit mode to true
   */
  update() {
    this.mapLink();
    this.edit.set(true);
  }

  /**
   * Maps form data to a link object
   * @returns {Link} Link data extracted from the form
   */
  mapperLink(): Link {
    return {
      id: this.linkForm.get('id')?.value!,
      name: this.linkForm.get('name')?.value!,
      link: this.linkForm.get('url')?.value!,
    };
  }

  /**
   * Maps the current link data to the form fields
   */
  mapLink() {
    this.linkForm.patchValue({
      id: this.currentLink().id!,
      name: this.currentLink().name!,
      url: this.currentLink().link!,
    });
  }

  /**
   * Resets the form, emits cleaned event, and sets edit mode to false
   */
  clean() {
    this.linkForm.reset();
    this.cleaned.emit(true);
    this.edit.set(false);
  }

  /**
   * Handles form submission by either creating a new link or updating an existing one
   * based on the edit state. Emits appropriate events and cleans the form afterward.
   */
  submitLink() {
    if (!this.edit()) {
      this.service.post(this.mapperLink()).subscribe({
        next: (createdLink) => {
          this.linkCreated.emit(createdLink.data!);
        },
      });
    } else {
      this.service.update(this.mapperLink()).subscribe({
        next: (createdLink) => {
          this.linkUpdated.emit(createdLink.data!);
        },
      });
    }
    this.clean();
  }

  /**
   * Deletes the current link and cleans the form
   */
  deleteLink() {
    this.service.delete(this.currentLink().id!).subscribe({
      next: () => {
        this.clean();
      },
    });
  }
}
