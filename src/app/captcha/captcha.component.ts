import { Component, OnInit } from '@angular/core';
import {NgxCaptchaService} from '@binssoft/ngx-captcha';

@Component({
  selector: 'app-captcha',
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.css']
})
export class CaptchaComponent implements OnInit {
  captchaStatus:any = null;

  captchaConfig:any = {
    type:1, 
    length:6, 
    cssClass:'custom',
    back: {
     stroke:"#2F9688",
     solid:"#f2efd2"
    } , 
    font:{
      color:"#000000", 
      size:"35px"
    }
  };

  constructor(private captchaService: NgxCaptchaService) { }

  ngOnInit(): void {
    this.captchaService.captchStatus.subscribe((status) => {
      this.captchaStatus= status
      if (status == false) {
        alert("Opps!\nCaptcha mismatch");
      } else  if (status == true) {
        alert("Success!\nYou are right");
      }
    });    
  }

}
