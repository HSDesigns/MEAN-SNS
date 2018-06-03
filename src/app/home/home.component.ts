import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { SeoService } from '../seo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  animals$;

  title = 'Welcome to Spaces and Stories';
  description = 'Giving Artists and art connoisseur to connect on a reliable platform';

  newAnimal: { name?: string, bio?: string } = {}

  constructor(private afs: AngularFirestore, private seo: SeoService, private router: Router) { }

  ngOnInit() {
    // this.animals$ = this.afs.collection('animals', ref => ref.orderBy('img') ).valueChanges();
    this.seo.generateTags({
      title: this.title,
      description: this.description,
      slug: 'Home'
      // image: animal.imgURL
    });
  }

  async create() {
    const path = `animals/${this.newAnimal.name.toLowerCase()}`;
    await this.afs.doc(path).set(this.newAnimal);
    this.router.navigate([path]);
  }

}
