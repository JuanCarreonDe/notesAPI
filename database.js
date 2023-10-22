import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const pool = mysql

  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

export async function getNotesForUser(idUser) {
  const [row] = await pool.query(`CALL getNotesForUser(?);`, [idUser]);
  console.log(row);
  return row;
}

export async function createNote(title, description, idUser) {
    const [row] = await pool.query(`CALL createNote(?, ?, ?);`, [title, description, idUser]);
    console.log(row);
    return row;
  }

  export async function updateNote(idNote, idUser, title, description, isComplete) {
    const [row] = await pool.query(`CALL updateNote(?, ?, ?, ?, ?);`, [idNote, idUser, title, description, isComplete]);
    console.log(row);
    return row;
  }

  export async function deleteNote(idNote, idUser) {
    const [row] = await pool.query(`CALL deleteNote(?, ?);`, [idNote, idUser]);
    console.log(row);
    return row;
  }