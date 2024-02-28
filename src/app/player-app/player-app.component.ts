import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Music } from '../models/music';
import { AlbumService } from '../services/album.service';
import { Album } from '../models/album';

@Component({
  selector: 'app-player-app',
  templateUrl: './player-app.component.html',
  styleUrls: ['./player-app.component.css'],
  providers: [AlbumService],
})
export class PlayerAppComponent implements OnInit {
  @ViewChild('audioPlayer')
  audioPlayerRef!: ElementRef;
  music: Music;
  albums: any[];
  currentAlbum: Album;
  index: any;

  constructor(private _albumService: AlbumService) {
    this.music = {
      title: '',
      artist: '',
      cover: '',
      file: '',
    };
    this.albums = [];
    this.index = 0;
    this.currentAlbum = {
      name: '',
      owner: '',
      musics: [],
      link: '',
    };
  }

  ngOnInit(): void {
    this.getAlbums();
  }

  getAlbums() {
    this._albumService.getAlbums().subscribe((response: any) => {
      this.albums = response.data;
      // TODO: Transformar em uma tela que lista todos os álbuns e se defini o currentAlbum
      this.currentAlbum = this.albums[0].album;
      this.start();
    });
  }

  start() {
    this.music = this.currentAlbum.musics[this.index];
  }

  next() {
    this.index++;

    if (this.index == this.currentAlbum.musics.length) this.restart();

    this.start();
    this.play();
  }

  play() {
    setTimeout(() => {
      var playPromise = this.audioPlayerRef.nativeElement.play();
      if (playPromise !== undefined) {
        playPromise.then((response: any) => {}).catch((error: any) => {});
      }
    }, 2000);
  }

  restart() {
    this.index = 0;
    this.start();
  }
}
