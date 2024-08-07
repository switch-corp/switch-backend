/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Logger } from "@nestjs/common";
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket, Server } from "socket.io";

@WebSocketGateway({ namespace: "app", cors: true })
export class AppGateway implements OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect {
    @WebSocketServer() io: Server;

    private readonly logger: Logger = new Logger("AppGateway");

    constructor (){
    }

    afterInit(server: Server) {
    	this.logger.log("Starting AppGateway socket");
    }

    handleConnection(socket: Socket, ...args: any[]) {
    	console.log(`Cliente ${socket.id} conectado`);
    }

    handleDisconnect(socket: Socket) {
    	console.log(`Cliente ${socket.id} desconectado`);
    }

    @SubscribeMessage("teste")
    handleTeste(socket: Socket, payload: any) {
    	console.log("entrou no teste");
    	console.log(payload);
    }
}