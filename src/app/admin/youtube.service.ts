import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class YoutubeService {

  constructor(private http : HttpClient) { }


  /**
   * showYouTubeInstructions
   * Deploys a modal to show how to add a new YouTube
   * video.
   * 
   */
  
  showYouTubeInstructions (): void {

  }


  /**
   * checkYouTubeUrl
   * It returns the embed URL well-formed from the
   * YouTube video URL.
   * 
   * @param video {string} YouTube video URL
   */

  checkYouTubeUrl(video: string): string {

    const video_id = this.getYouTubeVideoUrlId(video);

    return 'https://youtube.com/embed/' + video_id;

  }


  /**
   * getYouTubeFrame
   * Sends a YouTube video URL to backend to get
   * the video frames.
   * 
   * By default, it tries to get the maxres frame version.
   * In case this version doesn't exist, it gets the hqdefault.
   * 
   * @param video {string} YouTube video URL
   */

  getYouTubeFrame (video: string): Observable<any> {

    const video_id = this.getYouTubeVideoUrlId(video);

    return Observable.create(observer => {
      this
        .http
        .get('/api/media/youtube/' + video_id)
        .subscribe((data: any) => {
          observer.next(data);
          observer.complete();
        });
    });

  }


  /**
   * getYouTubeVideoUrlId
   * Gets a YouTube video URL and returns the
   * YouTube video id.
   * 
   * @param video {string} Video YouTube URL
   */

  getYouTubeVideoUrlId (video: string): string {

    let videoSplit = video.split('v=');
    let video_id = null;

    if ( videoSplit.length > 1 ) {
      
      video_id = video.split('v=')[1];
      const ampersandPosition = video_id.indexOf('&');

      if ( ampersandPosition !== -1 )
        video_id = video_id.substring(0, ampersandPosition);
    }
    else {

      //
      // Share url: https://youtu.be/DW9zGp1IJbc
      //

      if ( video.indexOf('youtu.be') !== -1 ) {

        videoSplit = video.split('/');
        video_id = videoSplit[videoSplit.length - 1];
      }
    }

    //
    // Returning the id
    //

    return video_id;

  }


  /**
   * saveYouTubeVideo
   * Creates a new YouTube video in database
   * 
   * @param video {Obj} Video obj with all the information
   */

  saveYouTubeVideo (video: any): Observable<any> {

    video.video_id = this.getYouTubeVideoUrlId(video.url);

    return Observable.create((observer: any) => {
      this
        .http
        .post('/api/media/video', {
          video: video
        })
        .subscribe((data: any) => {
          observer.next(data);
          observer.complete();
        });
    });

  }

}
