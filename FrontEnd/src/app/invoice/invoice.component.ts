import { Component, OnInit } from '@angular/core';
import { FactureData } from '../Shared/FactureData';
import { Facture } from '../Shared/Facture';
import { ActivatedRoute } from '@angular/router';
import { FactureServiceService } from '../Shared/FactureService.service';
import { MessageService } from 'primeng/api';
import { GeneralService } from '../Shared/General.service';
import { TableService } from 'primeng/table';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {



   facture: Facture = new Facture();
   generalid: number = 0; 
   total: number = 0;



  constructor(private route: ActivatedRoute, public ServiceF : FactureServiceService , private messageService: MessageService )  { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
        this.generalid = +params.get('id')!; 
        this.total = +params.get('montantotal')!; 
    });
    this.ServiceF.GetFacture(this.generalid).subscribe({
        next : (response : any) =>
        {
            this.facture = response;
            this.facture.factureData[0].montant = this.total;
            this.CalculateTVA()
        }
    })
  }



  numberToWords(num: number): string {
    // Ensure the number is treated as a string with three decimal places
    const fixedNum = num.toFixed(3);

    // Split the number into integer and fractional parts
    const [integerPart, fractionalPart] = fixedNum.split('.');

    const integerWords = this.convertIntegerPart(parseInt(integerPart, 10));
    const fractionalWords = this.convertFractionalPart(fractionalPart);
    
    // Combine the integer and fractional parts with the appropriate conjunction
    return `${integerWords} dinars et ${fractionalWords} millimes`.trim();
}

convertIntegerPart(num: number): string {
    const units: string[] = ['', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf'];
    const teens: string[] = ['dix', 'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize', 'dix-sept', 'dix-huit', 'dix-neuf'];
    const tens: string[] = ['', '', 'vingt', 'trente', 'quarante', 'cinquante', 'soixante', 'soixante-dix', 'quatre-vingt', 'quatre-vingt-dix'];
    const thousands: string[] = ['', 'mille', 'million', 'milliard', 'billion', 'billiard', 'trillion', 'trilliard', 'quadrillion', 'quadrilliard']; // You can extend this as needed

    let words = '';

    // Iterate through each group of three digits
    for (let i = 0; num > 0; i++) {
        let chunk = num % 1000; // Extract the last three digits
        num = Math.floor(num / 1000); // Move to the next group of three digits

        // Convert the chunk to words
        let chunkWords = '';

        // Handle hundreds
        if (chunk >= 100) {
            chunkWords += units[Math.floor(chunk / 100)] + ' cent ';
            chunk %= 100;
        }

        // Handle tens and units
        if (chunk >= 20) {
            chunkWords += tens[Math.floor(chunk / 10)] + (chunk % 10 !== 0 ? '-' : ''); // Handle tens
            chunk %= 10;
        } else if (chunk >= 10) {
            chunkWords += teens[chunk - 10] + ' '; // Handle teens
            chunk = 0; // No units in teens
        }

        // Handle units
        if (chunk > 0) {
            chunkWords += units[chunk] + ' ';
        }

        // Add the appropriate thousands unit
        if (chunkWords !== '') {
            chunkWords += thousands[i] + ' ';
        }

        words = chunkWords + words;
    }

    return words.trim();
}

convertFractionalPart(fractionalPart: string): string {
    // Convert fractional part to words
    const fractionalNumber = parseInt(fractionalPart, 10);
    return this.convertIntegerPart(fractionalNumber);
}


Print() {
    window.print();
}


CalculateTVA() {
    // Extracting the numerical part from this.FactureData[1].description
    const match = this.facture.factureData[1].description.match(/\d+(\.\d+)?/);
    const numericalPart = match ? parseFloat(match[0]) : null;


    if (numericalPart !== null && !isNaN(numericalPart)) {
        this.facture.factureData[1].montant = (this.facture.factureData[0].montant * numericalPart) / 100;
    } else {
        this.facture.factureData[1].montant = 0;
    }
}


CalculateMontantTotal() {
 return this.facture.factureData[0].montant + this.facture.factureData[1].montant + this.facture.factureData[2].montant
}


Save()
{
    this.ServiceF.updateFacture(this.facture.id,this.facture).subscribe({
        next: (response: Facture) =>
        {
            this.facture = response
            this.messageService.add({severity:'success', summary:'Sauvegarder', detail:'Le facture a été enregistré'});
        }
    })
}



}
