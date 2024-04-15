import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css'],
})
export class HomeAdminComponent implements OnInit {
  items: MenuItem[];

  constructor() {
    this.items = [];
  }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Produtos',
        items: [
          {
            label: 'Início',
            icon: 'pi pi-fw pi-home',
            routerLink: '/admin',
          },
          {
            label: 'Usuários',
            icon: 'pi pi-pw pi-user',
            routerLink: '/admin',
          },
          {
            label: 'Cursos',
            icon: 'pi pi-fw pi-book',
            routerLink: '/admin/courses',
          },
          {
            label: 'Kit Treinamento',
            icon: 'pi pi-fw pi-briefcase',
            routerLink: '/admin/kit',
          },
          {
            label: 'Audio Player (Álbuns)',
            icon: 'pi pi-fw pi-volume-up',
            routerLink: '/admin/player',
          },
        ],
      },
      {
        label: 'Músicas',
        icon: 'pi pi-fw pi-play',
        items: [
          {
            label: 'Acervo - In build',
            icon: 'pi pi-fw pi-list',
            // TODO: Colocar routerLink
          },
          {
            label: 'Editor - In build',
            icon: 'pi pi-fw pi-file-edit',
            // TODO: Colocar routerLink
          },
        ],
      },
      {
        label: 'Utilitários',
        items: [
          {
            label: 'Subir arquivos',
            icon: 'pi pi-fw pi-upload',
            routerLink: '/admin/upload-files',
          },
        ],
      },
    ];
  }
}
