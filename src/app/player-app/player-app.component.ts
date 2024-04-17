import { Component, OnInit } from '@angular/core';
import { Music } from '../models/music';
import { AlbumService } from '../services/album.service';
import { Album } from '../models/album';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-player-app',
  templateUrl: './player-app.component.html',
  styleUrls: ['./player-app.component.css'],
  providers: [AlbumService, NgxSpinnerService],
})
export class PlayerAppComponent implements OnInit {
  music: Music;
  albums: any[];
  currentAlbum: Album;
  index: any;
  playOrPauseIcon: string;
  audioElement: HTMLAudioElement;
  volumeIcon: string;
  duration: any;
  durationPattern: any;
  currentTime: any;
  currentTimePattern: any;
  isPlaying: boolean;
  isVisible: boolean;

  constructor(
    private _albumService: AlbumService,
    private _spinner: NgxSpinnerService,
    private _router: Router,
  ) {
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
    this.playOrPauseIcon = 'play_arrow';
    this.audioElement = new Audio();
    this.volumeIcon = 'volume_up';
    this.duration = 0;
    this.currentTime = 0;
    this.currentTimePattern = '00:00';
    this.isPlaying = false;
    this.isVisible = true;
  }

  ngOnInit(): void {
    this._spinner.show();
    this.getAlbums();
  }

  choosenAlbum(index: any) {
    this.currentAlbum = this.albums[index].album;
    this.isVisible = false;
    this.start();
  }

  getAlbums() {
    this._albumService.getAlbums().subscribe((response: any) => {
      this.albums = response.data;
      this._spinner.hide();
    });
  }

  start() {
    this.update();
    this.initEvents();
  }

  initEvents() {
    this.audioElement.addEventListener('timeupdate', () => {
      this.currentTimePattern = this.secondsToMinutes(
        this.audioElement.currentTime,
      );
      this.currentTime = this.audioElement.currentTime;
    });
    this.audioElement.addEventListener('loadeddata', () => {
      this.duration = this.audioElement.duration;
      this.durationPattern = this.secondsToMinutes(this.duration);
    });
    this.audioElement.addEventListener('ended', () => {
      this.next();
    });
  }

  play() {
    let playPromise = this.audioElement.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          this.isPlaying = true;
          this.playOrPauseIcon = 'pause';
        })
        .catch(() => {});
    }
  }

  next() {
    this.index++;

    if (this.index == this.currentAlbum.musics.length) this.restart();

    this.update();
    this.play();
  }

  previous() {
    this.index--;

    if (this.index < 0) {
      this.index = this.currentAlbum.musics.length - 1;
    }

    this.update();
    this.play();
  }

  update() {
    this.currentTime = 0;
    this.music = this.currentAlbum.musics[this.index];
    this.audioElement.src = this.music.file;
  }

  restart() {
    this.index = 0;
    this.update();
  }

  timeUpdate() {}

  setVolume(event: any) {
    let value = event.target.value;
    this.audioElement.volume = value / 100;
  }

  setCurrentTime(event: any) {
    this.audioElement.currentTime = event.target.value;
  }

  togglePlay() {
    if (!this.isPlaying) {
      this.play();
    } else {
      this.isPlaying = false;
      this.playOrPauseIcon = 'play_arrow';
      this.audioElement.pause();
    }
  }

  toggleMute() {
    if (this.audioElement.muted) {
      this.audioElement.muted = false;
      this.volumeIcon = 'volume_up';
    } else {
      this.audioElement.muted = true;
      this.volumeIcon = 'volume_off';
    }
  }

  secondsToMinutes(time: any) {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    return `${('0' + minutes).slice(-2)}:${('0' + seconds).slice(-2)}`;
  }

  goTo(route: string) {
    this._router.navigate([route]);
  }

  download() {
    // this.audioElement.pa
  }
}
