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

  data : any;

  options: any = {
    plugins: {
      legend: {
        display : false
      }
  },
  };

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
          this.list = Response.sort((a: General, b: General) => {
            // Convert the dateDebut field to Date objects for proper comparison
            const dateA = new Date(a.dateDebut).getTime();
            const dateB = new Date(b.dateDebut).getTime();
          
            // Sort in ascending order (earliest to latest)
            return dateA - dateB;
          });
                    
          const currentYear = new Date().getFullYear();
          let FilteredList = this.list.filter((item: any) => new Date(item.dateDebut).getFullYear() === currentYear)
          let montantTotalArray = FilteredList.map((item: any) => item.montantTotal); // Then map to get montantTotal
          const monthToAdd = new Date(FilteredList[0].dateDebut).getMonth() ; // Ensure it's a Date object
          montantTotalArray = this.AddTableFix(monthToAdd, montantTotalArray);
          console.log(montantTotalArray)

          this.data = {
            labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
            datasets: [
              {
                type: 'line',
                label: 'Montant Total',
                fill: false,
                yAxisID: 'y',
                tension: 0.4,
                data: montantTotalArray,
                backgroundColor: "#8c8c8c", // Muted grey for the line
                borderColor: "#1f1f1f", // Dark grey for line border
                borderWidth: 2
              },
              {
                type: 'bar',
                label: 'Montant Total',
                fill: false,
                yAxisID: 'y',
                tension: 0.4,
                data: montantTotalArray,
                backgroundColor: ['#333333', '#4a4a4a', '#616161', '#787878', '#8f8f8f', '#a6a6a6' ,'#7f7f7f', '#8f8f8f','#a0a0a0','#b1b1b1','#c2c2c2', '#d3d3d3'],
                borderColor: '#1f1f1f',
                borderWidth: 1
              },
            ]  
        };
        }
      }
    })

  }

  AddTableFix(x: number, Table: any[]) {
    for (let i = 0; i < x; i++) { // Declare 'i' with 'let'
        Table.unshift(0); // Push 0 at the beginning of the table
    }
    return Table; // Return the modified table
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

  Total()
  {
    let S = 0;
    for(let i=0;i<this.list.length;i++)
    {
      S = S+this.list[i].montantTotal
    }
    return S
  }
  
  calculatePercentageChange(current: number, previous: number): number {
    if (previous === 0) {
        return 100; // Prevent division by zero, return 100% in this case
    }
    const change = ((current - previous) / previous) * 100;
    return parseFloat(change.toFixed(2)); // Round to two decimal places
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

TVA = 19;  // TVA is a constant at 19%

RealTotal() {
  let S: number = 0;  // Initialize the total
  for (let i = 0; i < this.list.length; i++) {
    const montantTotal = this.list[i].montantTotal;
    
    // Calculate the total after deducting 3% and the TVA percentage
    const deduction = (montantTotal * 3) / 100 + (montantTotal * this.TVA) / 100;
    S += montantTotal - deduction;
  }

  return S;  // Return the calculated total
}




}
