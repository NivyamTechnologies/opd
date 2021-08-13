import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApicallService } from '../../apicall.service';

@Component({
  selector: 'app-newprint',
  templateUrl: './newprint.component.html',
  styleUrls: ['./newprint.component.scss']
})
export class NewprintComponent implements OnInit, OnDestroy {
  mydata: any;
  count: any;
  state:any
  constructor(private api : ApicallService) { }

  ngOnInit() {

    this.getCompanyDetail() // get details of Company like company name, gstno etc from db

    if(localStorage.getItem("invoice") != undefined) // check if invoice data exist in local storage
    {
      debugger
      this.model = JSON.parse(localStorage.getItem("invoice"))['form']     // getting form data from the invoice data
      this.dataRows = JSON.parse(localStorage.getItem("invoice"))['table'] // getting item data from the invoice data
      this.state =JSON.parse(localStorage.getItem("invoice"))['state'] 
      this.getschooldetail(this.model['SaleId'])
      this.gettaxdata(this.model['SaleId']);
     let amount = Math.round(this.model['NetAmount'])
      this.words = this.api.numberToWords(amount )
this.roundoff = amount-this.model['NetAmount'] ;
this.discount =this.model['discount'] ;

    }

    // this.mydata = [{sn: 1, desc: 'CHOTI MUST oil 70 kg', msn: '2306', qty: '285.00', unit: 'BAG', listprice: '1,813.00', discount: '0%', cgstrate: '2.50%', cgstamnt: '12,919.76', sgstrate: '2.50%', sgstamnt: '12,919.76', amnt: '5,42,630.02'},{sn: 1, desc: 'CHOTI MUST oil 70 kg', msn: '2306', qty: '285.00', unit: 'BAG', listprice: '1,813.00', discount: '0%', cgstrate: '2.50%', cgstamnt: '12,919.76', sgstrate: '2.50%', sgstamnt: '12,919.76', amnt: '5,42,630.02'},{sn: 1, desc: 'CHOTI MUST oil 70 kg', msn: '2306', qty: '285.00', unit: 'BAG', listprice: '1,813.00', discount: '0%', cgstrate: '2.50%', cgstamnt: '12,919.76', sgstrate: '2.50%', sgstamnt: '12,919.76', amnt: '5,42,630.02'},{sn: 1, desc: 'CHOTI MUST oil 70 kg', msn: '2306', qty: '285.00', unit: 'BAG', listprice: '1,813.00', discount: '0%', cgstrate: '2.50%', cgstamnt: '12,919.76', sgstrate: '2.50%', sgstamnt: '12,919.76', amnt: '5,42,630.02'},{sn: 1, desc: 'CHOTI MUST oil 70 kg', msn: '2306', qty: '285.00', unit: 'BAG', listprice: '1,813.00', discount: '0%', cgstrate: '2.50%', cgstamnt: '12,919.76', sgstrate: '2.50%', sgstamnt: '12,919.76', amnt: '5,42,630.02'},{sn: 1, desc: 'CHOTI MUST oil 70 kg', msn: '2306', qty: '285.00', unit: 'BAG', listprice: '1,813.00', discount: '0%', cgstrate: '2.50%', cgstamnt: '12,919.76', sgstrate: '2.50%', sgstamnt: '12,919.76', amnt: '5,42,630.02'},{sn: 1, desc: 'CHOTI MUST oil 70 kg', msn: '2306', qty: '285.00', unit: 'BAG', listprice: '1,813.00', discount: '0%', cgstrate: '2.50%', cgstamnt: '12,919.76', sgstrate: '2.50%', sgstamnt: '12,919.76', amnt: '5,42,630.02'},{sn: 1, desc: 'CHOTI MUST oil 70 kg', msn: '2306', qty: '285.00', unit: 'BAG', listprice: '1,813.00', discount: '0%', cgstrate: '2.50%', cgstamnt: '12,919.76', sgstrate: '2.50%', sgstamnt: '12,919.76', amnt: '5,42,630.02'}];

    console.log(this.dataRows);
    if(this.dataRows.length <= 26) this.count = 'first';
    else this.count = 'second';
    console.log(this.count);
   }

   ngOnDestroy()
   {
     localStorage.removeItem("invoice") // clear localstorage when leaving invoice page
   }
roundoff:any;
words:any;
discount:any;
   model = {}
  company = {}
  school={}
  taxdata:any;
  dataRows = []
  columns = [
    
    {name : "Name", prop : "ItemName"},
    {name : "Quantity",prop : "Quantity"},
    {name : "HsnCode",prop : "HsnCode"},
    {name : "Rate", prop : "rate"},
    {name : 'Tax(%)', prop : "tex_rate"},
    {name : 'Amount', prop : "NetPrice"}
]
cname: any;
  getCompanyDetail()
  {
    let qry = "Select * from t_company_master"
    this.api.Post("/users/executeSelectStatement",{Query : qry}).subscribe((data)=>{
      console.log(data)
      this.company = data['data'][0];
      this.cname = this.company['CompanyName']
    })
  }

  getschooldetail(id){
    debugger
    let qry = `SELECT Address,gstno,panno,GRRNo,VichleNo,EwayBillNo,AadharNo,Contact FROM t_sale_master
    left JOIN
    t_school_master
    on t_school_master.SchoolId =t_sale_master.SchoolId
    where SaleId=${id}`
    this.api.Post("/users/executeSelectStatement",{Query : qry}).subscribe((data)=>{
      console.log(data)
      this.school = data['data'][0]
    })

  }

  gettaxdata(id){
    debugger
    this.taxdata = []

    let qry = `SELECT tex_rate,Round(sum(taxamount),2) taxamount,ifnull(sum(discrate),0) discount 
    FROM t_sale_detail 
    WHERE SaleId=${id} GROUP BY tex_rate`
    this.api.Post("/users/executeSelectStatement",{Query : qry}).subscribe((data)=>{
      console.log(data)
      this.taxdata = data['data']
    })

  }

  printInvoice()  // function to generate print page
  {
    const printContent = document.getElementById("invoice").innerHTML;
    const WindowPrt = window.open('', '_blank', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
    WindowPrt.document.open()
    WindowPrt.document.write(
    `<html>
      <head>
          <style>
          .shiftBlock {
            padding-left: 2mm
          }
        table {
            width: 100%;
            padding-top: 2mm;
            font-size: 14px;
            margin-bottom: 4mm;
        }
        table,th {
            border: 1px solid black;
            text-align: center;
        }
        td {
            border: 1px solid black;
            text-align: center;
        }
        .lastBlock {
            border-right: 1px solid black; padding-top: 2mm;
        }
        #footer {
          position: absolute;
          bottom: 0; 
        }
        #footer2 {
          position: absolute;
          bottom: 0; 
          top: 723mm;
        }
          </style>
          <link rel="stylesheet" type="text/css" href="./print.css">
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
          <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
          <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
      </head>
      <body onload="window.print();window.close()">
      `+printContent+`
      </body>
    </html>
    `
    )
    WindowPrt.document.close()
  }

}
