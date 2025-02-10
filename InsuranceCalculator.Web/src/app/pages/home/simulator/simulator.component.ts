import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BankConditionsRequest } from '../../../core/models/request/bank-conditions-request';
import { Router } from '@angular/router';
import { HttpClientService } from '../../../core/services/http-client.service';
import { MatDialog } from '@angular/material/dialog';
import { EndPoints } from '../../../core/models/const/endpoints.enum';
import { TypeEndPoints } from '../../../core/models/const/type-endpoints.enum';
import { DialogDto } from '../../../core/models/dialog-dto';
import { DialogMessageComponent } from '../../common/dialog-message/dialog-message.component';
import { ViewSimulatorComponent } from '../../common/view-simulator/view-simulator.component';
import { FinancialStudyDto } from '../../../core/models/response/bank-conditions-response';
import { ProgressSpinnerService } from '../../../core/services/progress-spinner.service';

@Component({
  selector: 'app-simulator',
  standalone: false,
  templateUrl: './simulator.component.html',
  styleUrl: './simulator.component.css',
})
export class SimulatorComponent {
  readonly dialog = inject(MatDialog);
  readonly panelOpenState = signal(false);
  step = signal(0);
  isResultsPanelEnabled = false;
  resultadoFinanciero: FinancialStudyDto = {} as FinancialStudyDto;
  bankConditionsRequest: BankConditionsRequest = {} as BankConditionsRequest;
  items: number[] = [];
  validationPeriod = false;
  formSimulator: FormGroup = new FormGroup({
    NameClient: new FormControl('', Validators.required),
    FinancialAdvisor: new FormControl('', Validators.required),
    BankName: new FormControl('', Validators.required),
    CreditNumber: new FormControl('', Validators.required),
    Balance: new FormControl(0, [Validators.required, Validators.min(0)]),
    PendingInstallments: new FormControl(0, [
      Validators.required,
      Validators.min(0),
    ]),
    MonthlyInstallment: new FormControl(0, [
      Validators.required,
      Validators.min(0),
    ]),
    CurrentInsuranceCost: new FormControl(0, [
      Validators.required,
      Validators.min(0),
    ]),
    CapitalPayment: new FormControl(0, [
      Validators.required,
      Validators.min(0),
    ]),
    InterestPayment: new FormControl(0, [
      Validators.required,
      Validators.min(0),
    ]),
    CanceledInstallments: new FormControl(0, [
      Validators.required,
      Validators.min(0),
    ]),
    InterestRate: new FormControl(0, [
      Validators.required,
      Validators.min(0),
      Validators.max(100),
    ]),
    PercentageFees: new FormControl(0, [
      Validators.required,
      Validators.min(0),
      Validators.max(100),
    ]),
    Subsidy: new FormControl(0, [Validators.required, Validators.min(0)]),
    newItem: new FormControl(0, []),
    ListProjectionperiod: new FormControl([], Validators.required),
  });

  constructor(private router: Router, private service: HttpClientService,private progressSpinnerService: ProgressSpinnerService) {}

  async submit() {
    let dialog = { Tittle: 'Mensaje', Message: '' } as DialogDto;
    if (this.formSimulator.valid) {
      const bankConditions: BankConditionsRequest = this.getBankConditions();
      try {
        console.log(bankConditions);
        let response = (await this.service.Post(
          EndPoints.Simulator,
          TypeEndPoints.GenerarProyeccionesv2,
          bankConditions
        )) as FinancialStudyDto;
        console.log(response);
        this.bankConditionsRequest = bankConditions;
        this.resultadoFinanciero = response;
        this.isResultsPanelEnabled = true;
        this.step.set(1);
        // this.dialog.open(ViewSimulatorComponent, {
        //   data: response
        // });
      } catch (error: any) {
        dialog.Message = error.Message;
        this.dialog.open(DialogMessageComponent, {
          data: dialog,
        });
      }
    }
  }

  addItem(): void {
    if (
      this.formSimulator.value.newItem > 0 &&
      !this.items.includes(this.formSimulator.value.newItem)
    ) {
      if (
        this.formSimulator.value.newItem >= this.formSimulator.value.PendingInstallments
      ) {
        this.validationPeriod = true;
      } else {
        this.validationPeriod = false;
        this.items.push(this.formSimulator.value.newItem);
        this.formSimulator.get('newItem')?.setValue(0);
        this.formSimulator.get('ListProjectionperiod')?.setValue(this.items);
      }
    }
  }

  removeItem(item: number): void {
    const index = this.items.indexOf(item);
    if (index >= 0) {
      this.items.splice(index, 1);
      this.formSimulator.get('ListProjectionperiod')?.setValue(this.items);
    }
  }

  canAddItems(): boolean {
    return this.items.length < 5;
  }

  hasError = (controlName: string, errorName: string) => {
    return this.formSimulator.controls[controlName].hasError(errorName);
  };
  resetForm(): void {
    this.formSimulator.reset();
    this.step.set(0);
    this.isResultsPanelEnabled = false;
  }
  setStep(index: number) {
    this.step.set(index);
  }

  getBankConditions(): BankConditionsRequest {
    return {
      nameClient: this.formSimulator.value.NameClient,
      financialAdvisor: this.formSimulator.value.FinancialAdvisor,
      bankName: this.formSimulator.value.BankName,
      creditNumber: this.formSimulator.value.CreditNumber,
      balance: this.formSimulator.value.Balance,
      pendingInstallments: this.formSimulator.value.PendingInstallments,
      monthlyInstallment: this.formSimulator.value.MonthlyInstallment,
      currentInsuranceCost: this.formSimulator.value.CurrentInsuranceCost,
      capitalPayment: this.formSimulator.value.CapitalPayment,
      interestPayment: this.formSimulator.value.InterestPayment,
      canceledInstallments: this.formSimulator.value.CanceledInstallments,
      interestRate: this.formSimulator.value.InterestRate,
      PercentageFees: this.formSimulator.value.PercentageFees,
      subsidy: this.formSimulator.value.Subsidy,
      listProjectionperiod: this.formSimulator.value.ListProjectionperiod,
    };
  }

  handleChildUpdate(state: { stepValue: number; isFinished: boolean }) {
    this.step.set(state.stepValue);
    this.isResultsPanelEnabled = state.isFinished;
    if(state.isFinished){
      this.formSimulator.reset();
      this.items =[];
      this.step.set(0);
    }
  }
}
