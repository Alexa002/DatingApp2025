import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Route, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-server-error',
  imports: [RouterModule,CommonModule],
  templateUrl: './server-error.component.html',
  styleUrl: './server-error.component.css'
})
export class ServerErrorComponent implements OnInit  {
  error : any;
  
  constructor(private router: Router) {
    const navigation = router.getCurrentNavigation();
    this.error = navigation?.extras?.state?.error;
  }
  
  
  
  ngOnInit():void{
    
  }



}
