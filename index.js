import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import {Pool} from 'pg';
import cors from "cors";


const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'b task',
    password: '12345',
    port: 5432,
});

const app=express();
const port=3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));


app.get("/",async(req,res)=>{
    
try{
    
    const result=await pool.query('SELECT * FROM notes ORDER BY noteid DESC');
    
    res.send(result.rows);
    

} catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
}
});

app.post("/",async(req,res)=>{
    try{
        const content = req.body.content;
        const title = req.body.title;
       
        const result = await pool.query('INSERT INTO notes (content, title) VALUES ($1, $2) RETURNING *', [content, title]);
        res.send(result.rows[0]);
    }catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

app.patch("/:id", async(req,res)=>{
    try{
        const id = req.params.id;
        const content = req.body.content;
        const title = req.body.title;

        const result = await pool.query('UPDATE notes SET content = ($1), title = ($2) WHERE noteid = ($3) RETURNING *',[content, title, id]);
        res.send(result.rows[0]);

    }catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

app.delete("/:id",async(req,res)=>{
    try{
        const id = req.params.id;
        await pool.query('DELETE FROM notes WHERE noteid=$1',[id]);
        res.sendStatus(200);
    }catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});
app.listen(port,()=>{console.log(`server is listening in server ${port}`)});