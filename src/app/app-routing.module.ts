import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CardComponent} from './card/card.component';
import {IndexComponent} from './index/index.component';
import {FavoritesComponent} from './favorites/favorites.component';

const routes: Routes = [
    {
        path: '',
        component: IndexComponent
    },
    {
        path: 'card/:id',
        component: CardComponent
    },
    {
        path: 'favorites',
        component: FavoritesComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
