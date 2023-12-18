import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../types/question';

@Injectable({ providedIn: 'root' })
export class HttpProvider {
  constructor(private http: HttpClient) {}

  public fetchQuiz(): Observable<Question[]> {
    const url = `https://storage.googleapis.com/netwo-public/quizz.json`;
    return this.http.get<Question[]>(url);
  }
}
