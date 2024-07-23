import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalculationsComponent } from './Calculations/Calculations.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { MainCalculationsPageComponent } from './MainCalculationsPage/MainCalculationsPage.component';
const routes: Routes = [

  { path: '', component: MainCalculationsPageComponent },
  { path: 'Facture/:id/:montantotal', component: InvoiceComponent },
  { path: 'Calcul/:id', component: CalculationsComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
