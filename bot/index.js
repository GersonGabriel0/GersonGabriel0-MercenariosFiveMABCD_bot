const env = require('../.env');
const { Telegraf, Markup } = require('telegraf');
const recomendacao = require('./recomendacao');
const filmes = require('./data/jogos');
const series = require('./data/musicas');

const bot = new Telegraf(env.token);


bot.start(async ctx => {
    const from = ctx.update.message.from;
    if(from.id === 5282100976 || from.id === 1198189143){
        await ctx.replyWithHTML(`
            <b>Olá ${from.first_name}, tudo bem?</b>
            \nEsse Bot foi Desenvolvido Pelo Gerson Gabriel 6 Fase Engenharia de Software!
            \nCaso queira saber onde está localizado da melhor universidade, é só digitar <b>Universidade</b>
            \nPosso te indicar alguns jogos é só digitar <b>Jogos</b>
            \nPosso te indicar também algumas musicas para ouvir jogando é só digitar <b>Musicas</b>
            \nMe envie um <b>Emoji</b> da sua comida que irei le enviar uma foto dela!!
        `);
        await ctx.reply(`Escolha uma opção:`, Markup.keyboard([
            ['Jogos', 'Musicas'],
            ['Universidade'],
            ['🍉','🍍', '🥥', '🍞']
        ]).resize());

    }else {
        await ctx.reply(`Desculpe, Mas voçê não e forte o suficiente!`);
        bot.stop("Não autorizado");
    }
});

bot.on('location', ctx => {
    const loc = ctx.update.message.location;
    ctx.reply(`Voce esta em: 
        Latitude: ${loc.latitude},
        Longitude: ${loc.longitude}
    `);
});

bot.on('contact', ctx => {
    const contato = ctx.update.message.contact;
    ctx.reply(`Chama o ${contato.first_name}, Número:(${contato.phone_number}) para falar comigo!`);
});

bot.on('voice', ctx => {
    const voz = ctx.update.message.voice;
    ctx.reply(`Audio recebido, ele tem ${voz.duration} segundos`);
});

bot.on('photo', ctx => {
    const foto = ctx.update.message.photo;
    foto.forEach((photo, i) => {
        ctx.reply(`A ${i}a foto tem resolucao de ${photo.width}x${photo.height}`);
    });
});

bot.on('sticker', ctx => {
    const sticker = ctx.update.message.sticker;
    ctx.reply(`Estou vendo que voce enviou o sticker ${sticker.emoji} do conjunto ${sticker.set_name}`);
})

bot.hears(['Jogos', 'jogos'], ctx => {
    let rec = "";
    rec = recomendacao(jogos[Math.floor(Math.random() * jogos.length)]);
    ctx.replyWithHTML(rec);
});

bot.hears(['Musicas', 'musicas'], ctx => {
    let rec = "";
    rec = recomendacao(musicas[Math.floor(Math.random() * musicas.length)]);
    ctx.replyWithHTML(rec);
});

bot.hears(['🍉','🍍', '🥥', '🍞'], ctx => {
    if(ctx.match == '🍉'){
        ctx.reply('Aqui está uma foto de uma melancia', {reply_to_message_id: ctx.message.message_id});
        ctx.replyWithPhoto({url: 'https://agroinsight.com.br/wp-content/uploads/2021/04/nutricao-e-fertirrigacao-da-melancia-blog.jpg'});
    }else if(ctx.match == '🍍'){
        ctx.reply('Aqui está uma foto de um abacaxi', {reply_to_message_id: ctx.message.message_id});
        ctx.replyWithPhoto({url: 'https://nutritotal.com.br/publico-geral/wp-content/uploads/sites/2/2021/05/beneficios-do-abacaxi-2.jpg'});
    }else if(ctx.match == '🥥'){
        ctx.reply('Aqui está uma foto de um coco', {reply_to_message_id: ctx.message.message_id});
        ctx.replyWithPhoto({url: 'https://vitat.com.br/wp-content/uploads/2020/03/coco-min.jpg'});
    }else if(ctx.match == '🍞'){
        ctx.reply('Aqui está uma foto de um pão', {reply_to_message_id: ctx.message.message_id});
        ctx.replyWithPhoto({url: 'http://conteudo.imguol.com.br/c/entretenimento/45/2020/10/19/pao-frances---dona-deola-1603113166267_v2_1920x1920.jpg'});
    }
});

bot.hears(['Universidade', 'unc'], ctx => {
    ctx.replyWithLocation(-26.132909784616686, -49.80893965971764);
});

bot.startPolling();