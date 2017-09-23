const prefix = "-"
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const express = require('express');
const app = express();
var port = process.env.PORT || 5000;
app.listen(port);
var http = require("http");
setInterval(function() {
    http.get("http://midoxus-bot.herokuapp.com");
}, 300000); // every 5 minutes (300000)
//var data = fs.readFileSync('profiles.json');
//var profiles = JSON.parse(data);

//console.log(profiles);

var chatfilter = false

var swearwords = ['fuck', 'cunt', 'titties', 'nigger', 'cunts', 'fucks', 'bitch', 'bitches', 'fucking'];

client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setGame('-help');
  let channel = client.channels.find('id', 355375288760139778);
  channel.send("succesfully restarted");
});

client.on('voiceStateUpdate', function(oldMember, newMember ) {
  if (newMember.voiceChannelID == 348523194224869379) {
    if (oldMember.voiceChannelID != 348523194224869379) {
      newMember.send("Hey, I see you joined the music channel in Midoxus. but we are partnerd with a much larger server fully dedicated to music: join it here \n https://discord.gg/EmSQUHN ");
    };
  };
});


//leaving and adding members msg
client.on('guildMemberAdd', member => {
  let channel = member.guild.channels.find('name', 'general');
  channel.send(`Welcome to the server, ${member}`);
});
client.on('guildMemberRemove', member => {
  let channel = member.guild.channels.find('name', 'general');
  channel.send(`${member.user.username} just left the server, bye o/`);
});
// bot respons and console logging
client.on('message', message => {
  console.log(message.author.username + " '" + message.content + "' in Channel " + message.channel.name);
  if(message.content == '<@351687732881522699>'){ 
    message.channel.send(`hello, ${message.author}`);
  };
  /*if(message.content.toLowerCase() == "mk") {
    if(message.author.username !== "Midoxus-bot") {
      message.channel.send("mk");
    }; 
}; */
});

client.on('message', message => {
  //if(message.channel == 358324210122096640) {
  if(true == true) {
  	var chat = function(msg, respons) {
      if(message.content.toLowerCase() == msg) {
          message.channel.send(respons);
      };
    };
    chat("how are you?", `good and you ${message.author}`);
  };
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
        status = '**Midoxus** is **online**  -  ' + body.players.now + '/' + body.players.max;
        /*if(body.players.now) {
          status += '**' + body.players.now + '** people are playing!';
        } 
        else {
          status += '*Nobody is playing!*';
        } */
        
      }
      message.channel.send(status);
    });
  }
}); 

//swearword checker
client.on('message', message => {
  if (chatfilter == true){ 
    let words = message.content.split(" ");
    for(i = 0; i < words.length; i++) {
      words[i] = words[i].toLowerCase();
      for (j = 0; j < swearwords.length; j++) {
        if (words[i] == swearwords[j]) {
          message.delete();
          message.reply("no swearing please!");
        };
      };
    };
  };
});
// custom commands
client.on('message', message => {
  if (message.author.equals(client.user)) return;

  if (!message.content.startsWith(prefix)) return;
  
  var args = message.content.substring(prefix.length).split(" ");

  switch (args[0].toLowerCase()) {
    /*case "test2":
      let words = JSON.stringify("test");
      fs.writeFile('profiles.json', words);
      break; */
       /*case "setgame":
        if (message.member.id == 235450656335331328 || message.member.id == 235452157166485505) {
          client.user.setGame("test");
          console.log("game set to " + args[1]);
        }; 
        break;*/
    case "chatfilter": 
        if(message.member.hasPermission("MANAGE_MESSAGES") == true) {
          if (args[1] == "on") {
            chatfilter = true
            console.log("chatfilter is now on");
          };
          if (args[1] == "off") {
            chatfilter = false
            console.log("chatfilter is now off");
          };
        };
      break;

  };
   var Command = function(input,output){
    if (message.author.equals(client.user)) return;
    if (message.content.toLowerCase() === prefix + input) {
      message.channel.send(output); 
    };
  };
  
  Command("ping","pong");
  Command("ip","Server IP: 77.173.4.226");
  //Command('membercount', guild.membercount);
  Command("help", "**Commands for Midoxus-bot**\n \t -ip\n \t -serverstatus\n **Moderations** \n \t -chatfilter on/off \n**If you have any suggestion for new commands, leave them in <#341664767175294988>.**");
});

client.login('MzUxNjg3NzMyODgxNTIyNjk5.DJBLEw.gMOnJA2D5IR_4J-vzVlOQjWp4fA');
