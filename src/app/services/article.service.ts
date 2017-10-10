// Angular
import { Injectable } from '@angular/core';

// Firebase
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

// RxJs
import { Observable } from 'rxjs/Observable';

export interface Article {
    id: string;
    title: string;
    description: string;
    text: string;
}

@Injectable()
export class ArticleService {
    private userId: string = null;
    public list: Observable<Article[]> = null;

    public constructor(
        private db: AngularFireDatabase,
        private auth: AngularFireAuth,
    ) {
        this.auth.authState.subscribe(
            (user: firebase.User) => {
                if (user) {
                    this.userId = user.uid;

                    this.list = this.db.list(`articles/${this.userId}`).snapshotChanges()
                        .map(actions => {
                            return actions.map(item => {
                                return {
                                    id: item.payload.key,
                                    title: item.payload.val().title,
                                    description: item.payload.val().description,
                                    text: item.payload.val().text,
                                };
                            });
                        });
                }
            });
    }

    public push(item: Article): void {
        if (this.userId) {
            this.db.list(`articles/${this.userId}`).push(item);
        }
    }

    public remove(item): void {
        if (this.userId) {
            this.db.list(`articles/${this.userId}`).remove(item);
        }
    }
}
