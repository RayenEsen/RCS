import { Facture } from "./Facture";
import { TableValues } from "./TableValues";

export class General {
    id!: number;
    dateDebut!: Date;
    dateFin!: Date;
    montantTotal : number = 0;
    
    facture!: Facture;
    tablevalues! : TableValues[]
}
