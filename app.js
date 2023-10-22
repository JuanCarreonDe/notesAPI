import express from "express";
import {
    getNotesForUser,
    createNote,
    updateNote,
    deleteNote
} from "./database.js"
import cors from "cors";

const corsOption = {
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
}

const app = express();
app.use(express.json())
app.use(cors(corsOption))


app.listen(8080, ()=> console.log("server run on port 8080"))

app.get("/notes/:idUser", async(req, res) =>{
    const idUser = req.params.idUser
    const notes = await getNotesForUser(idUser);
    res.status(200).send(notes)
})

app.put("/notes/:idNote", async(req, res) =>{
    const {idUser, title, description, isComplete} = req.body;
    const idNote = req.params.idNote;
    await updateNote(idNote, idUser, title, description,isComplete);
    const notes = await getNotesForUser(idUser);
    res.status(200).send(notes)
})

app.post("/notes", async(req, res) =>{
    const {title, description, idUser} = req.body;
    await createNote(title, description, idUser);
    const notes = await getNotesForUser(idUser);
    res.status(200).send(notes)
})

app.delete("/notes/:idNote", async(req, res)=>{
    const idNote = req.params.idNote
    const idUser = req.body.idUser
    await deleteNote(idNote, idUser)
    const notes = await getNotesForUser(idUser);
    res.status(200).send(notes)
})