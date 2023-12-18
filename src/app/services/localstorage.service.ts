import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  public storeBestScore(score: number, answersLength: number): void {
    localStorage.setItem('best-score', `${score}/${answersLength}`);
  }

  public getBestScore(): string | null {
    return localStorage.getItem('best-score');
  }

  public checkScore(score: number): boolean {
    const bestScore = this.getBestScore();
    if (bestScore && bestScore !== null) {
      return parseInt(bestScore?.split('/')[0]) < score;
    } else {
      return true;
    }
  }
}
