import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Tweet } from '../models/tweet.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
    providedIn: 'root',
})
export class TweetService {
    _tweets: Array<Tweet> = [];

    constructor() {
        this._tweets = this._getTweetsLocalStorage();
        this.ordenaTweetsData();
    }

    private _getTweetsLocalStorage() {
        let tweets = JSON.parse(
            localStorage.getItem('tweets')!
        ) as Array<Tweet>;

        if (tweets) {
            tweets.map((x) => (x.dataTweet = new Date(x.dataTweet)));
        } else {
            tweets = new Array<Tweet>()
        }
        return tweets;
    }

    private _setTweetsLocalStorage(tweets: Array<Tweet>) {
        localStorage.setItem('tweets', JSON.stringify(tweets));
    }

    adicionaTweet(tweet: Tweet) {
        tweet.idTweet = uuidv4();
        this._tweets.push(tweet);
        this.ordenaTweetsData();
        this._setTweetsLocalStorage(this._tweets);
        return of(tweet);
    }

    removeTweet(tweet: Tweet) {
        this._tweets = this._tweets.filter((x) => x.idTweet !== tweet.idTweet);
        this.ordenaTweetsData();
        this._setTweetsLocalStorage(this._tweets);
        return of(true);
    }

    private ordenaTweetsData() {
        this._tweets.sort(
            (a: Tweet, b: Tweet) =>
                b.dataTweet.getTime() - a.dataTweet.getTime()
        );
    }

    getTweets() {
        let tweets = JSON.parse(localStorage.getItem('tweets')!);
        return of(this._tweets);
    }
}
