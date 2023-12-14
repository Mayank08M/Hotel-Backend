const express = require('express');
const app = express();
const cors = require('cors');
const mysql=require('mysql');
app.use(cors())
const connection = mysql.createConnection({
    host: "15.206.6.55",
    user:"hourlyrooms",
    password:"Hourlyrooms@1584",
    database:"mayankproject"
});
connection.connect((err)=>{
    if(err){
        throw err;
    }
    console.log('database is connected ')
})


app.get('/', (req, res) => {
    res.send('Hello')
})
app.get('/hotels', (req, res) => {
    res.send('hii bro what are you doing')
})

app.listen(8000, () => {
    console.log('server listening on port 8000')
})