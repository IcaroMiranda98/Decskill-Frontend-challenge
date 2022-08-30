import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Tweet } from '../models/tweet.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class TweetService {
  constructor(private http: HttpClient) {}

  adicionaTweet(tweet: Tweet) {
    let tweets = JSON.parse(localStorage.getItem('tweets')!);
    if (!tweets) tweets = new Array<Tweet>();
    tweet.idTweet = uuidv4();
    tweets.push(tweet);
    this.ordenaTweetsData(tweets);
    localStorage.setItem('tweets', JSON.stringify(tweets));
    return of(tweets);
  }

  private ordenaTweetsData(tweets: any) {
    tweets.sort(
      (a: Tweet, b: Tweet) => b.dataTweet.getTime() - a.dataTweet.getTime()
    );
  }

  getTweets() {
    let tweets = JSON.parse(localStorage.getItem('tweets')!);
    return of(tweets ? tweets : new Array<Tweet>());
  }
}
