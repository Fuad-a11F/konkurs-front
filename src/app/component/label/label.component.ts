import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss'],
})
export class LabelComponent implements OnInit {
  constructor() {}

  @Input('type') type: string | undefined;

  ngOnInit(): void {}

  getType() {
    if (this.type === 'error') {
      return { 'background-color': 'red' };
    } else if (this.type === 'success') {
      return { 'background-color': 'green' };
    }

    return { 'background-color': 'red' };
  }
}
