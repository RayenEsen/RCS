import { Component, OnInit } from '@angular/core';
import { General } from '../Shared/General';
import { Router } from '@angular/router';
import { GeneralService } from '../Shared/General.service';
import { TableValues } from '../Shared/TableValues';
import { Facture } from '../Shared/Facture';
import {ConfirmationService} from 'primeng/api';

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
    { label: 'Supprimer', icon: 'pi pi-trash', command: () => this.confirm()},
  ];

  constructor(private router: Router , public serviceG : GeneralService  , private confirmationService: ConfirmationService) {}

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
  confirm() {
    this.confirmationService.confirm({
        message: 'Êtes-vous sûr de vouloir effectuer cette action?',
        header: 'Confirmation',
        acceptLabel: 'Oui',
        rejectLabel: 'Non',
        accept: () => {
            this.Remove();
        }
    });
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
      this.router.navigate(['/Facture', id , this.selectedMainCalculation.montantTotal]);
    }
  }

  NavigateCalcul()
  {
    if (this.selectedMainCalculation) {
      const id = this.selectedMainCalculation.id;
      this.router.navigate(['/Calcul', id]);
    }
  }


  
  NavigateCalcul2(values: General)
  {
    if (values) {
      const id = values.id;
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
