/**
 * Module dependencies.
 *  File name: tournaments.ts, 
    Author's name: Ofovwe Ewere
    Student's id: 301188196
    Web App name: The tournament bracket app
    Date: June 25, 2021
 */
import mongoose from 'mongoose';
const Schema = mongoose.Schema; // Schema alias

// create a model class
const TournamentSchema = new Schema
({
    Name: String,
    StartDate: String
    
},
{
  collection: "tournaments"
});

const Model = mongoose.model('Tournament', TournamentSchema);
export default Model;
