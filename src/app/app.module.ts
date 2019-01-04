import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MarketsComponent } from './markets/markets.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MarketsService} from './markets/markets.service';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {HttpClientModule} from '@angular/common/http';
import {StoreModule} from '@ngrx/store';
import {marketsReducers} from './markets/store';
import { EffectsModule } from '@ngrx/effects';
import {MarketsEffects} from './markets/store/effects/markets.effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MarketsComponent,
    PortfolioComponent
  ],
  imports: [
    BrowserModule,
      BrowserAnimationsModule,
      FormsModule,
    AppRoutingModule,
      HttpClientModule,
      MatGridListModule,
      MatButtonModule,
      MatTableModule,
      MatFormFieldModule,
      MatInputModule,
      MatCardModule,
      StoreModule.forRoot(marketsReducers, {}),
      StoreModule.forFeature('markets', marketsReducers),
      StoreDevtoolsModule.instrument(),
      EffectsModule.forRoot([]),
      EffectsModule.forFeature([MarketsEffects])
  ],
  providers: [MarketsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
