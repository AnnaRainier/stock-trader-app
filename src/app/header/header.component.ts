import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MatButton} from '@angular/material';
import { MatGridTile } from '@angular/material';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() userBalance: number
  constructor() { }

  ngOnInit() {
  }

}
