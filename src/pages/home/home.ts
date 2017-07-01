import { Component, OnInit } from '@angular/core';
import { ModalController, Platform, NavParams, ViewController, NavController } from 'ionic-angular';
import {PlayerPage} from "../player/player";
import {SongMetadata} from "../../app/types/song-metadata.type";
import {SoundcloudService} from "../../app/services/soundcloud.service";
import {noUndefined} from "@angular/compiler/src/util";
import ApplicationProperties from "../../app/app.properties";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  private tracks : SongMetadata[] = [];
  private currentTrack : SongMetadata;
  private currentIndex : number = 0;
  private audio : any;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, private scService : SoundcloudService) {

  }

  ngOnInit() {
    //this.scService.search('queen').forEach(x => this.tracks = x);
  }

  openModal() {
    let modal = this.modalCtrl.create(PlayerPage, this.currentTrack);
    modal.present();
  }

  playTrack(track: SongMetadata, index : number) {
    this.currentTrack = track;
    this.currentIndex = index;
    if(this.audio)
      this.audio.pause();
    this.audio = new Audio(ApplicationProperties.streamUrl(track.id.toString()));
    this.audio.onended =  () => {this.playTrack(this.tracks[this.currentIndex + 1], this.currentIndex + 1)};
    this.audio.play();
  }

  pauseTrack() {
    if(this.audio)
      this.audio.pause();
  }

  resumeTrack() {
    if(this.audio)
      this.audio.play();
  }

  searchTracks(event : any) {
    let val = event.target.value;
    if (val && val.trim() != '') {
      this.scService.search(val).forEach(x => {console.log(x); this.tracks = x;});
    }
  }

}
