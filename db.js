//===========================
//DATABASE
//==========================

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cat_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

var Cat = mongoose.model("data", catSchema);

var add = new Cat({
    name: 'Taylor',
    age: 7,
    breed: 'Singer',
});

add.save(function (err, done) {
    if (err) {
        console.log('Something went wrong');
    } else {
        console.log('Data Added Succesfully');
    }
});