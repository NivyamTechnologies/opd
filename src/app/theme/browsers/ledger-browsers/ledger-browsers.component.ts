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

  dataColumns = [
    {"name" : "Date", "prop" : "date", "width" : "40"}, 
    {"name" : "Party", "prop" : "PartyId", "width" : "50"},
  {"name" : "Debit", "prop" : "total", "width" : "50"},
  {"name" : "Credit", "prop" : "payment", "width" : "30"},
  {"name" : "Narration", "prop" : "Narration", "width" : "50"},
  {"name" : "Balance", "prop" : "Balance", "width" : "30"},

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
    let qry = "select * from (	select PartyId,total,0 payment,concat('Bill No  ',DocNo) Narration,DocDate date	from t_doc_header where PartyId=3 UNION ALL select PartyId,0 total,Amount,Narration,Date date from  Payment  where PartyId=3)v1  order by date"
    this.api.Post("/users/executeSelectStatement",{Query : qry}).subscribe((data)=>{

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
