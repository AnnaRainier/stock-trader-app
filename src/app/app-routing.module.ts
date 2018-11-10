import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from './app.component';
import {MarketsComponent} from './markets/markets.component';
import {PortfolioComponent} from './portfolio/portfolio.component';

const routes: Routes = [
    {path: 'markets', component: MarketsComponent},
    {path: 'portfolio', component: PortfolioComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
