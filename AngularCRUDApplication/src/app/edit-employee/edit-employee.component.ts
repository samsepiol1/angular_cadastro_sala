import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpProviderService } from '../service/http-provider.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent implements OnInit {
  editEmployeeForm: EmployeeForm = new EmployeeForm();

  @ViewChild("EmployeeForm")
  EmployeeForm!: NgForm;

  isSubmitted: boolean = false;
  EmployeeId: any;

  constructor(private toastr: ToastrService, private route: ActivatedRoute, private router: Router,
    private httpProvider: HttpProviderService) { }

  ngOnInit(): void {
    this.EmployeeId = this.route.snapshot.params['EmployeeId'];
    this.getEmployeeDetailById();
  }

  getEmployeeDetailById() {
    this.httpProvider.getEmployeeDetailById(this.EmployeeId).subscribe((data: any) => {
      if (data != null && data.body != null) {
        var resultData = data.body;
        if (resultData) {
          this.editEmployeeForm.Id = resultData.id;
          this.editEmployeeForm.PlaceName = resultData.PlaceName;
          this.editEmployeeForm.MedicalEspec = resultData.MedicalEspec;
          this.editEmployeeForm.Email = resultData.email;
          this.editEmployeeForm.Desc = resultData.Desc;
          this.editEmployeeForm.Phone = resultData.phone;
        }
      }
    },
      (error: any) => { });
  }

  EditEmployee(isValid: any) {
    this.isSubmitted = true;
    if (isValid) {
      this.httpProvider.saveEmployee(this.editEmployeeForm).subscribe(async data => {
        if (data != null && data.body != null) {
          var resultData = data.body;
          if (resultData != null && resultData.isSuccess) {
            if (resultData != null && resultData.isSuccess) {
              this.toastr.success(resultData.message);
              setTimeout(() => {
                this.router.navigate(['/Home']);
              }, 500);
            }
          }
        }
      },
        async error => {
          this.toastr.error(error.message);
          setTimeout(() => {
            this.router.navigate(['/Home']);
          }, 500);
        });
    }
  }
}

export class EmployeeForm {
  Id: number = 0;
  PlaceName: string = "";
  MedicalEspec: string = "";
  Email: string = "";
  Desc: string = "";
  Phone: string = "";
}
