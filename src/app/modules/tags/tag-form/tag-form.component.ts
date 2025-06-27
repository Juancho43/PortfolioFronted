import { Component, effect, inject, input, output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TagService } from '@http/tag.service';
import { Tag } from '@app/core/interfaces/Tag';

@Component({
  selector: 'app-tag-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './tag-form.component.html',
  styleUrls: ['../../../core/styles/forms.css', './tag-form.component.css'],
})
export class TagFormComponent {
  private service = inject(TagService);

  readonly currentTag = input.required<Tag>();

  tagCreated = output<Tag>();

  tagUpdated = output<Tag>();

  cleaned = output<boolean>();

  /** Signal that indicates if the component is in edit mode */
  edit = signal<boolean>(false);

  /** Form group for project data input with validation */
  tagForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', [Validators.required]),
  });

  constructor() {
    effect(() => {
      const tag = this.currentTag();
      // Only consider it an edit operation if the tag has a valid ID
      if (tag && tag.id) {
        this.update();
      } else {
        this.edit.set(false);
      }
    });
  }

  clean() {
    this.tagForm.reset();
    this.cleaned.emit(true);
    this.edit.set(false);
  }

  update() {
    this.mapTag();
    this.edit.set(true);
  }

  mapTag() {
    this.tagForm.patchValue({
      id: this.currentTag().id,
      name: this.currentTag().name,
    });
  }

  mapperTag(): Tag {
    return {
      id: this.tagForm.get('id')?.value,
      name: this.tagForm.get('name')?.value,
    };
  }
  onSubmit() {
    if (!this.edit()) {
      this.service.post(this.mapperTag()).subscribe({
        next: (response) => {
          this.tagCreated.emit(response.data!);
        },
      });
    } else {
      this.service.update(this.mapperTag()).subscribe({
        next: (response) => {
          this.tagUpdated.emit(response.data!);
        },
      });
    }
    this.clean();
  }

  /**
   * Deletes the current tag and cleans the form
   */
  deleteTag() {
    this.service.delete(this.currentTag().id!).subscribe({
      next: () => {
        this.clean();
      },
    });
  }
}
