const prefix = "-"
const Discord = require('discord.js');
const client = new Discord.Client();

  client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setGame('Work in Progress')
  });

// -serverstatus command
var request = require('request');
var mcCommand = '-serverstatus'; // Command for triggering
var mcIP = '77.173.4.226'; // Your MC server IP
  
client.on('message', message => {
  if (message.content === mcCommand) {
    var url = 'http://mcapi.us/server/status?ip=' + mcIP;;
    request(url, function(err, response, body) {
      if(err) {
         console.log(err);
        return message.reply('Error getting Minecraft server status...');
      }
      body = JSON.parse(body);
      var status = '**Midoxus** is currently offline';
      if(body.online) {
        status = '**Midoxus** is **online**  -  ';
        if(body.players.now) {
          status += '**' + body.players.now + '** people are playing!';
        } 
        else {
          status += '*Nobody is playing!*';
        }
      }
      message.channel.send(status);
    });
  }
});
// custom commands
client.on('message', message => {
  if (message.author.equals(client.user)) return;

  if (!message.content.startsWith(prefix)) return;
  
  var args = message.content.substring(prefix.length).split(" ");

  switch (args[0].toLowerCase()) {
    case "coming soon":
      break;
    
  }
   var Command = function(input,output){
    if (message.author.equals(client.user)) return;
    if (message.content.toLowerCase() === prefix + input) {
      message.channel.send(output); 
    };
  }
  
  Command("ping","pong")
  Command("ip","Server IP: 77.173.4.226")
  //Command("serverstatus","http://minecraft-mp.com/banner-170399.png")
  });
client.login('MzUxNjg3NzMyODgxNTIyNjk5.DIr8IQ.b8ZOdxokRlBj8BOyvXvmkadJgMQ');