import { Component, OnInit } from '@angular/core';
import { TableValues } from '../Shared/TableValues';
import * as XLSX from 'xlsx';
import * as jsPDF from 'jspdf';
import { TableValuesService } from '../Shared/TableValues.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from '../Shared/General.service';
import { MessageService } from 'primeng/api';
import { ExchangeRateService } from '../Shared/Echange.service';

@Component({
  selector: 'app-Calculations',
  templateUrl: './Calculations.component.html',
  styleUrls: ['./Calculations.component.css']
})
export class CalculationsComponent implements OnInit {

  constructor(public serviceT : TableValuesService , private route: ActivatedRoute , public ServiceG : GeneralService , private messageService: MessageService, private exchangeRateService: ExchangeRateService) { }


 list: TableValues[] = [];



  items: any[] = [
    {label: 'Ajouter', icon: 'pi pi-plus', command: () => this.NewRow()}, 
    { label: 'Importer', icon: 'pi pi-file-import', command: () => this.Import() }, 
    {
      label: 'Exporter',
      icon: 'pi pi-file-excel',
      items: [
        { label: 'Excel', icon: 'pi pi-file-excel', command: () => this.Export() },
        { label: 'PDF', icon: 'pi pi-file-pdf', command: () => this.ExportPDF() },
      ]
    },
    { label: 'Supprimer', icon: 'pi pi-file-excel' , command: () => this.Remove() },
    { label: 'Imprimer', icon: 'pi pi-print' , command: () => this.Print() } ,
    { label: 'Sauvegarder', icon: 'pi pi-save' , command: () => this.saveValues() } ,


  ];


  items2: any[] = [
    {label: 'Retourner', icon: 'pi pi-arrow-left', command: () => this.ShowEchange()}, 
  ];


  selectedtype : any;
  id! : number;


  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = +params.get('id')!; 
  });
    this.serviceT.GetAllTableValues(this.id).subscribe({
      next : (Response : any) =>
      {
        this.list = Response;
        console.log(this.list)
      }
    })
  }




  NewRow() {
    this.serviceT.AddTableValues(this.id).subscribe({
      next : (Response : any) =>
      {
        this.list.push(Response);
        this.messageService.add({severity:'success', summary:'Ajouter', detail: " Nouveau client a ete ajouter"});
      }
    })
  }



  Export() {
    // Transform the list to exclude the 'generalid', 'type', and 'ref' properties
    const exportData = this.list.map(item => {
      const { generalId, type, ref,id, ...exportItem } = item; // Destructure item and exclude 'generalid', 'type', 'ref'
      return exportItem;
    });
  
    // Define the worksheet
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportData);
  
    // Define the workbook and add the worksheet to it
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
    // Save the Excel file
    XLSX.writeFile(wb, 'exported_data.xlsx');
  }
  
  

ExportPDF() {

}


Import() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.xlsx';

  input.onchange = (e: any) => {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = (event: any) => {
          const data = new Uint8Array(event.target.result);
          const workbook = XLSX.read(data, { type: 'array' });

          // Assuming the first sheet is the one you want to import
          const worksheet = workbook.Sheets[workbook.SheetNames[0]];

          // Convert the worksheet to an array of objects
          const importedList: TableValues[] = [];

          XLSX.utils.sheet_to_json(worksheet, { header: 1 }).slice(1).forEach((row: any) => {
              // Ensure required fields are populated correctly
              if (row[0] !== undefined && row[0] !== null) {  // Assuming row[0] corresponds to client
                  const tableValues = new TableValues();
                  tableValues.client = row[0];
                  tableValues.rub = row[1] !== undefined ? String(row[1]) : "";  // Convert to string or use empty string if undefined
                  tableValues.ref = row[2] !== undefined ? String(row[2]) : "";
                  tableValues.type = row[3] || "";
                  tableValues.achat = row[4] !== undefined ? +row[4] : undefined;
                  tableValues.vente = row[5] !== undefined ? +row[5] : undefined;
                  tableValues.benefice = row[6] !== undefined ? +row[6] : undefined;
                  tableValues.cours = row[7] || "";
                  tableValues.benefice_HTV = row[8] !== undefined ? +row[8] : undefined;
                  tableValues.benefice_net = row[9] !== undefined ? +row[9] : undefined;
                  tableValues.generalId = this.id || 0;  // Ensure generalId is set correctly

                  importedList.push(tableValues);
              }
          });
          
          // Add the importedList to your existing list
          this.serviceT.AddMultipleTableValues(importedList).subscribe({
              next: (response: any) => {
                  this.list.push(...response);
              },
              error: (error: any) => {
                  console.error('Error adding table values:', error);
                  // Handle error response from server if needed
              }
          });
      };

      reader.readAsArrayBuffer(file);
  };

  input.click();
}


