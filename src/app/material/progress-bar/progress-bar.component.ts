import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {
  color = 'primary';
  determinateProgressValue = 30;
  bufferProgressValue = 30;
  bufferBufferValue = 40;

  constructor() { }

  ngOnInit() {
  }

  stepDeterminateProgressVal(val: number) {
    this.determinateProgressValue = this.clampValue(val + this.determinateProgressValue);
  }

  stepBufferProgressVal(val: number) {
    this.bufferProgressValue = this.clampValue(val + this.bufferProgressValue);
  }

  stepBufferBufferVal(val: number) {
    this.bufferBufferValue = this.clampValue(val + this.bufferBufferValue);
  }

  private clampValue(value: number) {
    return Math.max(0, Math.min(100, value));
  }
}
