import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// Modèle des données que vous souhaitez envoyer
interface ProductData {
  name: string;
  updated_at: Date;
  prices: number[];
  rate: number;
  category: 'product' | 'equipment';
}


@Injectable({
  providedIn: 'root'
})
export class StoresService {

  private apiUrl = 'https://localhost:3000/kraken';

  constructor(private http: HttpClient) { }


  // Fonction pour lire et normaliser les données du fichier Excel
  readExcelFile(filePath: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      // Charger le fichier Excel depuis le dossier assets
      fetch(filePath)
        .then((response) => response.arrayBuffer())
        .then((data) => {
          const workbook = XLSX.read(data, { type: 'array' });

          // Lire chaque feuille du classeur
          const allSheetsData = workbook.SheetNames.map(sheetName => {
            const sheet = workbook.Sheets[sheetName];
            const rawData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

            // Normaliser les données pour chaque tableau
            return this.normalizeData(rawData.slice(1)); // Normaliser chaque tableau (en excluant l'en-tête)
          });

          // Combiner les tableaux normalisés
          const normalizedData = allSheetsData.flat(); // Utilise `flat` pour aplatir les tableaux

          resolve(normalizedData);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  // Fonction pour normaliser les données
  private normalizeData(rawData: any[]): any[] {
    return rawData
      .map((row) => {
        if (!row[0] || row[0] === 'name') {
          return null;
        }
        return {
          name: row[0] || '',
          updated_at: row[1] ? new Date(row[1]) : new Date(),
          prices: this.parsePrices(row[2]),
          rate: row[3] || 0,
          category: row[0].toLowerCase().includes('equipment') ? 'equipment' : 'product',
        };
      })
      .filter((row) => row !== null);
  }

  private parsePrices(prices: any): number[] {
    if (typeof prices === 'string') {
      return prices
        .split(';')
        .map((price) => {
          const formattedPrice = price.trim().replace(',', '.');
          const parsedPrice = parseFloat(formattedPrice);
          return isNaN(parsedPrice) ? 0 : parsedPrice;
        });
    }
    return [];
  }



  // Fonction POST pour envoyer les données
  adddocument(data: ProductData[]): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }


  // Méthode GET pour récupérer la liste des magasins
  getStores(): Observable<any> {
    return this.http.get<any[]>(this.apiUrl);
  }

}