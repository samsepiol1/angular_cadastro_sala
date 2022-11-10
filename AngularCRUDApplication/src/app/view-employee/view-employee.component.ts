import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpProviderService } from '../service/http-provider.service';
import { WebApiService } from '../service/web-api.service';

@Component({
  selector: 'app-view-Employee',
  templateUrl: './view-Employee.component.html',
  styleUrls: ['./view-Employee.component.scss']
})
export class ViewEmployeeComponent implements OnInit {

  EmployeeId: any;
  EmployeeDetail : any= [];
   
  constructor(public webApiService: WebApiService, private route: ActivatedRoute, private httpProvider : HttpProviderService) { }
  
  ngOnInit(): void {
    this.EmployeeId = this.route.snapshot.params['EmployeeId'];      
    this.getEmployeeDetailById();
  }

  getEmployeeDetailById() {       
    this.httpProvider.getEmployeeDetailById(this.EmployeeId).subscribe((data : any) => {      
      if (data != null && data.body != null) {
        var resultData = data.body;
        if (resultData) {
          this.EmployeeDetail = resultData;
        }
      }
    },
    (error :any)=> { }); 
  }

}
