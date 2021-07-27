/**
 * Module dependencies.
 *  File name: tournaments.ts, 
    Author's: Ofovwe Ewere,Gagandeep Kaur,  Qiuqi Lu, Duy Hieu Nguyen, Farishta Sultani
    Web App name: The Favorite Tournament List App first release 
    Description: The database model for tournament bracket app
    Date: July 17, 2021
 */
    import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
    const Schema = mongoose.Schema; // Schema alias
    
    // create a model class
    const UserSchema = new Schema
    ({
      username: String,
      emailAddress: String,
      displayName: String,
      created:
      {
          type: Date,
          default: Date.now()
      },
      updated:
      {
          type: Date,
          default: Date.now()
      }
        
    },
    {
      collection: "users"
    });
    
    UserSchema.plugin(passportLocalMongoose);

const Model = mongoose.model("Contact", UserSchema as PassportLocalSchema);

declare global
{
    export type UserDocument = mongoose.Document &
    {
        _id: String,
        username: String,
        emailAddress: String,
        displayName: String
    }
}
export default Model;
    