import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from 'src/app/models/User';
import { Kit } from 'src/app/models/kit';
import { KitService } from 'src/app/services/kit.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-space-joy',
  templateUrl: './space-joy.component.html',
  styleUrls: ['./space-joy.component.css'],
  providers: [UserService, KitService],
})
export class SpaceJoyComponent implements OnInit {
  currentContent: any;
  contentsKit: any;
  flagContentView: boolean;
  user: User;
  urlAdmin: String;
  kits: Kit[];

  constructor(
    private _userService: UserService,
    private _kitService: KitService,
    private _spinner: NgxSpinnerService
  ) {
    this.currentContent = {};
    this.flagContentView = false;
    this.contentsKit = {
      '2022': {},
      '2023': {
        pdf: 'https://www.ocentroespirita.com/alegriacrista/download/kit-treinamento/2023/KIT%20DE%20TREINAMENTO%20ALEGRIA%20CRIST%C3%83%20CONCAFRAS%202023.pdf',
        word: 'https://www.ocentroespirita.com/alegriacrista/download/kit-treinamento/2023/KIT%20DE%20TREINAMENTO%20ALEGRIA%20CRIST%C3%83%20CONCAFRAS%202023.docx',
        audios:
          'https://www.ocentroespirita.com/alegriacrista/download/kit-treinamento/2023/audios.zip',
      },
    };
    this.user = new User(
      '',
      '',
      new Date(),
      '',
      '',
      '',
      '',
      '',
      ['ALEGRIA_USER'],
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      []
    );
    this.urlAdmin = '';
    this.kits = [];
  }

  ngOnInit(): void {
    this._spinner.show();
    this.getUserAndSetIdentity();
  }

  getUserAndSetIdentity() {
    this._userService.getUser().subscribe({
      next: (response: any) => {
        let data = response.body.data;
        let identity = this._userService.getIdentity();
        this.user = data;
        identity.roles = this.user.roles;
        localStorage.setItem('identity', JSON.stringify(identity));
        this.getKits();
      },
      error: (error: any) => {
        console.log(`[ERROR] ${error}`);
      },
    });
  }

  getKits() {
    this._kitService.getKits().subscribe((response: any) => {
      response.data.forEach((responseData: any) => {
        this.kits.push(responseData.kit);
      });
      this._spinner.hide();
    });
  }

  chooseKit(year: string) {
    if (this.flagContentView) {
      this.flagContentView = false;
      this.currentContent = {};
    } else {
      this.flagContentView = true;
      this.currentContent = this.contentsKit[year];
    }
  }

  goTo(url: any) {
    window.location = url;
  }
}
