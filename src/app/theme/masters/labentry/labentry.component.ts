import { Component, OnInit } from '@angular/core';
import { ApicallService } from '../../apicall.service';
import { ProcessSale } from '../sale/processSale';
import { SaleOrderProcess } from './processAndUpdateSale';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-labentry',
  templateUrl: './labentry.component.html',
  styleUrls: ['./labentry.component.scss']
})
export class LabentryComponent implements OnInit {

  constructor(private api : ApicallService,private route : Router, private activatedRoute : ActivatedRoute) {
    this.activatedRoute.params.subscribe(params=>{
      if(params['SaleId'] != "" && params['SaleId'] !=undefined)
      {
        this.Type="EditSale"
        this.title="Edit Sale"
        this.getSaleDetail(params['SaleId'],params['DocNo'])
      }
      else
      {
        let date = new Date().toISOString().split('T')[0]
        this.model['CreatedDate'] = date
      }
    })
   }
  ngOnInit() {
    this.getItemList()
    this.getdoctorlist()
  //  this.getBookList()
  

  }
  BookList = []
  dropdowns = {'ListId' : ''}
  challanlist=[]
  DoctorList=[]
  ItemList = []
  SchoolList = []
  dataRows = []
  selected = [];
  Type="NewSale"
  title="New Sale"
totaldiscount=0;
batchlist=[]
company:any;
  model = {
    SaleId : '',
    PatientName : '',
    SchoolId : '',
    ListId : '',
    DocNo : '29',
    TotalAmount : '',
    discount : '',
    NetAmount : '',
    CreatedDate : '',
    PatientMobile:'',
    PatientAddress:'',
    Age:'',
    Sex:'',
    doctorname:'',
    CreatedBy:''

  }
  
  saveSale = new ProcessSale(this.api)
  processSale = new SaleOrderProcess(this.api)
  // listBrowser = new getBookNames(this.api);
  getItemList()
  {  if (!this.api.netConnectivity()) {
    return;
  }
    let qry = "Select ItemId,ItemName,Qty,rate from item where Active='Y' and type='Lab'"
    this.api.Post("/users/executeSelectStatement",{Query : qry}).subscribe(item=>{
     this.ItemList = item['data']
   
    })
  }
  
  

  //Generate Rows for Ngx-datatable, also adding Item Quantity in every row
  // generateBookRows(books:[] = [])
  // {
  //   this.dataRows = []
  //   books.forEach(book=>{
  //     this.dataRows.push(Object.assign({'Quantity':1,'NetPrice' : ''},book))
  //   })
  //   console.log("thisisdatarows",this.dataRows)
  //   this.updateNetPrice(-1)
  //   this.dataRows = [...this.dataRows]
    
  // }

  // getBookList()
  // {  if (!this.api.netConnectivity()) {
  //   return;
  // }
  //   this.api.getList("Book").subscribe(res=>{
  //     this.BookList = res['data']
  //     if(this.model['ListId'] == '')
  //     {
  //       this.model['ListId'] = this.BookList[0]['Id']
  //     }
  //   })
  // }
  getdoctorlist()
  {
    let qry = "Select * from doctor" 
    this.api.Post("/users/executeSelectStatement",{Query : qry}).subscribe(item=>{
     this.DoctorList = item['data']
     
    })
  }


  addrow()
  {  if (!this.api.netConnectivity()) {
    return;
  }

    let saleDetailModel = {
      'ItemId' : this.ItemList[0]['ItemId'],
      'rate' : this.ItemList[0]['rate'],
      'Quantity' : 1,
      'freeqty':0,
      'disc' : 0,
      'discrate':0,

      'Qty' : this.ItemList[0]['Qty'],
      'NetPrice' : this.ItemList[0]['rate']

    }
   
    this.dataRows.push(saleDetailModel)
    this.dataRows = [...this.dataRows]
    this.updateNetPrice(this.dataRows.length-1)
    this.updateTotalAmount()
    console.log("Added Sale detail model : ",saleDetailModel)
  }

  deleterow(index)
  {
    this.dataRows.splice(index,1)
    this.dataRows = [...this.dataRows]
    this.updateTotalAmount()

  }


 

  onSelect({ selected }) {
    debugger
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }




  update(index,col,value)
  {
    this.dataRows[index][col] = value
    this.updateRow(index)
  }
  update1(index,col,value)
  {
    this.dataRows[index][col] = value
    this.updateRow1(index)
  }

