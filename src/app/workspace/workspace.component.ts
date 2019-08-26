import { Component, OnInit } from '@angular/core';
import { NzContextMenuService, NzDropdownMenuComponent, NzFormatEmitEvent, NzTreeNode } from 'ng-zorro-antd';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss'],
})
export class WorkspaceComponent implements OnInit {
  search = '';
  activedNode: NzTreeNode;
  type = 'jack';
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

  openFolder(data: NzTreeNode | Required<NzFormatEmitEvent>): void {
    // do something if u want
    if (data instanceof NzTreeNode) {
      data.isExpanded = !data.isExpanded;
    } else {
      const node = data.node;
      if (node) {
        node.isExpanded = !node.isExpanded;
      }
    }
  }

  activeNode(data: NzFormatEmitEvent): void {
    this.activedNode = data.node!;
  }

  contextMenu($event: MouseEvent, menu: NzDropdownMenuComponent): void {
    this.nzContextMenuService.create($event, menu);
  }

  selectDropdown(): void {
    // do something
  }
}
