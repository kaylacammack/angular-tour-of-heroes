import { MessageService } from './../../services/message.service';
import { Hero } from '../../models/Hero';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeroService } from 'src/services/hero.service';
import { Subscription, take, takeWhile } from 'rxjs';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit, OnDestroy {
  // Variables
  heroes: Hero[] = [];
  subscription: boolean = true;

  constructor(private heroService: HeroService) { }
  // Lifecylcle hook
  ngOnInit(): void {
    this.getHeroes();
  }
  ngOnDestroy() {
    this.subscription = false;
  }
// Functions
  private getHeroes(): void {
    this.heroService.getHeroes().pipe(takeWhile(() => this.subscription))
      .subscribe(heroes => this.heroes = heroes);
  }
}
