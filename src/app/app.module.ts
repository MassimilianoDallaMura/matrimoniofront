import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { MatrimonioComponent } from './component/matrimonio/matrimonio.component';
import { EcuadorComponent } from './component/ecuador/ecuador.component';
import { CerimoniaComponent } from './component/cerimonia/cerimonia.component';
import { FestaComponent } from './component/festa/festa.component';
import { ProfiloComponent } from './component/profilo/profilo.component';
import { AroundComponent } from './component/around/around.component';
import { ConsigliUtiliComponent } from './component/consigli-utili/consigli-utili.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { FooterComponent } from './component/footer/footer.component';
import { HttpClientModule, HttpClient } from '@angular/common/http'; // Importa HttpClientModule
import { RouterModule, Routes } from '@angular/router';
import { InfoUtiliComponent } from './component/info-utili/info-utili.component';
import { TimetableComponent } from './component/timetable/timetable.component';
import { IndicazioniComponent } from './component/indicazioni/indicazioni.component';
import { FormsModule } from '@angular/forms';
import { GestionaleComponent } from './component/gestionale/gestionale.component'; // Importa FormsModule
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { GoogleMapsModule } from '@angular/google-maps';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from '../app/auth/auth.guard'; // Guardia per proteggere le rotte
import { AuthService } from './auth/auth.service';
import { TokenInterceptor } from './auth/token.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './component/login/login.component';



const routes: Routes = [
  { path: '', 
  redirectTo: '/home',    // Redirect alla pagina di login
  pathMatch: 'full'     
  },
  {
    path: 'login',
    component: LoginComponent 
  }, 
  { path: 'home', 
  component: HomeComponent, 
  canActivate: [AuthGuard]  
  }, 
  {
    path: 'matrimonio',
    component: MatrimonioComponent, 
    canActivate: [AuthGuard] 
  },
  {
    path: 'ecuador',
    component: EcuadorComponent,
    canActivate: [AuthGuard] 
  },
  {
    path: 'cerimonia',
    component: CerimoniaComponent,
    canActivate: [AuthGuard] 
  },
  {
    path: 'festa',
    component: FestaComponent,
    canActivate: [AuthGuard] 
  },
  {
    path: 'around',
    component: AroundComponent,
    canActivate: [AuthGuard] 
  },
  {
    path: 'info',
    component: InfoUtiliComponent,
    canActivate: [AuthGuard] 
  },

  {
    path: 'timetable',
    component: TimetableComponent,
    canActivate: [AuthGuard] 
  },
  {
    path: 'indicazioni',
    component: IndicazioniComponent,
    canActivate: [AuthGuard] 
  },
  {
    path: 'profile',
    component: ProfiloComponent,
    canActivate: [AuthGuard] 
  },
  {
    path: 'donacion',
    component: IndicazioniComponent,
    canActivate: [AuthGuard] 
  },

  // {
  //   path: '**',
  //   redirectTo: '/404',
  //   pathMatch: 'full',
  // },




];

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MatrimonioComponent,
    EcuadorComponent,
    CerimoniaComponent,
    FestaComponent,
    ProfiloComponent,
    AroundComponent,
    ConsigliUtiliComponent,
    NavbarComponent,
    FooterComponent,
    InfoUtiliComponent,
    TimetableComponent,
    IndicazioniComponent,
    GestionaleComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    GoogleMapsModule,
    ReactiveFormsModule,   
    


  ],
  providers: [
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true } 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
