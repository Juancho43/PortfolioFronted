import { Component, inject, OnDestroy, output, signal } from '@angular/core';
import { TagComponent } from '@modules/tags/tag/tag.component';
import { Tag } from '@model/Tag';
import { TagService } from '@http/tag.service';
import { debounceTime, distinctUntilChanged, Subject, switchMap, takeUntil } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tag-searcher',
  standalone: true,
  imports: [TagComponent, FormsModule],
  templateUrl: './tag-searcher.component.html',
  styleUrl: './tag-searcher.component.css',
})
export class TagSearcherComponent implements OnDestroy {
  tagSelected = output<Tag>();
  private tagService = inject(TagService);
  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  searchTerm = '';
  filteredTags = signal<Tag[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  constructor() {
    this.setupSearch();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  setupSearch() {
    this.searchSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term) => {
          this.loading.set(true);
          this.error.set(null);
          return this.tagService.search(term);
        }),
        takeUntil(this.destroy$),
      )
      .subscribe({
        next: (tags) => {
          this.filteredTags.set(tags.data!);
          this.loading.set(false);
        },
        error: (err) => {
          console.error('Error searching tags', err);
          this.error.set('Error al buscar etiquetas');
          this.loading.set(false);
        },
      });
  }

  onSearchInput() {
    this.searchSubject.next(this.searchTerm);
  }

  selectTag(tag: Tag) {
    this.tagSelected.emit(tag);
  }
}
