import { Component, OnInit } from '@angular/core';
import { ApicallService } from '../../apicall.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-labbrowser',
  templateUrl: './labbrowser.component.html',
  styleUrls: ['./labbrowser.component.scss']
})
export class LabbrowserComponent implements OnInit {

  constructor(private api : ApicallService, private route : Router) { }

  ngOnInit() {
   
    if(sessionStorage.getItem("UserId") == 'Hamdarddialysis'){
      this.uservald = true
    }
    this.getdata()
  }

  dataRows = []
  uservald=false
  dataColumns = [
    {name : 'Customer Name',prop : 'CustomerName'},
    {name : 'Id', prop : 'SchoolId'},
    {name : 'ListId', prop : 'ListId'},
    {name : 'Total Amount', prop : 'TotalAmount'},
    {name : 'Discount', prop : 'discount'},
    {name : 'Net Price', prop : 'NetPrice'},
    {name : 'Created Date', prop : 'CreatedDate'}
  ]

  getdata()
  {
   
    this.api.Post("/total/getBrowser",{Condition : "where DocNo=29 order by OpdId desc "},["EntityName=odp"]).subscribe(data=>{
      // this.dataRows = data['data']
      console.log("browserdata",data)
      this.dataColumns = data['Columns']
      this.dataRows = data['Data']['data']
      this.dataRows = [...this.dataRows]
    })
  }
  getSale(SaleId,DocNo)
    {
        let qry = 'Select * from t_sale_master where DocNo='+DocNo+' and SaleId = '+SaleId+";select t1.*,t2.ItemName,t2.Qty from t_sale_detail t1 inner join item t2 on t1.ItemId = t2.ItemId where t1.DocNo="+DocNo+" and t1.SaleId =  "+SaleId
        
        return this.api.Get("/total/execMultipleQuery",["Query="+qry])
    }

  editSale(row)
  {
   
     let route='/labentry'
    
    this.route.navigate([route,{SaleId : row['OpdId'],DocNo:'29'}])
  }

  printSale(row)
  {
    this.getSale(row['OpdId'],29).subscribe(data=>{
     let model = data[0]['data'][0]
  
     let dataRows = data[1]['data']
     localStorage.setItem("invoice",JSON.stringify({"form":model,"table":dataRows,"state":"Lab"})) // storing data to print on invoice
     this.route.navigateByUrl('/print/newprint') // taking to the invoice print page
 
      
    })

     
  }

  deleteSale(SaleId,rowIndex)
  {
    debugger
    let qry = 'Delete from t_sale_master where DocNo=29 and SaleId = '+SaleId+";Delete from t_sale_detail where DocNo=29 and SaleId = "+SaleId
 

    this.api.Get("/total/execMultipleQuery",["Query="+qry]).subscribe(()=>{
      alert("Sale delete Successfully")
      this.dataRows.splice(rowIndex,1)
      this.dataRows = [...this.dataRows]
    })
  }

  exportToExcel()
  {
    let qry = "Select SaleId as OdpId,PatientName,PatientMobile,TotalAmount,CreatedDate from t_sale_master where DocNo=29"
    this.api.Post("/users/executeSelectStatement",{Query : qry}).subscribe((data)=>{
      console.log(data)
      this.api.exportToExcel(data['data'],"Odp")
    })
  }

}
