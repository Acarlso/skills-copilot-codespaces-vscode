// Create web server
// Create a web server that listens on port 3000. The server should respond with the following:
// - A GET request to /comments should return an array of comments.
// - A POST request to /comments should add a new comment to the array.
// - A PUT request to /comments should modify an existing comment.
// - A DELETE request to /comments should remove a comment.
// - A GET request to /comments/:id should return a single comment with the specified id.
// - A POST request to /comments/:id/upvote should increment the upvotes of the specified comment.
// - A POST request to /comments/:id/downvote should decrement the upvotes of the specified comment.

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = 3000;

app.use(bodyParser.json());

var comments = [
    { id: 1, author: 'John', text: 'Hello World!', upvotes: 0 },
    { id: 2, author: 'Jane', text: 'Hi, universe!', upvotes: 0 }
];

app.get('/comments', function(req, res) {
    res.json(comments);
});

app.post('/comments', function(req, res) {
    var newComment = req.body;
    newComment.id = comments.length + 1;
    newComment.upvotes = 0;
    comments.push(newComment);
    res.json(newComment);
});

app.put('/comments/:id', function(req, res) {
    var commentId = req.params.id;
    var comment = comments.filter(function(comment) {
        return comment.id == commentId;
    })[0];
    comment.author = req.body.author;
    comment.text = req.body.text;
    res.json(comment);
});

app.delete('/comments/:id', function(req, res) {
    var commentId = req.params.id;
    var commentIndex = comments.findIndex(function(comment) {
        return comment.id == commentId;
    });
    if (commentIndex < 0) {
        res.status(404).json({ message: 'Comment not found' });
    } else {
        comments.splice(commentIndex, 1);
        res.json(comments);
    }
});

app.get('/comments/:id', function(req, res) {
    var commentId = req.params.id;
    var comment = comments.filter(function(comment) {
        return comment.id == commentId;