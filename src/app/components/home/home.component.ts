import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { LocalStorageService } from 'src/app/services/localstorage.service';
import { Question } from 'src/app/types/question';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public quiz: Question[] = [];
  public bestScore: string | null = null;

  constructor(
    private httpService: HttpService,
    private localService: LocalStorageService,
    private router: Router
  ) {}

  public async ngOnInit(): Promise<void> {
    this.httpService
      .getQuestions()
      .then((questions: Question[]) => (this.quiz = questions));
    this.bestScore = this.localService.getBestScore();
  }

  public goToQuiz(): void {
    const extras: NavigationExtras = { state: { quiz: this.quiz } };
    this.router.navigate(['/quiz'], extras);
  }
}
