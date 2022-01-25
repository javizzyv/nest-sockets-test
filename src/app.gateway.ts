import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  private logger: Logger = new Logger('AppGateway');

  handleConnection(client: any, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }
  
  afterInit(server: Server) {
    this.logger.log('Initialized!');
  }
  
  @SubscribeMessage('message')
  handleMessage(client: Socket, text: string): WsResponse<string> {
    // with void: client.emit('msgToClient', text)
    // with server: @WebSocketServer() wss: Server; client.emit('msgToClient', text)
    return {event: 'msgToClient', data: text};
  }
}
