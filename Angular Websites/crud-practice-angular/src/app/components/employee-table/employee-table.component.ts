import { Component, SimpleChange, SimpleChanges } from '@angular/core';
import { Employee } from '../../../../models/employee';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-table',
  imports: [
    FormsModule
  ],
  templateUrl: './employee-table.component.html',
  styleUrl: './employee-table.component.css'
})
export class EmployeeTableComponent {
  // if type not defined the type is any
  employees: Employee[] = [];
  pageNumber: number = 1;
  pageSize : number = 2;
  totalPages: number = 0;
  totalCount: number = 0;
  searchText : string = "";
  updateEmployeeId: number = -1;
  isUpdating: boolean = false;
  pagesArray : any[] = [];
  createEmployeeFormData : Employee = new Employee();

  // works like useEffect with empty dependency array i.e useEffect(() => {} , []); works while initializing the variables(first render).
  async ngOnInit() {
    await this.fetchData();
  }

  async fetchData() {
    let url = `http://localhost:5248/api/Employee?PageNumber=${this.pageNumber}&PageSize=${this.pageSize}`;

    if(this.searchText !== ""){
      url = `http://localhost:5248/api/Employee?PageNumber=${this.pageNumber}&PageSize=${this.pageSize}&SearchText=${this.searchText}`;
    }
    const response = await fetch(url);

    if (response.ok) {
      let paginatedData = await response.json();
      this.employees = paginatedData;
      this.totalPages = Number(response.headers.get('X-Total-Pages'));
      this.totalCount = Number(response.headers.get('X-Total-Count'));
      this.pagesArray = [];
      for(let i = 1; i<= this.totalPages; i++){
        this.pagesArray.push(i);
      }
      // console.log(this.employees);
      // console.log(this.totalPages);
    }
  }

  //Delete Employee
  async deleteEmployee(id: number){
    const response = await fetch(`http://localhost:5248/api/Employee/${id}` , {
      method : 'DELETE',
    });

    if(response.ok){
      if(((this.totalCount) - ((this.pageNumber-1)*this.pageSize)) == 1 && this.pageNumber>1){
        this.pageNumber = this.pageNumber-1;
      }
      this.fetchData();
    }
  }


  //  Create Employee
  async createEmployee(){
    const response = await fetch(`http://localhost:5248/api/Employee` , {
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json',
      },
      body : JSON.stringify(this.createEmployeeFormData),
    })

    if(response.ok){
      this.fetchData();
      this.createEmployeeFormData.name = "";
      this.createEmployeeFormData.id = -1;
      this.createEmployeeFormData.email = "";
      this.createEmployeeFormData.salary = 0;
    }
  }

  handlePagination(page: number){
    this.pageNumber = page;
    console.log(this.pageNumber)
    this.fetchData();
  }
}


