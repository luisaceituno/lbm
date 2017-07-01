import { Component, OnInit } from '@angular/core';
import { ModalController, Platform, NavParams, ViewController, NavController } from 'ionic-angular';
import {PlayerPage} from "../player/player";
import {SongMetadata} from "../../app/types/song-metadata.type";
import {SoundcloudService} from "../../app/services/soundcloud.service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  private tracks : SongMetadata[] = [];
  private currentTrack : SongMetadata;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, private scService : SoundcloudService) {

  }

  ngOnInit() {
    this.scService.search('queen').forEach(x => this.tracks = x);
  }

  openModal() {
    let modal = this.modalCtrl.create(PlayerPage, this.currentTrack);
    modal.present();
  }

  playSong(track: SongMetadata) {

  }

}
