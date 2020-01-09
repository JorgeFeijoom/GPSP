import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-import-csv',
  templateUrl: './import-csv.component.html',
  styleUrls: ['./import-csv.component.scss']
})
export class ImportCsvComponent {
  title = 'app';
  public csvRecords: any[] = [];

  @ViewChild('fileImportInput') fileImportInput: any;

  fileChangeListenerUsers($event: any): void {

    const files = $event.srcElement.files;

    if (this.isCSVFile(files[0])) {

      const input = $event.target;
      const reader = new FileReader();
      reader.readAsText(input.files[0]);

      reader.onload = () => {
        const csvData = reader.result;
        const csvRecordsArray = (<string>csvData).split(/\r\n|\n/);

        const headersRow = this.getHeaderArray(csvRecordsArray);

        this.csvRecords = this.getDataRecordsArrayFromCSVFileUsers(csvRecordsArray, headersRow.length);
      };

      reader.onerror = function () {
        alert('Unable to read ' + input.files[0]);
      };

    } else {
      alert('Please import valid .csv file.');
      this.fileReset();
    }
  }

  fileChangeListenerSubjects($event: any): void {

    const files = $event.srcElement.files;

    if (this.isCSVFile(files[0])) {

      const input = $event.target;
      const reader = new FileReader();
      reader.readAsText(input.files[0]);

      reader.onload = () => {
        const csvData = reader.result;
        const csvRecordsArray = (<string>csvData).split(/\r\n|\n/);

        const headersRow = this.getHeaderArray(csvRecordsArray);

        this.csvRecords = this.getDataRecordsArrayFromCSVFileUsers(csvRecordsArray, headersRow.length);
      };

      reader.onerror = function () {
        alert('Unable to read ' + input.files[0]);
      };

    } else {
      alert('Porfavor, seleciona un fichero .csv válido.');
      this.fileReset();
    }
  }


  getDataRecordsArrayFromCSVFileUsers(csvRecordsArray: any, headerLength: any) {
    const dataArrUsers = [];

    for (let i = 1; i < csvRecordsArray.length; i++) {
      const data = (<string>csvRecordsArray[i]).split(',');

      // FOR EACH ROW IN CSV FILE IF THE NUMBER OF COLUMNS
      // ARE SAME AS NUMBER OF HEADER COLUMNS THEN PARSE THE DATA
      if (data.length === headerLength) {

        const csvRecordUsers: CSVRecordUsers = new CSVRecordUsers();

        csvRecordUsers.fullname = data[0].trim();
        csvRecordUsers.imagen = data[1].trim();
        csvRecordUsers.email = data[2].trim();
        csvRecordUsers.dni = data[3].trim();
        csvRecordUsers.email = data[4].trim();
        csvRecordUsers.telefono = data[5].trim();
        csvRecordUsers.hashedPassword = data[6].trim();
        csvRecordUsers.bio = data[7].trim();
        csvRecordUsers.ciudad = data[8].trim();
        csvRecordUsers.direccion = data[9].trim();
        csvRecordUsers.nacimiento = data[10].trim();
        csvRecordUsers.roles = data[11].trim();

        dataArrUsers.push(csvRecordUsers);
      }
    }
    console.log(dataArrUsers);
    return dataArrUsers;
  }

  getDataRecordsArrayFromCSVFileSubjects(csvRecordsArray: any, headerLength: any) {
    const dataArrSubjects = [];

    for (let i = 1; i < csvRecordsArray.length; i++) {
      const data = (<string>csvRecordsArray[i]).split(',');

      // FOR EACH ROW IN CSV FILE IF THE NUMBER OF COLUMNS
      // ARE SAME AS NUMBER OF HEADER COLUMNS THEN PARSE THE DATA
      if (data.length === headerLength) {

        const csvRecordSubjects: CSVRecordSubjects = new CSVRecordSubjects();

        csvRecordSubjects.codigo = data[0].trim();
        csvRecordSubjects.nombre = data[1].trim();
        csvRecordSubjects.descripcion = data[2].trim();
        csvRecordSubjects.titulacion = data[3].trim();
        csvRecordSubjects.especialidad = data[4].trim();
        csvRecordSubjects.centro = data[5].trim();
        csvRecordSubjects.departamento = data[6].trim();
        csvRecordSubjects.tipo = data[7].trim();
        csvRecordSubjects.caracter = data[8].trim();
        csvRecordSubjects.duracion = data[9].trim();
        csvRecordSubjects.creditos = data[10].trim();
        csvRecordSubjects.curso = data[11].trim();
        csvRecordSubjects.proyectoDocente = data[12].trim();
        csvRecordSubjects.enrollCode = data[13].trim();

        dataArrSubjects.push(csvRecordSubjects);
      }
    }
    console.log(dataArrSubjects);
    return dataArrSubjects;
  }

  // CHECK IF FILE IS A VALID CSV FILE
  isCSVFile(file: any) {
    return file.name.endsWith('.csv');
  }

  // GET CSV FILE HEADER COLUMNS
  getHeaderArray(csvRecordsArr: any) {
    const headers = (<string>csvRecordsArr[0]).split(',');
    const headerArray = [];
    for (let j = 0; j < headers.length; j++) {
      headerArray.push(headers[j]);
    }
    return headerArray;
  }

  fileReset() {
    this.fileImportInput.nativeElement.value = '';
    this.csvRecords = [];
  }

}

export class CSVRecordUsers {
  public fullname: any;
  public imagen: any;
  public dni: any;
  public email: any;
  public telefono: any;
  public hashedPassword: any;
  public bio: any;
  public ciudad: any;
  public direccion: any;
  public nacimiento: any;
  public roles: any;

  constructor() {

  }
}

export class CSVRecordSubjects {
  public codigo: any;
  public nombre: any;
  public descripcion: any;
  public titulacion: any;
  public especialidad: any;
  public centro: any;
  public departamento: any;
  public tipo: any;
  public caracter: any;
  public duracion: any;
  public creditos: any;
  public curso: any;
  public proyectoDocente: any;
  public enrollCode: any;

  constructor() {

  }
}


