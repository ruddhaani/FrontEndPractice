import { Component, ElementRef, Input, SimpleChange, SimpleChanges, viewChild, ViewChild } from '@angular/core';
import { VideoDetails } from '../../modules/VideoDetails';

@Component({
  selector: 'app-video-player',
  imports: [],
  templateUrl: './video-player.component.html',
  styleUrl: './video-player.component.css'
})
export class VideoPlayerComponent {
  @Input() videoDetails : VideoDetails = new VideoDetails("" , "" , "" , "");
  @ViewChild("video1") videoElementRef !: ElementRef;

  ngOnChanges(changes : SimpleChanges){
    if(changes["videoDetails"]){
      this.videoElementRef?.nativeElement.load();
    }
  }
}
