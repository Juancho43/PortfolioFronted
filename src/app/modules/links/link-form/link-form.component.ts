import { Component, effect, inject, input, output, signal } from '@angular/core';
import { Link } from '@model/Link';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LinkService } from '@http/link.service';

@Component({
  selector: 'app-link-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './link-form.component.html',
  styleUrl:'./link-form.component.scss',
})
export class LinkFormComponent {
  private service = inject(LinkService);

  readonly currentLink = input.required<Link>();

  linkCreated = output<Link>();

  linkUpdated = output<Link>();

  cleaned = output<boolean>();

  /** Signal that indicates if the component is in edit mode */
  edit = signal<boolean>(false);

  /** Form group for project data input with validation */
  linkForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', [Validators.required]),
    link: new FormControl('', Validators.required),
  });

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

  clean() {
    this.linkForm.reset();
    this.cleaned.emit(true);
    this.edit.set(false);
  }

  update() {
    this.mapLink();
    this.edit.set(true);
  }

  mapLink() {
    this.linkForm.patchValue({
      id: this.currentLink().id,
      name: this.currentLink().name,
      link: this.currentLink().link,
    });
  }

  mapperLink(): Link {
    return {
      id: this.linkForm.get('id')?.value,
      name: this.linkForm.get('name')?.value,
      link: this.linkForm.get('link')?.value,
    };
  }
  onSubmit() {
    if (!this.edit()) {
      this.service.post(this.mapperLink()).subscribe({
        next: (response) => {
          this.linkCreated.emit(response.data!);
        },
      });
    } else {
      this.service.update(this.mapperLink()).subscribe({
        next: (response) => {
          this.linkUpdated.emit(response.data!);
        },
      });
    }
    this.clean();
  }

  /**
   * Deletes the current tag and cleans the form
   */
  deleteLink() {
    this.service.delete(this.currentLink().id!).subscribe({
      next: () => {
        this.clean();
      },
    });
  }
}
