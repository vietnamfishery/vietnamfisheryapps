import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit {

  images: any[] = [];
  num = 1;
  constructor() {
    for (this.num; this.num <= 21; this.num += 1) {
      this.images.push(this.num);
    }
  }

  ngOnInit() {
  }

}
