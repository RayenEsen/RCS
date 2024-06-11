import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { AutoCompleteModule } from 'primeng/autocomplete';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalculationsComponent } from './Calculations/Calculations.component';
import { ButtonModule } from 'primeng/button';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { CardModule } from 'primeng/card';
import { SpeedDialModule } from 'primeng/speeddial';
import { MenubarModule } from 'primeng/menubar';
import { TableModule } from 'primeng/table';
import { NavbarComponent } from './Navbar/Navbar.component';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InvoiceComponent } from './invoice/invoice.component';
import { MainCalculationsPageComponent } from './MainCalculationsPage/MainCalculationsPage.component';
import { ContextMenuModule } from 'primeng/contextmenu';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [						
    AppComponent,
      CalculationsComponent,
      NavbarComponent,
      InvoiceComponent,
      MainCalculationsPageComponent
   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule ,
    AppRoutingModule,
    ButtonModule,
    BreadcrumbModule,
    CardModule,
    SpeedDialModule,
    MenubarModule,
    TableModule,
    InputTextModule,
    DropdownModule,
    BrowserAnimationsModule,
    ContextMenuModule,
    ToastModule,
    AutoCompleteModule,
    ConfirmDialogModule,
  ],
  providers: [MessageService , ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
