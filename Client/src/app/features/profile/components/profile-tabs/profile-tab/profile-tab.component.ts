import { Component, Input, OnInit } from '@angular/core';

interface TabOption {
  code?: string;
  value?: string;
  icon?: string;
}
@Component({
  selector: 'app-profile-tab',
  templateUrl: './profile-tab.component.html',
  styleUrls: ['./profile-tab.component.scss'],
})
export class ProfileTabComponent implements OnInit {
  @Input() active = false;
  @Input() option: TabOption = {};

  ngOnInit(): void {
    console.log(this.option);
  }
}
