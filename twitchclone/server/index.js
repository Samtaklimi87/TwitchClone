const PORT = 8000;
const express = require('express');
const app = express();
const cors = require('cors');
const bcrypt = require('bcrypt');
const {v1:uuidv1} = require('uuid');
const { connect } = require('getstream');
app.use(cors());
app.use(express.json());


const API_KEY = 'smvpecsv9z2p';
const API_SECRET =  '4xbdck5p3497scrumpxrsewgjwmucagxazhkt343gfrrahyj8fbr3vtjawt44e2k';
const API_ID = '1158070';


//sign in
app.post('/signup' , async (req,res)=> {
    try{
        const {username, password}= req.body;
        const userId = uuidv1();
        const hashedPassword = await bcrypt.hash(password, 10);
        const client = connect(API_KEY , API_SECRET , API_ID);

        const token = client.createUserToken(userId);

        res.status(200).json({username , password , userId , hashedPassword , token})


        console.log(username, password);
        console.log(hashedPassword);
        // console.log(req);

    } catch (error) {
        console.log(error);
        res.status(500).json({messege:error});

    }
})

app.listen(PORT, ()=> console.log('serever running on port ' + PORT));