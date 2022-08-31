import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable, switchMap } from 'rxjs';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { Tweet } from './models/tweet.model';
import { TweetService } from './service/tweet.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
    title = 'Decskill-Frontend-challenge';

    tweetForm!: FormGroup;
    tweets: Array<Tweet> = [];
    tweets$!: Observable<Array<Tweet>>;

    constructor(
        public dialog: MatDialog,
        private fb: FormBuilder,
        private tweetService: TweetService
    ) {}

    ngOnInit() {
        this._criaFormulario();
        this._carregaTimeline();
    }

    private _criaFormulario() {
        this.tweetForm = this.fb.group({
            conteudoTweet: [
                '',
                [Validators.required, Validators.maxLength(130)],
            ],
        });
    }

    private _carregaTimeline() {
        this.tweets$ = this.tweetService.getTweets();
    }

    newTweet() {
        let newTweet = <Tweet>{
            dataTweet: new Date(),
            conteudoTweet: this.tweetForm.controls['conteudoTweet'].value,
        };

        this.tweetService
            .adicionaTweet(newTweet)
            .pipe(
                switchMap((value: Tweet) => {
                    return (this.tweets$ = this.tweetService.getTweets());
                })
            )
            .subscribe((response) => {
                this.tweetForm.controls['conteudoTweet'].reset();
            });
    }

    confirmaDelecaoTweet(tweet: Tweet) {
        const dialogRef = this.dialog.open(ConfirmModalComponent, {
            data: { tweet },
        });

        dialogRef.afterClosed().subscribe((result) => {
            result && this.removeTweet(tweet);
        });
    }
    removeTweet(tweet: Tweet) {
        this.tweetService
            .removeTweet(tweet)
            .pipe(
                switchMap((value: boolean) => {
                    return (this.tweets$ = this.tweetService.getTweets());
                })
            )
            .subscribe((response) => {
                this.tweetForm.controls['conteudoTweet'].reset();
            });
    }
}
