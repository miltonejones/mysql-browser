import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SharedService } from '../shared/shared.service';
import { DbConnection } from '../shared/viewmodel/db-connection';

@Component({
  selector: 'app-connection-form',
  templateUrl: './connection-form.component.html',
  styleUrls: ['./connection-form.component.scss']
})
export class ConnectionFormComponent {
  connectionForm = this.fb.group({
    Key: null,
    Hostname: null,
    Username: [null, Validators.required],
    password: [null, Validators.required],
    database: [null, Validators.required], 
  });
  @Output() save = new EventEmitter<DbConnection>();
  constructor(private fb: FormBuilder, public service: SharedService) {}
  onSubmit() {
    const config: DbConnection = {
      KEY: this.connectionForm.controls['Key'].value,
      HOSTNAME: this.connectionForm.controls['Hostname'].value,
      USERNAME: this.connectionForm.controls['Username'].value,
      PASSWORD: this.connectionForm.controls['password'].value,
      DATABASE: this.connectionForm.controls['database'].value,
      Objects: []
    };
    this.service.save(config);
    location.href = `/db/${config.HOSTNAME}`
  }
  select(conn: DbConnection): void {
    this.connectionForm.controls['Key'].setValue(conn.KEY || conn.HOSTNAME)
    this.connectionForm.controls['Hostname'].setValue(conn.HOSTNAME)
    this.connectionForm.controls['Username'].setValue(conn.USERNAME)
    this.connectionForm.controls['password'].setValue(conn.PASSWORD)
    this.connectionForm.controls['database'].setValue(conn.DATABASE)
  }
}
