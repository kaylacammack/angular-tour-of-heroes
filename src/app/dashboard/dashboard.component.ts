import { takeWhile } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Hero } from 'src/models/Hero';
import { HeroService } from 'src/services/hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  subscription: boolean = true;

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
    console.log('testing 123')
  }

  ngOnDestroy() {
    this.subscription = false;
  }

  getHeroes(): void {
    this.heroService.getHeroes().pipe(takeWhile(() => this.subscription))
    .subscribe(heroes => this.heroes = heroes.slice(1, 5));
  }
}
