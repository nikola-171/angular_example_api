export class PaymentDetail {
    //kada instanciramo ovu klasu ona vraca prazan objekat
    //da nismo odmah inicijalizali
    
    paymentDetailId: number = 0;
    cardOwnerName : string = '';
    cardNumber : string = '';
    expirationDate : string = '';
    securityCode : string = '';
}
