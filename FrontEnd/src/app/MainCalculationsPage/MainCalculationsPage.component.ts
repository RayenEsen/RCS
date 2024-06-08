import { Component, OnInit } from '@angular/core';
import { General } from '../Shared/General';
import { Router } from '@angular/router';
import { GeneralService } from '../Shared/General.service';
import { TableValues } from '../Shared/TableValues';
import { Facture } from '../Shared/Facture';

@Component({
  selector: 'app-MainCalculationsPage',
  templateUrl: './MainCalculationsPage.component.html',
  styleUrls: ['./MainCalculationsPage.component.css']
})
export class MainCalculationsPageComponent implements OnInit {

  list :General[] = [];

  items: any[] = [
    { label: 'Ajouter', icon: 'pi pi-plus', command: () => this.NewRow() },
  ];

  items2: any[] = [
    { label: 'Fishe de calcul', icon: 'pi pi-calculator', command: () => this.NavigateCalcul() },
    { label: 'Voir Facture', icon: 'pi pi-eye', command: () => this.NavigateInvoice() },
    { label: 'Supprimer', icon: 'pi pi-trash', command: () => this.Remove() },
  ];

  constructor(private router: Router , public serviceG : GeneralService  ) {}

  ngOnInit() {
    this.serviceG.GetGeneral().subscribe({
      next : (Response : any) =>
      {
        if (Response.length === 0) {
          this.NewRow();
        }
        else
        {
          this.list = Response;
        }
      }
    })
  }
  


  NewRow() {
    const newRow = new General(); 
    this.serviceG.AddGeneral(newRow).subscribe({
      next: (response: any) => {
        this.list.push(response);
      }
    });
  }
  
  

  selectedMainCalculation? : General;
  
  NavigateInvoice() {
    if (this.selectedMainCalculation) {
      const id = this.selectedMainCalculation.id;
      this.router.navigate(['/Facture', id]);
    }
  }

  NavigateCalcul()
  {
    if (this.selectedMainCalculation) {
      const id = this.selectedMainCalculation.id;
      this.router.navigate(['/Calcul', id]);
    }
  }

  Remove() {
    if (this.selectedMainCalculation) {
        this.serviceG.RemoveGeneral(this.selectedMainCalculation.id).subscribe({
          next : (response) =>
            {
              this.list = this.list.filter(item => item.id !== this.selectedMainCalculation!.id);
            }
        })
    }
}



}
