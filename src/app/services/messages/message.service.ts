import { Injectable } from '@angular/core';

interface Message {
  id?: string;
  type?: string;
  content: string;
}

@Injectable({
  providedIn: 'root'
})

export class MessageService {
  
  messages: Array<Message> = [];
  messageNumber: number = 0;

  constructor() { }

  add(message: Message): void {
    const newMessage = Object.assign(message, { id: this.messageNumber++ })
    this.messages.unshift(newMessage);
  }

  remove(id) {
    this.messages = this.messages.filter(message => message.id !== id);
  }

}

