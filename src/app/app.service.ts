import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() {}
  setCookie(cname, cvalue, exdays) {
    if(exdays != 0){
      var d = new Date();
      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
      var expires = "expires=" + d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    } else {
      document.cookie = cname + "=" + cvalue + ";path=/";
    }
	}

	getCookie(cname: string) {
		let res;
		const arr = document.cookie.split('; ');
		arr.forEach(e => {
			if(e.split('=')[0] === cname){
				res = e.split('=')[1] === 'true' ? true :  e.split('=')[1] === 'false' ? false : e.split('=')[1]
			}
		});
		return res;
	}
}
