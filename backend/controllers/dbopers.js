import Messages from "../models/msgmodel.js";

export const servertest = function(req, res){
    res.send(["This express.js app is working"]);
};

export const getmessages = async function(req, res){
    try{
        const messages = await Messages.findAll();
        const messagesJSON = JSON.stringify(messages);
        res.json(messagesJSON);
    }
    catch (error){
        res.status(500).json({error: "Internal Server Error"});
    }
};

export const submitmessage = async function(req, res){
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
};

//Create and Read for now bc app doesn't need delete and update