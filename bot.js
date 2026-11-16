const { Client, GatewayIntentBits } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');
const http = require('http');

// Render gibi bulut servislerinin botu uyutmaması için basit bir web sunucusu
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('MUFIX Bot 7/24 Aktif!\n');
});
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`[WEB] Sunucu ${PORT} portunda çalışıyor.`);
});

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates
  ]
});

const TOKEN = 'MTU3MTY1OTUzMjM5MDYzNzY3OQ.Gy-SV0.XCCYJpY4VdR2Q9K1Wrbhb3bfEkk_8iXZT0h2Is';
const SES_KANALI_ID = '1571672478403526716';

function seseBaglan() {
  const channel = client.channels.cache.get(SES_KANALI_ID);
  if (!channel) {
    console.log('[MUFIX] Ses kanalı bulunamadı!');
    return;
  }

  joinVoiceChannel({
    channelId: channel.id,
    guildId: channel.guild.id,
    adapterCreator: channel.guild.voiceAdapterCreator,
    selfDeaf: true,
    selfMute: false
  });
  console.log('[MUFIX] Ses kanalına başarıyla bağlandı!');
}

client.once('clientReady', () => {
  console.log(`[MUFIX] Bot giriş yaptı: ${client.user.tag}`);
  seseBaglan();
  setInterval(seseBaglan, 30000);
});

client.login(TOKEN);