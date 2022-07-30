const express = require('express');
const path = require('path');
const port = 8000;

const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('assets'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

let contactList = [
    {
        name: "Atif",
        phone: "234567898879"
    },
    {
        name: "Saif",
        phone: "73265230462"
    },
    {
        name: "Rocky",
        phone: "237463624932"
    }
];

app.get('/', (req, res) => {
    contactList.sort(function(a, b) {
        const nameA = a.name.toUpperCase(); // ignore upper and lowercase
        const nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
      
        // names must be equal
        return 0;
      });
    return res.render('home', {
        title: "My Contact List",
        contacts: contactList
    });
});

app.get('/delete-contact/', function(req, res){
    let phoneToBeDeleted = req.query.phone;
    console.log(phoneToBeDeleted);
    contactList = contactList.filter((contact) => {
        return contact.phone !== phoneToBeDeleted;
    });
    return res.redirect('/');
});

app.post('/create-contact', (req, res) => {
    let name = req.body.name;
    contactList.push({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        phone: req.body.phone
    });
    return res.redirect('/');
});


app.listen(port, (err) => {
    if(err){
        console.log(err);
        return;
    }
    console.log("Express server is running on port: ", port);
});