import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DynamicComponent } from './dynamic/dynamic.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { ShowComponent } from './show/show.component';
import { DetailsComponent } from './details/details.component';
import { AdditemComponent } from './additem/additem.component';

const routes: Routes = [{path:"",component:DynamicComponent},{path:"restaurant",component:RestaurantComponent},{path:"show",component:ShowComponent},{
  path:"info",component:DetailsComponent},{path:"additem",component:AdditemComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
