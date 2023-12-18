import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/localstorage.service';
import { Answer } from 'src/app/types/answer';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent {
  public answers: Answer[] = [];
  public correctAnswers: number = 0;
  public newBestScore: boolean = false;

  constructor(
    private router: Router,
    private localService: LocalStorageService
  ) {
    const nav = this.router.getCurrentNavigation();
    if (nav?.extras && nav.extras.state && nav.extras.state['answers']) {
      this.answers = nav.extras.state['answers'];
      this.correctAnswers = this.answers.filter(
        (el) => el.rightAnswer === true
      ).length;
      if (this.localService.checkScore(this.correctAnswers)) {
        this.localService.storeBestScore(
          this.correctAnswers,
          this.answers.length
        );
        this.newBestScore = true;
      }
    }
  }
}
