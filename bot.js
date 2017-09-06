const prefix = "-"
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const express = require('express');
const app = express();
app.set('port', (process.env.PORT || 5000));
//var data = fs.readFileSync('profiles.json');
//var profiles = JSON.parse(data);

//console.log(profiles);

  client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setGame('Work in Progress');
  });

//leaving and adding members msg
client.on('guildMemberAdd', member => {
  let channel = member.guild.channels.find('name', 'general');
  channel.send(`Welcome to the server, ${member}`);
});
client.on('guildMemberRemove', member => {
  let channel = member.guild.channels.find('name', 'general')
  channel.send(`${member} just left the server, bye o/`)
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
    /*case "test2":
      let words = JSON.stringify("test");
      fs.writeFile('profiles.json', words);
      break; */
  };
   var Command = function(input,output){
    if (message.author.equals(client.user)) return;
    if (message.content.toLowerCase() === prefix + input) {
      message.channel.send(output); 
    };
  }
  
  Command("ping","pong")
  Command("ip","Server IP: 77.173.4.226")
  //Command("serverstatus","http://minecraft-mp.com/banner-170399.png")
  //Command("test", profiles.test)
  //Command("test3", profiles.hoi)
  });
client.login('MzUxNjg3NzMyODgxNTIyNjk5.DJBLEw.gMOnJA2D5IR_4J-vzVlOQjWp4fA');;
