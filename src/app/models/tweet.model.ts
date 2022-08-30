export class Tweet {
  idTweet: string = '';
  dataTweet: Date = new Date();
  conteudoTweet: string = '';
}

export const tweets = <Array<Tweet>>[
  {
    idTweet: '1',
    dataTweet: new Date('2013-02-20T12:01:04.753Z'),
    conteudoTweet: 'Teste 1',
  },
  { idTweet: '2', dataTweet: new Date(), conteudoTweet: 'Teste 2' },
  { idTweet: '3', dataTweet: new Date(), conteudoTweet: 'Teste 3' },
  {
    idTweet: '4',
    dataTweet: new Date('2013-02-20T12:01:04.753Z'),
    conteudoTweet: 'Teste 4',
  },
];