SelectedValues : TableValues[] =  [];

Remove() {
    this.serviceT.RemoveTableValues(this.id,this.SelectedValues).subscribe({
      next : (response : any) =>
        {
          this.messageService.add({severity:'success', summary:'Supprimer', detail:" Client a ete supprimer"});
        }
    })

  for (const item of this.SelectedValues) {
      this.list = this.list.filter(i => i !== item);
  }
  this.SelectedValues = [];
}

CalculateBenifice(values: TableValues)
{
  if(values.vente && values.achat)
  {  
            values.benefice =  (values.vente-values.achat)/2
            return (values.vente-values.achat)/2  
  }
  else return 0 
}

CalculateHTV(values: TableValues): number {
  if(values.cours!=="")
    {
      if (values && typeof values.cours === 'string') {

        const coursNumbers = parseFloat(values.cours.replace(/[^\d.-]/g, ''));
        
        if (!isNaN(coursNumbers) && values.benefice !== undefined) { 
            values.benefice_HTV = values.benefice * coursNumbers
            return values.benefice * coursNumbers;
        }
    }
    }
    else
    {
      values.benefice_HTV = 0
      return 0;
    }
  return 0; 
}



Calculatemagasinage(values: TableValues) {
  if (values && values.vente !== undefined && values.achat !== undefined) {
      values.benefice = values.vente - values.achat
      return values.vente - values.achat;
  } else {
      return 0;
  }
}

CalculateNET(values: TableValues): number {
  if(values.benefice)
  {
    if(values.cours!=="")
      {
        const HTV = this.CalculateHTV(values); // Calculate HTV
        const VATRate = 0.19; // VAT rate (19%)
      
        // Calculate NET by subtracting VAT
        const VATAmount = HTV * VATRate;
        const NET = HTV - VATAmount;
      
        // Assign NET to the values object
        values.benefice_net = NET;
        return NET;
      }
      else 
      {
        values.benefice_net = values.benefice;
        return values.benefice
      }
  }
  return 0
}


CalculateRetourdefond(id : number)
{
  
}

CalculateTotalHTV() {
  let sum = 0;


  for (const item of this.list) {

      sum += item.benefice_HTV || 0; 
  }

  return sum
}



CalculateTotalNET() {
  let sum = 0;


  for (const item of this.list) {

      sum += item.benefice_net || 0; 
  }

  return sum
}



saveValues()
{
  this.serviceT.updateTableValues(this.list).subscribe({
    next : (Response) => {
      this.messageService.add({severity:'success', summary:'Sauvegarder', detail:'Le Fiche de calcul a été enregistré'});
    }
  })
}



Print() {
  window.print();
}

VisibleEchange: boolean = false;
EchangeData: any = null;
LastUpdate:any; 
NextUpdate:any;
ShowEchange() {
  if (this.EchangeData === null) {
    this.getExchangeRate();
  }
  this.VisibleEchange = !this.VisibleEchange;
}

getExchangeRate() {
  this.exchangeRateService.getExchangeRate().subscribe(
    (data: any) => {
      this.EchangeData = Object.entries(data.conversion_rates).map(([currency, rate]) => ({ currency, rate }));
      this.LastUpdate = data.time_last_update_utc
      this.NextUpdate = data.time_next_update_utc
      this.VisibleEchange = true; // Show the exchange data after fetching
    },
    (error) => {
      console.error('Error fetching exchange rates:', error);
    }
  );
}



}
