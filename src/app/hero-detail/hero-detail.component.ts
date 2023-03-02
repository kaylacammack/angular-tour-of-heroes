import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Hero } from '../../models/Hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from 'src/services/hero.service';
import { takeWhile } from 'rxjs';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit, OnDestroy{
  @Input() hero?: Hero;
  subscription: boolean = true;
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) { }
  ngOnInit(): void {
    this.getHero();
}
  ngOnDestroy(): void {
    this.subscription = false;
  }

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id).pipe(takeWhile(() => this.subscription))
    .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }
}
