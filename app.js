require('dotenv').config();
const express = require('express');
const app = express();
const host = process.env.HOST ?? "localhost";
const port = process.env.PORT ?? 8000;
const routes = require('./routes');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

app.use(session({ 
	secret: 'secret',
	cookie:{ 
		maxAge: 1000*60*30
	},
	saveUninitialized:true,
	resave: false 
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", 'ejs');
app.set('views', './views');
app.use(express.static('./public'));
app.use(cookieParser());
app.use(flash());

app.use('/', routes);

app.listen(port, host, () => {
    console.log(`Server is listening on http://${host}:${port}`);
});

module.exports = app;