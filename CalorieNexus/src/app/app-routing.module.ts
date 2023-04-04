/*
author: Hanting Li
date: 02-28
 */


import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { redirectUnauthorizedTo, redirectLoggedInTo, canActivate } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);

const routes: Routes = [
	{
		path: '',
		loadChildren: () => import('./login/login.module').then((m) => m.LoginPageModule),
		...canActivate(redirectLoggedInToHome)
	},
	{
		path: 'home',
		loadChildren: () => import('./home/home.module').then((m) => m.HomePageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'restaurants',
    loadChildren: () => import('./restaurants/restaurants.module').then(m => m.RestaurantsPageModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./account/account.module').then(m => m.AccountPageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'ant',
    loadChildren: () => import('./ant/ant.module').then( m => m.AntPageModule)
  },
  {
    path: 'bw',
    loadChildren: () => import('./bw/bw.module').then( m => m.BwPageModule)
  },
  {
    path: 'nr',
    loadChildren: () => import('./nr/nr.module').then( m => m.NrPageModule)
  },
  {
    path: 'recommendation',
    loadChildren: () => import('./recommendation/recommendation.module').then( m => m.RecommendationPageModule)
  },
  // {
  //   path: 'dishinfo',
  //   loadChildren: () => import('./dish-info/dish-info.module').then( m => m.DishInfoPageModule)
  // }

];

@NgModule({
	imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
	exports: [RouterModule]
})
export class AppRoutingModule {}
