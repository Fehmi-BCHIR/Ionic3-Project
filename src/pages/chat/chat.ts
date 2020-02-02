import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import { ChatRoomPage} from "../chat-room/chat-room";
import {Socket} from 'ng-socket-io';



@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
nickname = '';

  constructor(public nav: NavController, public navParams: NavParams, private socket:Socket) {
  }
  joinChat(){
console.log("ok");
    this.socket.connect();
    this.socket.emit('set-nickname',this.nickname);
    this.nav.push('ChatRoomPage' ,{nickname: this.nickname})
  }

}
