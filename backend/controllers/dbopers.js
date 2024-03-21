import Messages from "../models/msgmodel.js";

export const servertest = function (req, res) {
    res.send(["This express.js app is working"]);
};

export const getmessages = async function (req, res) {
    try {
        const messages = await Messages.findAll();
        const messagesJSON = JSON.stringify(messages);
        res.json(messagesJSON);
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const submitmessage = async function (req, res) {
    try {
        const { sdatetime, susername, smessage } = req.body;

        const newMessage = await Messages.create({
            datetime: sdatetime,
            username: susername,
            message: smessage
        });

        res.status(201).send("Added Successfully");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const deleteAllMessages = async function (req, res) {
    try {
        const password = req.query.key;
        const includeTestMSG = req.query.testmsg;
        if (password === "confirm") {
            const countdel = await Messages.truncate();
            if (includeTestMSG === "true") {
                Messages.create(
                    { datetime: '2023-01-01:00:00:00', username: 'sqlite', message: 'Hello World!' 
                });
                Messages.create(
                    { datetime: '2023-01-01:00:00:00', username: 'sqlite', message: 'Congratulations, the app runs properly!' }
                );
                const messages = await Messages.findAll();
                const messagesJSON = JSON.stringify(messages);
                res.status(201).json({ success: "tb_messages truncated successfully", testmsg: messagesJSON});
            } else {
                res.status(201).json({ success: "tb_messages truncated successfully", countdel: countdel });
            }
        } 
        else {
            res.status(403).json({ error: "Not authorized to delete messages table." });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

//Create and Read for now bc app doesn't need delete and update