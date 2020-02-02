import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {Observable} from "rxjs/Observable";
import {Socket} from 'ng-socket-io';

@IonicPage()
@Component({
  selector: 'page-chat-room',
  templateUrl: 'chat-room.html',
})
export class ChatRoomPage {
  messages = [];
  nickname = '';
  message = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private socket: Socket, private toastCtrl: ToastController) {

    this.nickname = this.navParams.get('nickname');

    this.getMessages().subscribe(message => {
      console.log("messages:"+this.messages);
      this.messages.push(message);
    });

    this.getUsers().subscribe(data => {
      let user = data['user'];
      if (data['event'] === 'left') {
        this.showToast('Un utilisateur a quitté: ' + user)
      } else {
        this.showToast('Un utilisateur a rejoint: ' + user)
      }
    });
  }

  getMessages(){
    let observable = new Observable(observer => {
      this.socket.on('message', (data) => {
        observer.next(data)
      });

    });
    return observable;
  }

  getUsers(){
     let  observable = new Observable(observer => {
      this.socket.on('users-changed', (data) => {
        observer.next(data)
      });

     });
    return observable;
  }

  sendMessage() {

   // console.log(this.message)
    this.socket.emit('add-message', {text: this.message});
    this.message = '';

  }



  ionViewWillLeave() {
    this.socket.disconnect();
  }

  showToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}
