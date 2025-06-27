import { Component, effect, inject, input, output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TagService } from '@services/http/tag.service';
import { Tag } from '@model/Tag';

/**
 * Component that provides a form for creating and editing tags
 * Supports adding new tags and updating existing ones through a reactive form
 */
@Component({
  selector: 'app-tag-mini-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './tag-mini-form.component.html',
  styleUrls: ['../../../core/styles/forms.css','../../../core/styles/mini-form.css','./tag-mini-form.component.css'],
})
export class TagMiniFormComponent {
  /** Service for handling tag API operations */
  private service = inject(TagService);

  /** Input property for passing a tag to edit */
  readonly currentTag = input<Tag>({} as Tag);

  /** Event emitted when a new tag is created */
  tagCreated = output<Tag>();

  /** Event emitted when a tag is updated */
  tagUpdated = output<Tag>();

  /** Event emitted when the form is reset */
  cleaned = output<boolean>();

  /** Signal indicating whether the form is in edit mode */
  edit = signal<boolean>(false);

  /** Form group for tag data input and validation */
  TagForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', [Validators.required]),
  });

  /**
   * Sets up a reactive effect to handle changes to the currentTag input
   * Updates the form and edit mode when a valid tag is provided
   */
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

  /**
   * Updates the form with current tag data and sets edit mode to true
   */
  update() {
    this.mapTag();
    this.edit.set(true);
  }

  /**
   * Creates a tag object from form values
   * @returns {Tag} Object with tag id and name from the form
   */
  mapperTag(): Tag {
    return {
      id: this.TagForm.get('id')?.value,
      name: this.TagForm.get('name')?.value,
    };
  }

  /**
   * Populates the form with data from the current tag
   */
  mapTag() {
    this.TagForm.patchValue({
      id: this.currentTag().id,
      name: this.currentTag().name,
    });
  }

  /**
   * Resets the form and notifies parent component
   */
  clean() {
    this.TagForm.reset();
    this.cleaned.emit(true);
    this.edit.set(false);
  }

  /**
   * Handles form submission
   * Creates a new tag or updates existing one based on edit mode
   * Emits the created/updated tag and cleans the form
   */
  onSubmit() {
    if (!this.edit()) {
      this.service.post(this.mapperTag()).subscribe({
        next: (createdLink) => {
          this.tagCreated.emit(createdLink.data!);
        },
      });
    } else {
      this.service.update(this.mapperTag()).subscribe({
        next: (createdLink) => {
          this.tagUpdated.emit(createdLink.data!);
        },
      });
    }
    this.clean();
  }

  /**
   * Deletes the current tag and resets the form
   */
  deleteTag() {
    this.service.delete(this.currentTag().id!).subscribe({
      next: () => {
        this.clean();
      },
    });
  }
}
