import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable, switchMap } from 'rxjs';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { Tweet, tweets } from './models/tweet.model';
import { TweetService } from './service/tweet.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Decskill-Frontend-challenge';

  tweetForm!: FormGroup;
  tweets: Array<Tweet> = tweets;
  tweets$!: Observable<Array<Tweet>>;

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private tweetService: TweetService
  ) {}
  ngOnInit() {
    this.tweetForm = this.fb.group({
      conteudoTweet: ['', [Validators.required, Validators.maxLength(130)]],
    });

    this.tweets$ = this.tweetService.getTweets();
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(ConfirmModalComponent);
  }

  newTweet() {
    console.log('aqui');
    let newTweet = <Tweet>{
      dataTweet: new Date(),
      conteudoTweet: this.tweetForm.controls['conteudoTweet'].value,
    };

    this.tweetService
      .adicionaTweet(newTweet)
      .pipe(
        switchMap((retorno) => {
          console.log('1');

          this.tweets$ = this.tweetService.getTweets();
          return retorno;
        })
      )
      .subscribe((response) => {
        console.log('2');
        this.tweetForm.controls['conteudoTweet'].reset();
      });
  }
}
