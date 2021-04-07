import { Component, OnInit } from '@angular/core';
import { PaymentDetailService } from 'src/app/shared/payment-detail.service';
import { NgModule } from '@angular/core'
import { NgForm } from '@angular/forms';
import {PaymentDetail} from '../../shared/payment-detail.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-details-form',
  templateUrl: './payment-details-form.component.html',
  styles: [
  ]
})
export class PaymentDetailsFormComponent implements OnInit {

  constructor(public service : PaymentDetailService,
              private toaster : ToastrService) { }

  ngOnInit(): void {
  }

  onSubmit(form : NgForm){
    if(this.service.formData.paymentDetailId === 0){
      //radimo insert
      this.insertRecord(form);
    }else{
      this.updaterecord(form);
    }
  }

  insertRecord(form : NgForm){
    this.service.postPaymentDetail().subscribe(
      res => {
        this.resetForm(form);
        this.toaster.success('Submitted successfully.', 'Payment detail register');
        this.service.refreshList();
        //za ovo je potrebno i da se azurira angular.json, da se doda referenca na toastr.css iz node_modules foldera
        //doda se u styles [] koji se nalazi u build
      },
      err => {
        this.toaster.error('An error occured, please try again later.', 'Payment detail registration');
        this.resetForm(form);
      }
    )
  }

  updaterecord(form : NgForm){
    this.service.putPaymentDetail().subscribe(
      res => {
        this.resetForm(form);
        this.toaster.info('Updated successfully.', 'Payment detail register');
        this.service.refreshList();
        //za ovo je potrebno i da se azurira angular.json, da se doda referenca na toastr.css iz node_modules foldera
        //doda se u styles [] koji se nalazi u build
      },
      err => {
        this.toaster.error('An error occured, please try again later.', 'Payment detail registration');
        this.resetForm(form);
      }
    )
  }

  resetForm(form: NgForm){
    form.form.reset();
    this.service.formData = new PaymentDetail(); //da osvezimo podatke, nije lose da se i ovo uradi
                                                 //jer imamo two-way data binding 
  }

}
