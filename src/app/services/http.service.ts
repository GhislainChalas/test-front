import { Injectable } from '@angular/core';
import { HttpProvider } from '../providers/http.provider';
import { lastValueFrom } from 'rxjs';
import { Question } from '../types/question';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private httpProvider: HttpProvider) {}

  private questions: Question[] = [];

  public async getQuestions(): Promise<Question[]> {
    this.questions = await lastValueFrom(this.httpProvider.fetchQuiz());
    return this.questions;
  }
}
