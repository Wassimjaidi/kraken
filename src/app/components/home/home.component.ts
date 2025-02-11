import { Component } from '@angular/core';
import { StoresService } from '../../stores.service';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule],
  providers: [StoresService], 
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {
  excelData: any[] = [];
  totalRows: number = 0;
  constructor(private storesService: StoresService) { }


  ngOnInit(): void {
    // Chemin vers le fichier Excel dans le dossier assets
    const filePath = 'assets/input-xl.xlsx';
    this.loadStores(); 
    // Lire et normaliser les données du fichier Excel
    this.storesService.readExcelFile(filePath).then((data) => {
      this.excelData = data;
      this.totalRows = this.excelData.length; // Récupérer le nombre de lignes
      console.log(this.excelData); // Afficher les données normalisées dans la console
      console.log('Nombre total de lignes:', this.totalRows); // Afficher le nombre total de lignes
    }).catch((error) => {
      console.error('Erreur lors de la lecture du fichier Excel', error);
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.readExcelFile(file);
    }
  }

  readExcelFile(file: File): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0]; // Prend la première feuille
      const sheet = workbook.Sheets[sheetName];
      this.excelData = XLSX.utils.sheet_to_json(sheet); // Convertit en JSON
      this.totalRows = this.excelData.length;
      console.log(this.excelData);
    };
    reader.readAsArrayBuffer(file);
  }


  formatPrice(price: number): string {
    if (price % 1 === 0) {
      // Si le prix est un entier (pas de décimales)
      return price.toString();
    } else {
      // Si le prix a des décimales
      return price.toLocaleString('fr-FR', {
        minimumFractionDigits: 2, // Toujours afficher 2 décimales
        maximumFractionDigits: 2,
      });
    }
  }

  sendData(): void {
    /* this.authService.authState.subscribe(user => {
      if (user) {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${user.idToken}`);
        this.storesService.adddocument(this.excelData, headers).subscribe(response => {
          console.log('Données envoyées avec succès', response);
        });
      } else {
        console.warn('Utilisateur non authentifié');
      }
    }); */
  }

  // Méthode pour appeler le service et récupérer la liste des magasins
  loadStores(): void {
    this.storesService.getStores().subscribe(
      (data) => {
        console.log('Données récupérées :', data);
      },
      (error) => {
        console.error('Erreur lors de la récupération des données', error);
      }
    );
  }


}
