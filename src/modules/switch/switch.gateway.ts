/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Logger } from "@nestjs/common";
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket, Server } from "socket.io";

@Injectable()
@WebSocketGateway({ namespace: "switch", cors: true })
export class SwitchGateway implements OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect {
    @WebSocketServer() io: Server;

    private readonly logger: Logger = new Logger(SwitchGateway.name);

    afterInit(server: Server) {
    	this.logger.log(`Starting ${SwitchGateway.name} socket`);
    }

    handleConnection(socket: Socket, ...args: any[]) {
    	console.log(`Cliente ${socket.id} conectado`);
    }

    handleDisconnect(socket: Socket) {
    	console.log(`Cliente ${socket.id} desconectado`);
    }   

    @SubscribeMessage("switch:change_state")
    changeState(socket: Socket, payload: any){
    	socket.emit(payload.id, !payload.status);
    }
}