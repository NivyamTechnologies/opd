import { Component, OnInit } from '@angular/core';
import { ApicallService } from '../../apicall.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ledger-browsers',
  templateUrl: './ledger-browsers.component.html',
  styleUrls: ['./ledger-browsers.component.scss']
})
export class LedgerBrowsersComponent implements OnInit {

  constructor(private api : ApicallService,private route : Router) { }

  ngOnInit() {
    this.getLedgerType()
    this.getLedgerBrowser()
  }

  dataColumns = [{"name" : "Party Name", "prop" : "PartyName", "width" : "50"},
  {"name" : "Amount", "prop" : "Amount", "width" : "50"},
  {"name" : "Ledger Type", "prop" : "LedgerType", "width" : "30"},
  {"name" : "Narration", "prop" : "Narration", "width" : "50"},
  {"name" : "Mode", "prop" : "Mode", "width" : "30"},
  {"name" : "Date", "prop" : "Date", "width" : "40"} 
]
  dataRows = []
  ledgerType  = ''
  LedgerTypes = []
  editLedger(row)
  {
    this.route.navigate(["/forms/accountledger",{'LedgerId' : row['LedgerId']}])
  }

  getLedgerType()
  {
    let qry = "Select distinct LedgerType from Payment"
    this.api.Post("/users/executeSelectStatement",{Query : qry}).subscribe(res=>{
      console.log(res)
      this.LedgerTypes = res['data']
    },err=>{
      alert("Error while fetching Ledger Types")
      this.LedgerTypes = []
    })
  }

  getLedgerBrowser()
  {
    let condn = this.ledgerType !=''?"Where LedgerType='"+this.ledgerType+"'":"where 1=1"
    this.api.Post("/total/getBrowser",{Condition : condn},["EntityName=LedgerBrowser"]).subscribe(data=>{
      // this.dataRows = data['data']
      console.log("browserdata",data)
      this.dataColumns = data['Columns']
      this.dataColumns = [...this.dataColumns]
      this.dataRows = data['Data']['data']
      this.dataRows = [...this.dataRows]
    })
  }

  deleteLedger(LedgerId = "",index)
  {
    let qry = "delete from Payment where LedgerId =  '"+LedgerId+"'"
    this.api.Post("/users/executeSelectStatement",{Query : qry}).subscribe((data)=>{
      console.log(data)
      this.dataRows.splice(index,1)
      this.dataRows = [...this.dataRows]
    })
  }

  exportToExcel()
  {
    let qry = "Select * from Payment"
    this.api.Post("/users/executeSelectStatement",{Query : qry}).subscribe((data)=>{
      console.log(data)
      this.api.exportToExcel(data['data'],"AccountLedger")
    })
  }
}
