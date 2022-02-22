const path = require('path');
const bodyParser = require('body-parser');

const express = require('express');
const app = express();

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

const port = 3000;
const url = 'Insert MongoDB url here'; 
mongoose.connect(url, { useNewUrlParser: true })



app.get('/', async (req, res) => {
    var limit = 10; if(req.query.limit){limit = req.query.limit;};
    var query = req.query;

    if(query){
    let documents = await Document.find(query).limit(limit);
    res.render('index', {documents: documents});
    }
    else{
    let documents = await Document.find().limit(limit);
    res.render('index', {documents: documents});
    }
})







// The following part is for setting up test schema and creating sampledata for the database etc.
const documentSchema = new mongoose.Schema({
    title: String,
    firstBoolean: Boolean,
    secondBoolean: Boolean
})

const Document = mongoose.model('Document', documentSchema);

const documentOne = new Document({
    title: "Document One", 
    firstBoolean: true,
    secondBoolean: true,}); documentOne.save();

const documentTwo = new Document({
    title: "Document Two", 
    firstBoolean: false,
    secondBoolean: false}); documentTwo.save();

const documentThree = new Document({
    title: "Document Three", 
    firstBoolean: true,
    secondBoolean: false}); documentThree.save();

const documentFour = new Document({
    title: "Document Four", 
    firstBoolean: false,
    secondBoolean: true}); documentFour.save();

app.listen(port, () => {
})

