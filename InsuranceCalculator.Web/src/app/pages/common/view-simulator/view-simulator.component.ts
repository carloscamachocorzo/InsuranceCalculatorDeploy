import {
  NewAlternativeDTO,
  SavingsDto,
} from './../../../core/models/response/bank-conditions-response';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FinancialStudyDto } from '../../../core/models/response/bank-conditions-response';
import { MaterialModule } from '../../../material.module';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BankConditionsRequest } from '../../../core/models/request/bank-conditions-request';
import { DialogDto } from '../../../core/models/dialog-dto';
import { MatDialog } from '@angular/material/dialog';
import { DialogMessageComponent } from '../dialog-message/dialog-message.component';
import { HttpClientService } from '../../../core/services/http-client.service';
import { EndPoints } from '../../../core/models/const/endpoints.enum';
import { TypeEndPoints } from '../../../core/models/const/type-endpoints.enum';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-view-simulator',
  standalone: true,
  imports: [MaterialModule, CommonModule, FlexLayoutModule],
  templateUrl: './view-simulator.component.html',
  styleUrl: './view-simulator.component.css',
})
export class ViewSimulatorComponent implements OnChanges {
  @Input() data!: FinancialStudyDto;
  @Input() request!: BankConditionsRequest;
  @Output() updateParentState = new EventEmitter<{
    stepValue: number;
    isFinished: boolean;
  }>();
  readonly dialog = inject(MatDialog);

  requestValue!: BankConditionsRequest;

  proyectionDisplayedColumns: string[] = []; // Columnas a mostrar en la tabla
  proyectionDynamicColumns: string[] = []; // Columnas dinámicas

  initialConditionDisplayedColumns: string[] = []; // Columnas a mostrar en la tabla
  initialConditionDynamicColumns: string[] = []; // Columnas dinámicas

  displayedSavingColumns: string[] = [
    'proyectionNumber',
    'interestSavings',
    'insuranceSavings',
    'totalSavings',
    'reducedInstallments',
    'savingsYears',
  ]; //tabla ahorros

  // Campos de la interfaz NewAlternativeDTO
  NewAlternativeDTOKeys: string[] = [
    'termYears',
    'additionalPaymentWithoutInsurance',
    'additionalPaymentWithInsurance',
    'installmentWithoutInsurance',
    'totalApproximatePayment',
    'capitalPayment',
    'interestPayment',
  ];

  // Fuente de datos para la tabla
  proyeccionDataSource: any[] = [];
  initialConditionDataSource: any[] = [];

  savingsDataSource: SavingsDto[] = [];

