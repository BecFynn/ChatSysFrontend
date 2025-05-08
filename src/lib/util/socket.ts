let socket: WebSocket | null = null;

export function getSocket(): WebSocket | null {
    if (typeof window !== "undefined" && socket === null) {
        socket = new WebSocket("ws://localhost:5217/ws");
    }
    return socket;
}
