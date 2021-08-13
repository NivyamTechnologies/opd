import { Component, OnInit } from '@angular/core';
import { ApicallService } from '../../apicall.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-schallanbrowser',
  templateUrl: './schallanbrowser.component.html',
  styleUrls: ['./schallanbrowser.component.scss']
})
export class SchallanbrowserComponent implements OnInit {

  constructor(private api : ApicallService, private route : Router) { }

  ngOnInit() {
       
    if(sessionStorage.getItem("UserId") == 'Aligarian'){
      this.uservald = true
    }
    this.getdata()
  }

  uservald=false

  dataRows = []
  dataColumns = [
    {name : 'Customer Name',prop : 'CustomerName'},
    {name : 'Id', prop : 'SchoolId'},

    {name : 'Total Amount', prop : 'TotalAmount'},
    {name : 'Discount', prop : 'discount'},
    {name : 'Net Price', prop : 'NetPrice'},
    {name : 'Created Date', prop : 'CreatedDate'}
  ]

  filteredData = [];
columnsWithSearch : string[] = [];
srch(event){
  
  let filter = event.target.value.toLowerCase();

  // assign filtered matches to the active datatable
  this.dataRows = this.filteredData.filter(item => {
    // iterate through each row's column data
    for (let i = 0; i < this.columnsWithSearch.length; i++){
      var colValue = item[this.columnsWithSearch[i]] ;

      // if no filter OR colvalue is NOT null AND contains the given filter
      if (!filter || (!!colValue && colValue.toString().toLowerCase().indexOf(filter) !== -1)) {
        // found match, return true to add to result set
        return true;
      }
    }
  });
// whenever the filter changes, always go back to the first page
//this.table.offset = 0;

}
  getdata()
  {
   
    this.api.Post("/total/getBrowser",{Condition : "where DocNo=28 "},["EntityName=Idp"]).subscribe(data=>{
      // this.dataRows = data['data']
      console.log("browserdata",data)
      this.dataColumns = data['Columns']
      this.dataRows = data['Data']['data']
      this.dataRows = [...this.dataRows]
      this.filteredData = this.dataRows;
      this.columnsWithSearch = Object.keys(this.dataRows[0]);
    })
  }
  getSale(SaleId,DocNo)
  {
      let qry = 'Select * from t_sale_master where DocNo='+DocNo+' and SaleId = '+SaleId+";select t1.*,t2.ItemName,t2.Qty from t_sale_detail t1 inner join item t2 on t1.ItemId = t2.ItemId where t1.DocNo="+DocNo+" and t1.SaleId =  "+SaleId
      
      return this.api.Get("/total/execMultipleQuery",["Query="+qry])
  }
  printSale(row)
  {
    this.getSale(row['SaleId'],28).subscribe(data=>{
     let model = data[0]['data'][0]
  
     let dataRows = data[1]['data']
     localStorage.setItem("invoice",JSON.stringify({"form":model,"table":dataRows,"state":"OPD"})) // storing data to print on invoice
     this.route.navigateByUrl('/print/newprint') // taking to the invoice print page
 
      
    })

     
  }

  editSale(row)
  {
   
   let   route='/salechallan'
    
    this.route.navigate([route,{SaleId : row['SaleId'],DocNo:'28'}])
  }
  deleteSale(SaleId,rowIndex)
  {
    debugger
    let qry = 'Delete from t_sale_master where DocNo=28 and SaleId = '+SaleId+";Delete from t_sale_detail where DocNo=28 and SaleId = "+SaleId
 

    this.api.Get("/total/execMultipleQuery",["Query="+qry]).subscribe(()=>{
      alert("Sale delete Successfully")
      this.dataRows.splice(rowIndex,1)
      this.dataRows = [...this.dataRows]
    })
  }

  exportToExcel()
  {
    let qry = "Select SaleId as IdpId,PatientName,PatientMobile,TotalAmount,CreatedDate  from t_sale_master where DocNo=28"
    this.api.Post("/users/executeSelectStatement",{Query : qry}).subscribe((data)=>{
      console.log(data)
      this.api.exportToExcel(data['data'],"Idp")
    })
  }

}
