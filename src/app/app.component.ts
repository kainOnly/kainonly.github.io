import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  select = 0;
  database = [];
  listOfData = [
    {index: 0, key: 'buy-source', type: 'Zset'},
    {index: 1, key: 'myqueue', type: 'List'},
    {index: 2, key: 'refresh-token:e0640675-3689-45be-8241-6aa16a723c6c', type: 'String'},
    {index: 3, key: 'refresh-token:ea10125c-0272-44fc-9c11-8e5f7d33fc5e', type: 'String'},
    {index: 4, key: 'refresh-token:5a22d26e-158d-4af1-9f2a-f870dc2d7900', type: 'String'},
    {index: 5, key: 'refresh-token:d59c6b35-cb0d-4dba-a418-ba5b97520e41', type: 'String'},
    {index: 6, key: 'refresh-token:6d479671-b99f-45fc-84c2-a6c572afd361', type: 'String'},
    {index: 7, key: 'system:acl', type: 'Hash'},
    {index: 8, key: 'system:admin', type: 'Hash'},
    {index: 9, key: 'system:resource', type: 'Hash'},
    {index: 10, key: 'system:role', type: 'Hash'},
    {index: 11, key: 'users', type: 'Set'},
  ];

  ngOnInit(): void {
    for (let i = 0; i < 200; i++) {
      this.database.push(i);
    }
  }

  trackByIndex(_: number, data: any): number {
    return data.index;
  }
}
