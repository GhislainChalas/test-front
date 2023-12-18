import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Question } from 'src/app/types/question';
import { Observable, finalize, map, takeWhile, timer } from 'rxjs';
import { ActualQuestion } from 'src/app/types/actual-question';
import { Answer } from 'src/app/types/answer';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent {
  public quiz: Question[] = [];
  public secsRemaining: Observable<unknown> = new Observable<unknown>();
  public actualQuestion: ActualQuestion = {
    index: 0,
    question: { label: '', answerType: '', choices: [], answer: '' },
  };

  public answers: Answer[] = [];

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    if (nav?.extras && nav.extras.state && nav.extras.state['quiz']) {
      this.quiz = nav.extras.state['quiz'];
      this.actualQuestion.question = this.quiz[0];
    }
  }

  public async ngOnInit(): Promise<void> {
    this.secsRemaining = timer(0, 1000).pipe(
      map((n) => 120 - n),
      takeWhile((n) => n >= 0)
      /*   finalize(() => {
        this.router.navigate(['/results'], {state: { answers : this.answers }});
      }) */
    );
  }

  public addAnswers(event: string[]): void {
    const index = this.actualQuestion.index;
    this.answers.push({
      index: index,
      label: this.actualQuestion.question.label,
      answer: event,
      rightAnswer: this.verifyAnswer(event, this.actualQuestion.question),
    });
    if (index < this.quiz.length - 1) {
      this.actualQuestion = {
        index: index + 1,
        question: this.quiz[index + 1],
      };
    } else {
      this.router.navigate(['/results'], { state: { answers: this.answers } });
    }
  }

  private verifyAnswer(answers: string[], question: Question): boolean {
    if (question.answerType !== 'multiple-choice') {
      return answers[0].toLowerCase() === question.answer?.toLowerCase();
    } else {
      let bool: boolean = true;
      for (const answer of answers) {
        if (!question.answers?.includes(answer)) {
          bool = false;
        }
      }
      return bool === true && answers.length === question.answers?.length
        ? true
        : false;
    }
  }
}