  updateRow(index)
  {
    debugger
    let ItemId = this.dataRows[index]['ItemId']
    this.ItemList.forEach(item=>{
      if(item['ItemId'] == ItemId)
      {
        
      
        this.dataRows[index]['rate'] = item['rate']
        
        this.dataRows[index]['Qty'] = item['Qty']
 
        
      }
    })
    this.updateNetPrice(index)
  }

  
  updateRow1(index)
  {
    debugger
    let ItemId = this.dataRows[index]['ItemId']
    this.ItemList.forEach(item=>{
      if(item['ItemId'] == ItemId)
      {
        
        this.dataRows[index]['Qty'] = item['Qty']
  
      }
    })
    this.updateNetPrice(index)
  }


  

  updateNetPrice(index)
  {

    let amount = 0
    let rate  = Number(this.dataRows[index]['rate'])
    let quantity = Number(this.dataRows[index]['Quantity'])
    let disc =  Number(this.dataRows[index]['disc'])
if(disc>0){
  this.dataRows[index]['discrate'] = rate*(disc)/100;
  rate = rate-(rate*(disc)/100)
} 
this.dataRows[index]['NetPrice'] = String(((rate)*quantity).toFixed(2))
  
    this.dataRows[index]['DocNo'] = '29'
    this.dataRows = [...this.dataRows]



 
    this.updateTotalAmount()
  }

  updateTotalAmount()
  {
    let totalamount = 0
    this.dataRows.forEach(row=>{
      totalamount += Number(row['NetPrice'])
    })         
    this.model['TotalAmount'] = String(totalamount.toFixed(2))  
    this.model['CreatedBy'] = sessionStorage.getItem("UserId");
    this.applydiscount()
  }

  

 applydiscount()
 {
    let discount = Number(this.model['discount'])
    let totalamount = Number(this.model['TotalAmount'])
    let discountamount = totalamount * (discount/100)
    this.model['discount'] = String(discountamount.toFixed(2))
    this.model['NetAmount'] = String((totalamount-discountamount).toFixed(2))
 }

  submit()
  {
    if (!this.api.netConnectivity()) {
      return;
    }
  
    this.model['CreatedBy'] = sessionStorage.getItem("UserId");
    console.log("Odp Model : ",this.model)
    console.log("Odp detail :",this.dataRows)
    if(this.isValid())
    {
      if(this.Type=="NewSale")
      {
        this.processNewSale()
      }
      else
      {
        this.updateSale()
      }
     
    }
  }

  isValid()
  {
    let valid = true
    let errorMessage = ""
    this.totaldiscount=0;
    if(this.model['PatientName']=='')
    {
      valid = false;
      errorMessage="\nPatient Name can't be empty\n"
    }

    if(!valid)
    {
      alert(errorMessage)
    }
    return valid
  }

  processNewSale()
  {
    debugger
   console.log(this.totaldiscount);
   this.model['discount']= (this.totaldiscount).toString();
    this.processSale.insertintoSaleMaster(this.model).subscribe(SaleId=>{
      this.processSale.insertintoSaleDetail(this.dataRows,SaleId).subscribe(data=>{
        this.model['SaleId']= String(SaleId)
        alert("Lab Processed\n Lab Id : "+SaleId)
        this.route.navigateByUrl("/labbrowser")
      },err=>{
        console.log("Error while inserting into Lab detail")
      })
    },err=>{
      console.log("Error while inserting into Lab Master",err)
    })
    this.processSale.updateItemMaster(this.dataRows)
    
    
  }
  //////////////////////////////////////////////////////////////////////////////////////////////
  //for updating Sale

  getSaleDetail(SaleId,DocNo)
  {
    this.processSale.getSale(SaleId,DocNo).subscribe(data=>{
      this.model = data[0]['data'][0]
  
      this.dataRows = data[1]['data']
      this.processSale.setOldDataRow(JSON.parse(JSON.stringify(data[1]['data'])))
    })
  }

  updateItem(index,col,value)
  {

      this.dataRows[index][col] = value
      this.updateRow(index)

  }

  updateSale()
  {
    this.processSale.updateSaleMaster(this.model).subscribe(data=>{
      console.log("Updated Odp Master")
    })
    
    this.processSale.updateSaleDetail(this.dataRows,Number(this.model['SaleId'])).subscribe(data=>{
      console.log("old rows deleted from Odp detail")
      this.processSale.insertintoSaleDetail(this.dataRows,this.model['SaleId']).subscribe(data=>{
        console.log("new rows inserted into datarows")
        alert("Odp detail updated")
        this.route.navigateByUrl("/salebrowser")
      })
    })

  
    
  }

  printInvoice() // function to generate invoice data
  {
    if (!this.api.netConnectivity()) {
      return;
    }
      localStorage.setItem("invoice",JSON.stringify({"form":this.model,"table":this.dataRows,"state":"Lab"})) // storing data to print on invoice
      this.route.navigateByUrl('/print/newprint') // taking to the invoice print page
  }
}
