
const express = require('express');
const path = require('path')
const cors = require('cors')
// const fetch = require('node-fetch')

const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname,'views')))
app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname,'views','index.html'))
})


app.listen(3003, () => {
    console.log('main server service ready!!!');
});