  constructor(private service: HttpClientService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data) {
      this.loadProyectionDataSource();
      this.loadInitialConditionsDataSource();
      this.loadSavingsDataSource();
    }
    if (changes['request'] && this.request) {
      this.requestValue = this.request;
    }
  }

  loadSavingsDataSource() {
    let savings = this.data.listSavings;
    this.savingsDataSource = savings;
  }

  loadInitialConditionsDataSource() {
    if (!this.data || !Array.isArray(this.data.listNewAlternatives)) {
      console.warn('listNewAlternatives no está definido o no es un array.');
      this.initialConditionDataSource = [];
      return;
    }
    // Transponer los datos para obtener un formato adecuado
    let filterData = this.data.listNewAlternatives.filter(
      (x) => x.proyectionNumber == 0
    );
    const transposed = this.transpose(filterData);

    this.initialConditionDynamicColumns = filterData.map((row) => {
      return 'Valor';
    });
    // Combinar las columnas estáticas y dinámicas
    this.initialConditionDisplayedColumns = [
      'staticColumn',
      ...this.initialConditionDynamicColumns,
    ];

    // Llenar el dataSource con los valores transpuestos
    this.initialConditionDataSource = this.convertToTableData(
      transposed,
      this.initialConditionDynamicColumns,
      filterData
    );
  }

  loadProyectionDataSource() {
    if (!this.data || !Array.isArray(this.data.listNewAlternatives)) {
      console.warn('listNewAlternatives no está definido o no es un array.');
      this.proyeccionDataSource = [];
      return;
    }

    // Transponer los datos para obtener un formato adecuado
    let filterData = this.data.listNewAlternatives.filter(
      (x) => x.proyectionNumber > 0
    );
    const transposed = this.transpose(filterData);

    this.proyectionDynamicColumns = filterData.map((row) => {
      return 'Proyección '.concat(row.proyectionNumber.toString());
    });
    // Combinar las columnas estáticas y dinámicas
    this.proyectionDisplayedColumns = [
      'staticColumn',
      ...this.proyectionDynamicColumns,
    ];

    // Llenar el dataSource con los valores transpuestos
    this.proyeccionDataSource = this.convertToTableData(
      transposed,
      this.proyectionDynamicColumns,
      filterData
    );
  }

  transpose<T extends object>(tempData: T[]): Record<string, any[]> {
    const keys = Object.keys(tempData[0]) as string[]; // Aseguramos que las claves sean de tipo 'string'

    const result: Record<string, any[]> = keys.reduce((acc, key) => {
      acc[key] = [];
      return acc;
    }, {} as Record<string, any[]>);

    tempData.forEach((row) => {
      keys.forEach((key) => {
        result[key].push((row as any)[key]);
      });
    });

    return result;
  }
  convertToTableData(
    transposed: Record<string, any[]>,
    columns: string[],
    values: NewAlternativeDTO[]
  ): any[] {
    const rows = this.NewAlternativeDTOKeys.map((key, index) => {
      let valueKey = '';
      switch (key) {
        case 'termYears':
          valueKey = 'Plazo años (Meses)';
          break;
        case 'additionalPaymentWithoutInsurance':
          valueKey = 'Abono adicional a cuota sin seguros';
          break;
        case 'additionalPaymentWithInsurance':
          valueKey = 'Abono adicional a cuota  con seguros';
          break;
        case 'installmentWithoutInsurance':
          valueKey = 'Valor Cuota sin seguro';
          break;
        case 'totalApproximatePayment':
          valueKey = 'Total aproximado a pagar';
          break;
        case 'capitalPayment':
          valueKey = 'Abono a capital';
          break;
        case 'interestPayment':
          valueKey = 'Abono a interés';
          break;
      }

      const row: any = { staticColumn: valueKey }; // Usamos el nombre de la propiedad como columna fija

      values.forEach((_, idx) => {
        row[columns[idx]] = transposed[key][idx];
      });

      return row;
    });

    return rows;
  }

  recalcularValores() {
    // Emitir un nuevo estado para los paneles
    this.updateParentState.emit({ stepValue: 0, isFinished: false });
  }

  async downloadFile() {
    let dialog = { Tittle: 'Generación de estudio', Message: '' } as DialogDto;
    try {
      let response = (await this.service.DownloadFile(
        EndPoints.Simulator,
        TypeEndPoints.GenerateFinancialStudyPdf,
        this.requestValue
      )) as HttpResponse<Blob>;
      console.log(response);
      const contentDisposition = response.headers.get('Content-Disposition');
      let fileName = 'FinancialStudy.pdf'; // Nombre por defecto si no se encuentra en los encabezados
      if (contentDisposition) {
        const match = contentDisposition.match(/filename="([^"]+)"/);
        if (match && match[1]) {
          fileName = match[1]; // Extraer el nombre del archivo del encabezado
        }
      }
      const blob = new Blob([response.body as BlobPart]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      link.click();
      window.URL.revokeObjectURL(url);

      dialog.Message = 'Archivo descargado, revisa la bandeja de descarga';
      this.dialog.open(DialogMessageComponent, {
        data: dialog,
      }).afterClosed().subscribe(result => {
        this.updateParentState.emit({ stepValue: 0, isFinished: true });
      });;
    } catch (error: any) {
      dialog.Message = error.Message;
      this.dialog.open(DialogMessageComponent, {
        data: dialog,
      });
    }
  }
}
