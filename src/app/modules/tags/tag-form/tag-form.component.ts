import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TagService } from '@services/http/tag.service';
import { Tag } from '../../../core/interfaces/Tag';
import { TagDaoService } from '@dao/tag-dao.service';
import { NotificationService } from '@services/utils/notification.service';

@Component({
  selector: 'app-tag-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './tag-form.component.html',
  styleUrls: ['./tag-form.component.css', '../../../core/styles/forms.css'],
})
export class TagFormComponent implements OnInit {
  private tagService = inject(TagService);
  private dao = inject(TagDaoService);
  edit = false;
  currentTag: Tag = this.dao.getEmptyTag();

  TagForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', [Validators.required]),
  });

  ngOnInit() {
    this.dao.getTag().subscribe((tag) => {
      this.currentTag = tag;
      this.edit = true;
      this.TagForm.patchValue({
        id: this.currentTag.id,
        name: this.currentTag.name,
      });
    });
  }

  mapperTag() {
    this.currentTag.id = this.TagForm.get('id')?.value;
    this.currentTag.name = this.TagForm.get('name')?.value;
  }
  cleanForm() {
    this.TagForm.reset();
    this.edit = false;
  }

  onSubmit() {
    this.mapperTag();

    if (!this.edit) {
      this.tagService.post(this.currentTag).subscribe();
    } else {
      this.tagService.update(this.currentTag).subscribe();
    }
    this.cleanForm();
  }
}
