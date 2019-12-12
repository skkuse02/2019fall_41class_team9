
var express = require('express');
let {PythonShell} = require('python-shell');

const router =express.Router();

router.post('/first', (req, res, next) => {
    

    var key = req.body.sn;
    var name1 =  req.body.name1;
    var name2 =  req.body.name2;
    var name3 =  req.body.name3;
    var name4 =  req.body.name4;
    console.log(name1,name2,name3,name4,key)

      
    var options = {
     mode:'text',
     pythonPath: '',
     pythonOptions: ['-u'],
     scriptPath: './src',
     args : [name1, name2 , name3 , name4 ,key]
    }
    PythonShell.run('first_user_db.py',options, (err, results)=>{

        if (err ) {
            console.log("first_user_db error : world cup input eror");
            res.status(500).send('Server Input Error');
            throw err;
        }
        else {
            console.log (results);
            console.log("success");
            res.json({ message: 'success'});
        }
       
    });


});

router.post('/recomm', (req, res, next) => {
    

    var key = req.body.sn;
    var money =  req.body.money;
    var person =  req.body.person;
    if ( person >1 ){
        person =0;
    }
    else {
        person =1 ;
    }
    console.log(key,money,person);

      
    var options = {
     mode:'text',
     pythonPath: '',
     pythonOptions: ['-u'],
     scriptPath: './src',
     args : [money, person, key]
    }
    PythonShell.run('add_user_db.py',options, (err, results)=>{

        if (err ) {
            console.log("add_user_db error : price, money, src");
            res.status(500).send('Server Input Error');
            throw err;
        }
        else {

            console.log(results);
            var url_image = JSON.parse(results);
             console.log("success");
             res.json({ message: 'success', url_image});


        }
        
    });


});

router.post('/update', (req, res, next) => {
    

    var key = req.body.sn;
    var food_pick =  req.body.food;

    var options = {
     mode:'text',
     pythonPath: '',
     pythonOptions: ['-u'],
     scriptPath: './src',
     args : [food_pick, key]
    }
    PythonShell.run('update_db.py',options, (err, results)=>{

        if (err ) {
            console.log("update_db error : food, src");
            res.status(500).send('Server Input Error');
            throw err;
        }

        else {

            
           console.log("success");

            res.json({ message: 'success'});



        }

    });


});

module.exports = router;
