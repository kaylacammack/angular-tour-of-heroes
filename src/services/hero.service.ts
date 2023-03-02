import { Injectable } from '@angular/core';
import { Hero } from '../models/Hero';
import { HEROES } from 'src/mockdata/mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private MessageService: MessageService) { }
  getHeroes(): Observable<Hero[]> {
    const heroes = of(HEROES);
    this.MessageService.add('HeroService: fetched heroes');
    return heroes;
  }

  getHero(id: number): Observable<Hero> {
    const hero = HEROES.find(h => h.id === id)!;
    this.MessageService.add(`HeroService: fetched hero id=${id}`);
    return of(hero);
  }
}
