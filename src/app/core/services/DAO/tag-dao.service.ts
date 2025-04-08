import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Tag} from '@model/Tag';

@Injectable({
  providedIn: 'root'
})
export class TagDaoService {
  private tags: BehaviorSubject<Tag[]> = new BehaviorSubject<
    Tag[]
  >([]);
  private _tag: BehaviorSubject<Tag> = new BehaviorSubject<Tag>(
    this.getEmptyTag(),
  );

  getTag() {
    return this._tag.asObservable();
  }

  setTag(item: Tag) {
    this._tag.next(item);
  }

  getTags() {
    return this.tags.asObservable();
  }

  setTags(items: Tag[]) {
    this.tags.next(items);
  }

  addNewTag(item: Tag) {
    const currentTags = this.tags.getValue();
    this.tags.next([...currentTags, item]);
  }

  getEmptyTag(): Tag {
    return {
      name: '',
    };
  }
}
