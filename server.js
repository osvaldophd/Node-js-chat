const express = require('express');
	const path = require('path');
	const app= express();
	const server = require('http').createServer(app);
	const io = require('socket.io')(server);
	
	app.use(express.static(path.join(__dirname,'public')));
	app.set('views', path.join(__dirname, 'public'));
	app.engine('html', require('ejs').renderFile);
	app.set('view engine', 'html');
	
	app.use('/',(req,res)=>{
		res.render('index.html');
    });
	//configurar a conexaoo
	let messagens=[];
	io.on('connection', socket=>{
		console.log(`Sock conectado: ${socket.id}`);
		socket.emit('previousMessage',messagens);//envia as mensage passada para o utilizador que esta a conectar-se agora
		socket.on('sendeMessage',data=>{
			messagens.push(data);
			socket.broadcast.emit('receiveMessage', data);//envia para todas a abasa aberta
		});
		
    });
    //rodado na porta
	server.listen(3000);