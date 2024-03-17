const express = require('express');
const app = express();
const cors = require('cors');
const {Sequelize, DataTypes} = require('sequelize');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());

const PORT = 5000;
const listeningOnDBConnect = 1;

// const sequelize = new Sequelize(
//     'DB_NRProj',
//     'root',
//     '',
//     {
//         host: 'localhost',
//         dialect: 'mysql'
//     }
// );

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'sqlite/appdatabase.db'
});

const Messages = sequelize.define('Messages', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    datetime: {
      type: DataTypes.STRING,
      allowNull: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: true
    },
    message: {
      type: DataTypes.STRING,
      allowNull: true,
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci'
    }
  }, {
    tableName: 'tb_messages',
    timestamps: false
  });
  
//test endpoint, type localhost:5000 to check if server is running
app.get('/', function(req, res){
    res.send(["This express.js app is working", "Project Dir: E:/webapp/nr-proj1/"]);
});

app.get('/getmessages', async function(req, res){
    try{
        const messages = await Messages.findAll();
        const messagesJSON = JSON.stringify(messages);
        res.json(messagesJSON);
    }
    catch (error){
        res.status(500).json({error: "Internal Server Error"});
    }
});

app.post('/submitmessage', async function(req, res){
    try{
        const {sdatetime, susername, smessage} = req.body;

        const newMessage = await Messages.create({
            datetime: sdatetime,
            username: susername,
            message: smessage
        });

        res.status(201).send("Added Successfully");
    } catch(error) {
        console.error(error);
        res.status(500).json({error: "Internal Server Error"});
    }
});

async function Connect(){
    try {
        await sequelize.sync();
        console.log('Connection is successfully established.');
            app.listen(PORT, function(){
                console.log(`Server is running on port ${PORT}.`);
            });
    } catch(error) {
        console.error('Connection failed.\nERROR/S OCCURRED\n', error);
    }
}

Connect();