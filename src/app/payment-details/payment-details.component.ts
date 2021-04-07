import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PaymentDetail } from '../shared/payment-detail.model';
import { PaymentDetailService } from '../shared/payment-detail.service';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styles: [
  ]
})
export class PaymentDetailsComponent implements OnInit {

  constructor(public service : PaymentDetailService, private toast : ToastrService) { }

  ngOnInit(): void {
    this.service.refreshList();
  }

  populateForm(selectedRecord : PaymentDetail){
    this.service.formData = Object.assign({}, selectedRecord);// ovo je prenos po referenci sve promene kasnije u
                                                              // formi se vide u tabeli stoga moramo da kopiramo objeka
  }

  onDelete(id : number){
    if(confirm('Are you sure to delete this record?')){
      this.service.deletePaymentDetail(id)
      .subscribe(
        res => {
          this.service.refreshList();
          this.toast.error("Deleted successfuly", "Payment Detail Registration");
        },
        err => {
          this.toast.error("An error occured", "Payment Detail Registration");
  
        }
      )
    }
  }

}
