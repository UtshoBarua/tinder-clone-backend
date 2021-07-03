import express from 'express';
import mongoose from 'mongoose';
import Cors from 'cors';
import Cards from "./dbCards.js";

//App Confing 
const app = express();
const port = process.env.PORT || 8001;
const connection_url = 'mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dikx6.mongodb.net/tinderdb?retryWrites=true&w=majority';

//Middlewars
app.use(express.json());
app.use(Cors());

// DB config
mongoose.connect(connection_url,{
    useNewUrlParser : true,
    useCreateIndex : true,
    useUnifiedTopology : true,
})

//API Endpoints
app.get("/",(req, res)=> res.status(200).send("wating for the double screen this is the long way to go with the doubler screen "));

app.post ('/tinder/cards', (req, res)=>{
    const dbCard = req.body;
    Cards.create(dbCard, (err, data)=>{
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(201).send(data);
        }
    })
});
app.get('/tinder/cards',(req,res)=>{
    Cards.find((err,data)=>{
        if(err){
            res.status(500).send(err);
        }
        else{
            res.status(200).send(data);
        }
    })
})



//Listener
app.listen(port, ()=> console.log(`listining on localhost: ${port}`));