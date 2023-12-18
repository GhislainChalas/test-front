import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Question } from 'src/app/types/question';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent {
  @Input() question: Question = {
    label: '',
    answerType: '',
    choices: [],
    answer: '',
  };

  @Output() public answerEvent = new EventEmitter<string[]>();

  public answer: string[] = [];

  constructor() {}

  public ngOnChanges(): void {
    this.answer = [];
  }

  public inputChange(event: any): void {
    if (this.question.answerType === 'text') {
      this.answer = [event.target.value];
    } else if (this.question.answerType === 'choice') {
      console.log(event);
      this.answer = [event];
    } else {
      this.answer.includes(event)
        ? (this.answer = this.answer.filter((el) => el !== event))
        : this.answer.push(event);
    }
  }

  public answerEmit(value: string[]): void {
    this.answerEvent.emit(value);
  }
}
