import { Component, OnInit } from '@angular/core';
import {ApicallService} from '../../apicall.service'
import { Router,ActivatedRoute } from '@angular/router';
// import {PartyRoutingModule} from './party-routing.module'
import { Current } from '../../Common';

@Component({
  selector: 'app-party',
  templateUrl: './party.component.html',
  styleUrls: ['./party.component.scss']
})
export class PartyComponent implements OnInit {

 
  constructor(private tData:ApicallService, private route : Router, private activatedRoute : ActivatedRoute) {
    this.activatedRoute.params.subscribe(param=>{
      if(param['doctorId'] != "" && param['doctorId'] != undefined)
      {
        this.title = "Edit doctor"
        this.type = "EditParty"
        this.getSchool(param['doctorId'])
 
      }
    })
   } 
     
   title="Party"
   type= "NewParty"
   current = new Current()
  myvar:any = {doctorId: null,
    doctorName:null,
 



  }

  ngOnInit() {
  }
  getSchool(doctorId)
  {
    let qry = "Select * from doctor where doctorId = "+doctorId
    this.tData.Post("/users/executeSelectStatement",{Query : qry}).subscribe(data=>{
      console.log(data)
      this.myvar = data ['data'][0]
     
    })
  }
 
  ready(){
    if(this.type == "NewParty")
    {
        let rd = true
         
         
          if(rd){
            this.tData.saveMasterDefinition("doctor",{doctor : [this.myvar]}).subscribe(()=>{
             alert("doctor Saved");
    
            })
          }
        }else{
          {
            let updateQry = this.current.generateUpdateQuery(
              [this.myvar],
              ["doctorId"],
              ["doctorId"],
              "",
              "doctor"
              )
            
              this.tData.Post("/users/executeSelectStatement",{Query : updateQry}).subscribe(()=>{
                alert("doctor detail updated")
                
              },(err)=>{
                console.log(err)
                alert("Error while updating doctor detail")
              })
          }
        }

        }

}
