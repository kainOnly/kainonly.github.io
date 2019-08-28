import { Component, OnInit } from '@angular/core';
import { NzContextMenuService, NzDropdownMenuComponent, NzFormatEmitEvent, NzTreeNode } from 'ng-zorro-antd';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  search = '';
  type = 'jack';
  redisKey = 'refresh-token:3a51408f-6179-4afa-a624-f94ef2be0f6d';
  nodes = [
    {
      title: 'refresh-token',
      key: 'refresh-token',
      children: [
        {
          title: 'refresh-token:3a51408f-6179-4afa-a624-f94ef2be0f6d',
          key: 'refresh-token:3a51408f-6179-4afa-a624-f94ef2be0f6d',
          isLeaf: true,
        },
      ],
    },
    {
      title: 'system',
      key: 'system',
      children: [
        {
          title: 'system:acl',
          key: 'system:acl',
          isLeaf: true,
        },
        {
          title: 'system:admin',
          key: 'system:admin',
          isLeaf: true,
        },
        {
          title: 'system:resource',
          key: 'system:resource',
          isLeaf: true,
        },
      ],
    },
  ];

  constructor(
    private nzContextMenuService: NzContextMenuService,
  ) {
  }

  ngOnInit() {
  }
}
