import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {
  ConfirmEventType,
  ConfirmationService,
  MessageService,
} from 'primeng/api';
import {Kit} from 'src/app/models/kit';
import {KitService} from 'src/app/services/kit.service';

@Component({
  selector: 'app-kit-admin',
  templateUrl: './kit-admin.component.html',
  styleUrls: ['./kit-admin.component.css'],
  providers: [ConfirmationService, MessageService, KitService],
})
export class KitAdminComponent implements OnInit {
  private kits: Kit[];

  constructor(
    private _confirmationService: ConfirmationService,
    private _messageService: MessageService,
    private _router: Router,
    private _kitService: KitService,
    private _spinner: NgxSpinnerService
  ) {
    this.kits = [];
  }

  ngOnInit(): void {
    this._spinner.show().then(() => {
      this.getKits();
    });
  }

  getKit() {
    return this.kits;
  }

  getKits() {
    this._kitService.getKits().subscribe({
      next: (kits: any) => {
        this._spinner.hide().then(() => {
          this.kits = kits.data;
        });
      },
      error: (error) => {
        this._spinner.hide().then(() => {
          console.log(`[ERROR] ${error}`);
        });
      },
    });
  }

  confirmDelete(id: string) {
    this._confirmationService.confirm({
      message: 'Tem certeza que deseja excluir esse kit?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this._kitService.deleteKit(id).subscribe((response) => {
          let status = response.status;
          if (status == 200) {
            this._messageService.clear();
            this._messageService.add({
              severity: 'info',
              summary: 'Deletado',
              detail: 'Você aceitou deletar este kit.',
            });
            setTimeout(() => {
              location.reload();
            }, 2000);
          }
        });
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this._messageService.clear();
            this._messageService.add({
              severity: 'error',
              summary: 'Rejeitado',
              detail: 'Você não aceitou deletar este kit.',
            });
            break;
          case ConfirmEventType.CANCEL:
            this._messageService.clear();
            this._messageService.add({
              severity: 'warn',
              summary: 'Cancelado',
              detail: 'Você desistiu de deletar este kit.',
            });
            break;
        }
      },
    });
  }

  goToInside(route: string, id: string = '') {
    if (id != '') {
      this._router.navigate([`${route}/${id}`]);
    } else {
      this._router.navigate([route]);
    }
  }

  goTo(route: string) {
    window.open(route, '_blank');
  }
}
