import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Tweet } from '../models/tweet.model';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css'],
})
export class TweetComponent implements OnInit {
  @Input() tweet: Tweet = new Tweet();
  @Input() isReadonly: boolean = false;
  @Output() removeTweetEvent = new EventEmitter<Tweet>();

  constructor() {}

  ngOnInit(): void {}

  getData() {}

  remove(tweet: Tweet) {
    this.removeTweetEvent.emit(tweet);
  }
}
