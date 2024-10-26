import express from "express";
const app = express();

const PORT = 3000;

//application level middleware
app.use((req,res,next) => {
    console.log("First middleware started");
    const useAuthenticate = true;
    if(!useAuthenticate){
        return res.status(403).send('You are not allowed to make this request');
    }
    console.log("First middleware calling next");
    next();
});

app.use((req,res,next) => {
    console.log(`Request received on ${new Date().toLocaleDateString()}`);
    next();
});

app.use((req,res,next) => {
    console.log("ID check middleware");
    const idAvailable = true;
    if (!idAvailable){
        return res.status(400).send('Sorry, this user does not exist');
    };
    next();
})

app.get('/request', (req,res) =>{
    res.send('Welcome')
})

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});

//router level middleware
const router = express.Router();

router.use((req,res,next) =>{
    console.log(`Router-level middleware for /requests`);
    next();
});

router.get('/requests', (req,res) => {
    res.send("User request successfull");
});

app.use('/api', router);


