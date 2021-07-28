/**
 * Module dependencies.
 *  File name: app.ts
    Author's: Ofovwe Ewere,Gagandeep Kaur,  Qiuqi Lu, Duy Hieu Nguyen, Farishta Sultani
    Web App name: The tournament bracket List App first release configuration app.ts file
    Date: July 17, 2021
 */
// modules for node and express
import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

//modules for authentication
import session from 'express-session';
import passport from 'passport';
import passportLocal from 'passport-local';

//modules for cors
import cors from 'cors';

//authentication objects
let localStrategy = passportLocal.Strategy; //alias
import User from '../Models/user';

//module for authentication messaging and error management
import flash from 'connect-flash';


// import "mongoose" - required for DB Access
import mongoose, { mongo } from 'mongoose';

// URI
import * as DBConfig from './db';

mongoose.connect(process.env.URI || DBConfig.LocalURI, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection; // alias for the mongoose connection
db.on("error", function()
{
  console.error("connection error");
});

db.once("open", function()
{
  console.log(`Connected to MongoDB at: ${DBConfig.HostName}`);
});

// define routers
import index from '../Routes/index'; // top level routes
import tournaments from '../Routes/tournaments'; // routes for tournaments

// Express Web App Configuration
const app = express();
export default app; // exports app as the default Object for this module

// view engine setup
app.set('views', path.join(__dirname, '../Views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /client
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../Client')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

// add support for cors
app.use(cors());

// setup express session
app.use(session({
  secret: DBConfig.Secret,
  saveUninitialized: false,
  resave: false
}));

// initialize flash
app.use(flash());

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// implement an Auth strategy
passport.use(User.createStrategy());

//serialize and deserialize the user data
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// route redirects
app.use('/', index);
app.use('/tournaments',tournaments);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err:createError.HttpError, req:express.Request, res:express.Response, next: express.NextFunction) 
{
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//module.exports = app;
