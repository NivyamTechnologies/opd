import { Component, OnInit } from '@angular/core';
import { ApicallService } from '../../apicall.service';
import { ProcessSale } from '../sale/processSale';
import { SaleOrderProcess } from './processAndUpdateSale';
import { ActivatedRoute, Router } from '@angular/router';
import { getBookNames } from '../../browsers/list-browser/list-browser.component';
@Component({
  selector: 'app-salechallan',
  templateUrl: './salechallan.component.html',
  styleUrls: ['./salechallan.component.scss']
})
export class SalechallanComponent implements OnInit {

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
        this.time= new Date().getHours() + ':' + new Date().getMinutes() + ':'+  new Date().getSeconds();
        this.model['time'] = this.time;
        let date = new Date().toISOString().split('T')[0]
        this.model['CreatedDate'] = date
      }
    })
   }
  ngOnInit() {
    this.getItemList()
    this.getdoctorlist()
    this.getBookList()

  }
  time:any;
  BookList = []
  dropdowns = {'ListId' : ''}
  DoctorList=[]
  challanlist=[]
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
    DocNo : '28',
    TotalAmount : '',
    discount : '',
    NetAmount : '',
    CreatedDate : '',
    PatientMobile:'',
    PatientAddress:'',
    Age:'',
    Sex:''

  }
  
  saveSale = new ProcessSale(this.api)
  processSale = new SaleOrderProcess(this.api)
  listBrowser = new getBookNames(this.api);
  getItemList()
  {
    let qry = "Select ItemId,ItemName,Qty,rate from item where Active='Y' and type='Ipd'"
    this.api.Post("/users/executeSelectStatement",{Query : qry}).subscribe(item=>{
     this.ItemList = item['data']
     console.log("Item List :",item)
    })
  }


  addrow()
  {
    let saleDetailModel = {
      'ItemId' : this.ItemList[0]['ItemId'],
      'rate' : this.ItemList[0]['rate'],
      'Quantity' : 1,
      'freeqty':0,
      'disc' : 0,
      'discrate':0,
       'DocNo':28,
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


  updateItem(index,col,value)
  {

      this.dataRows[index][col] = value
      this.updateRow(index)

  }

  updateNetPrice(index)
  {if(index!=-1){
    let amount = 0
    let rate  = Number(this.dataRows[index]['rate'])
    let quantity = Number(this.dataRows[index]['Quantity'])

    let disc =  Number(this.dataRows[index]['disc'])

if(disc>0){
  this.dataRows[index]['discrate'] = rate*(disc)/100;
  rate = rate-(rate*(disc)/100)
}
  
    this.dataRows[index]['NetPrice'] = String(((rate)*quantity).toFixed(2))
  
    this.dataRows[index]['DocNo'] = '28'
    this.dataRows = [...this.dataRows]
}
else{
  this.dataRows.forEach((row,index)=>{
    let rate = Number(this.dataRows[index]['rate'])

    let qty = Number(this.dataRows[index]['Quantity'])
   
    this.dataRows[index]['NetPrice'] = String(((rate)*qty).toFixed(2))
  
  })
}
    
 
    this.updateTotalAmount()
  }

  updateTotalAmount()
  {
    let totalamount = 0
    this.dataRows.forEach(row=>{
      totalamount += Number(row['NetPrice'])
    })
    this.model['TotalAmount'] = String(totalamount.toFixed(2))
    
    this.applydiscount()
  }

  

 applydiscount()
 {
    debugger
    let discount = Number(this.model['discount'])
    let totalamount = Number(this.model['TotalAmount'])
    let discountamount = totalamount * (discount/100)
 
    this.model['NetAmount'] = String((totalamount-discountamount).toFixed(2))
 }
 getBookList()
 {  if (!this.api.netConnectivity()) {
   return;
 }
   this.api.getList("Book").subscribe(res=>{
     this.BookList = res['data']
     if(this.model['ListId'] == '')
     {
       this.model['ListId'] = this.BookList[0]['Id']
     }
   })
 }
 getBooks()
 {  if (!this.api.netConnectivity()) {
   return;
 }
   let qry = "Select BookIds from t_list_master where ListId = "+this.model['ListId']
   this.api.Post('/users/executeSelectStatement',{Query : qry}).subscribe(data=>{
     console.log("BooksId : ",data)
     this.listBrowser.getBookNameFromItemTable(String(data['data'][0]['BookIds']).split(',')).subscribe(data=>{
       console.log(data)
       this.generateBookRows(data['data'])
     })
   })
   
 }

 //Generate Rows for Ngx-datatable, also adding Item Quantity in every row
 generateBookRows(books:[] = [])
 {
   this.dataRows = []
   books.forEach(book=>{
     this.dataRows.push(Object.assign({'Quantity':1,'NetPrice' : '','DocNo':28},book))
   })
   console.log("thisisdatarows",this.dataRows)
   this.updateNetPrice(-1)
   this.dataRows = [...this.dataRows]
   
 }
 getdoctorlist()
  {
    let qry = "Select * from doctor" 
    this.api.Post("/users/executeSelectStatement",{Query : qry}).subscribe(item=>{
     this.DoctorList = item['data']
     
    })
  }
  submit()
  { 
    
    if (!this.api.netConnectivity()) {
      return;
    }
    this.model['CreatedBy'] = sessionStorage.getItem("UserId");
    console.log("Idp Model : ",this.model)
    console.log("Idp detail :",this.dataRows)

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

    this.processSale.insertintoSaleMaster(this.model).subscribe(SaleId=>{
      this.processSale.insertintoSaleDetail(this.dataRows,SaleId).subscribe(data=>{
        this.model['SaleId']= String(SaleId)
        alert("Ipd Processed\n Ipd Id : "+SaleId)
        this.route.navigateByUrl("/schallanbrowser")
      },err=>{
        console.log("Error while inserting into Ipd detail")
      })
    },err=>{
      console.log("Error while inserting into Ipd Master",err)
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

  updateSale()
  {
    this.processSale.updateSaleMaster(this.model).subscribe(data=>{
     
    })
    
    this.processSale.updateSaleDetail(this.dataRows,Number(this.model['SaleId']),28).subscribe(data=>{
     
      this.processSale.insertintoSaleDetail(this.dataRows,this.model['SaleId']).subscribe(data=>{
     
        alert("Ipd detail updated")
      
      })
    })

  
    
  }

  printInvoice() // function to generate invoice data
  {
    debugger
      localStorage.setItem("invoice",JSON.stringify({"form":this.model,"table":this.dataRows,"state":"IPD"})) // storing data to print on invoice
      this.route.navigateByUrl('/print/newprint') // taking to the invoice print page
  }
}
