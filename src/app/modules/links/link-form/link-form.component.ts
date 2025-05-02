import { Component, inject, output } from '@angular/core';
import { Link } from '@model/Link';
import { LinkService } from '@http/link.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-link-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './link-form.component.html',
  styleUrls: ['../../../core/styles/forms.css', './link-form.component.css'],
})
export class LinkFormComponent {
  linkCreated = output<Link>();

  private linkService = inject(LinkService);
  submitting = false;

  linkForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    url: new FormControl('', [Validators.required, Validators.pattern('https?://.+')]),
  });

  submitLink() {
    if (this.linkForm.invalid) return;

    this.submitting = true;
    const newLink: Link = {
      name: this.linkForm.value.name!,
      link: this.linkForm.value.url!,
    };

    this.linkService.post(newLink).subscribe({
      next: (createdLink) => {
        this.linkCreated.emit(createdLink.data!);
        this.linkForm.reset();
        this.submitting = false;
      },
      error: (err) => {
        console.error('Error creating link:', err);
        this.submitting = false;
      },
    });
  }
}
