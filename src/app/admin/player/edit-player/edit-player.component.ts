import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { Album } from 'src/app/models/album';
import { AlbumService } from 'src/app/services/album.service';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.css'],
  providers: [AlbumService, MessageService],
})
export class EditPlayerComponent implements OnInit {
  id: string;
  album: Album;

  constructor(
    private _spinner: NgxSpinnerService,
    private _albumService: AlbumService,
    private _messageService: MessageService,
    private _router: Router,
    private _route: ActivatedRoute,
  ) {
    this.id = '';
    this.album = {
      name: '',
      owner: '',
      musics: [],
      link: '',
    };
  }

  ngOnInit(): void {
    this._spinner.show();
    this._route.params.subscribe((params) => {
      this.id = params['id'];
      this.getOneAlbum(this.id);
    });
  }

  getOneAlbum(id: string) {
    this._albumService.getOneAlbum(id).subscribe((response) => {
      if (response.status == 200) {
        this.album = response.body.data;
      }
      this._spinner.hide();
    });
  }

  addMusic() {
    this.album.musics.push({
      title: '',
      artist: '',
      cover: '',
      file: '',
    });
  }

  removeMusic(index: any) {
    this.album.musics.splice(index, 1);
  }

  onSubmit() {
    if (
      this.album.name == '' ||
      this.album.owner == '' ||
      this.album.link == ''
    ) {
      this._messageService.clear();
      this._messageService.add({
        severity: 'error',
        summary: 'Campos obrigatórios',
        detail: 'Verifique os campos nome, autor e link de acesso aos arquivos',
      });
    } else if (this.album.musics.length === 0) {
      this._messageService.clear();
      this._messageService.add({
        severity: 'error',
        summary: 'Campos obrigatórios',
        detail: 'Adicione ao menos 1 música',
      });
    } else {
      this._albumService.updateAlbum(this.id, this.album).subscribe(() => {
        window.scroll(0, 0);
        this._messageService.clear();
        this._messageService.add({
          severity: 'success',
          summary: 'Álbum atualizado com sucesso!',
          detail: 'Sendo redirecionado para a lista de álbuns em 5 segundos.',
        });
        setTimeout(() => {
          this._router.navigate(['/admin/player']);
        }, 5000);
      });
    }
  }

  setFileCoverUrl(info: any, index: any) {
    this.album.musics[index].cover = info.url;
  }

  setFileMusicUrl(info: any, index: any) {
    this.album.musics[index].title = info.name.split('.')[0];
    this.album.musics[index].file = `${info.name}|${info.url}`;
  }

  goToInside(route: string, id: string = '') {
    if (id != '') {
      this._router.navigate([`${route}/${id}`]);
    } else {
      this._router.navigate([route]);
    }
  }
}
