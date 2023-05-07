const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))};
const fetch = require('node-fetch');
const WebSocket  = require('ws');
let token="token";
function recursive(){
    let socket = new WebSocket("wss://gateway.discord.gg/?v=6&encording=json");
    socket.onready = function(event){
        console.log("connected")
    }
    socket.onclose = async function(event){
        recursive()
    }
    socket.onmessage = async function(event) {
        let ejson = JSON.parse(event.data);
        let payload={
          "op":2,
          "d": {
              "token": token,
              "properties": {
                  "os": "TklHR0VSU1NTUyBJIEhBVEUgTklHR0VSUyBJIEhBVEUgVEhFTSBTTyBNVUNI",
              },
          }
      };
        async function hb(socket, interval){
            while(true){
                let hbpayload={
                    'op': 1,
                    'd': 'null'
                };
                socket.send(JSON.stringify(hbpayload));
                await sleep(interval);
            };
        };
        if(ejson["d"]!=null&&ejson["d"].hasOwnProperty("heartbeat_interval")){
            var interval = JSON.parse(event.data)['d']['heartbeat_interval'];
            hb(socket, interval);
            socket.send(JSON.stringify(payload));
        };
        if (ejson["t"]=="READY")
          socket.send(JSON.stringify({"op":3,"d":{"status":"online","activities":[{
              "name": "using vany's ns",
              "type": 0}],
            "since":1,"afk":false}}))
        if (ejson["t"]=="MESSAGE_CREATE"&&ejson["d"]["content"].match(/(?<=\.gift\/)[a-zA-Z0-9]*/)) {
            redeem(ejson["d"]["content"].match(/(?<=\.gift\/)[a-zA-Z0-9]*/))
        }
    }
    }
    recursive()
    async function redeem(x) {
        fetch("https://discord.com/api/v9/entitlements/gift-codes/"+redeem, {
            "headers": {
                "accept": "*/*",
                "accept-language": "en-US",
                "authorization": token,
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "x-debug-options": "bugReporterEnabled",
                "x-discord-locale": "en-GB",
                "x-super-properties": "eyJvcyI6IldpbmRvd3MiLCJicm93c2VyIjoiRGlzY29yZCBDbGllbnQiLCJyZWxlYXNlX2NoYW5uZWwiOiJzdGFibGUiLCJjbGllbnRfdmVyc2lvbiI6IjEuMC45MDA0Iiwib3NfdmVyc2lvbiI6IjEwLjAuMjIwMDAiLCJvc19hcmNoIjoieDY0Iiwic3lzdGVtX2xvY2FsZSI6ImVuLVVTIiwiY2xpZW50X2J1aWxkX251bWJlciI6MTIzODg3LCJjbGllbnRfZXZlbnRfc291cmNlIjpudWxsfQ=="
            },
            "referrer": "https://discord.com/channels/@me/945090148322914424",
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": null,
            "method": "GET",
            "mode": "cors",
            "credentials": "include"
            }).then(x=>{return x.json()}).then(x=>console.log(x))
}

