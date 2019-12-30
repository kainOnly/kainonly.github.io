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
    {key: 'buy-source', type: 'Zset'},
    {key: 'myqueue', type: 'List'},
    // {key: 'refresh-token:e0640675-3689-45be-8241-6aa16a723c6c', type: 'String'},
    // {key: 'refresh-token:ea10125c-0272-44fc-9c11-8e5f7d33fc5e', type: 'String'},
    // {key: 'refresh-token:5a22d26e-158d-4af1-9f2a-f870dc2d7900', type: 'String'},
    // {key: 'refresh-token:d59c6b35-cb0d-4dba-a418-ba5b97520e41', type: 'String'},
    {key: 'refresh-token:6d479671-b99f-45fc-84c2-a6c572afd361', type: 'String'},
    {key: 'system:acl', type: 'Hash'},
    {key: 'system:admin', type: 'Hash'},
    {key: 'system:resource', type: 'Hash'},
    {key: 'system:role', type: 'Hash'},
    {key: 'users', type: 'Set'},
  ];

  ngOnInit(): void {
    for (let i = 0; i < 20; i++) {
      this.database.push(i);
    }
  }
}
