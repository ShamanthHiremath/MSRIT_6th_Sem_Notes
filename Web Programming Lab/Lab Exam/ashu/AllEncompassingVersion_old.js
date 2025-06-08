//works for mongodb server2.6-4.4(in your system) till 4 and driver v1x,v2x(in node_modules)
//mongod --version(for server) npm list mongodb(for driver)
// const express=require('express');
// const bodyParser=require('body-parser');
// var MongoClient=require('mongodb').MongoClient;

// const app=express();
// const port=3000;

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:true}));

// let db;
// const mongoUrl='mongodb://127.0.0.1:27017/my_db';
// MongoClient.connect(mongoUrl,function(err,database){
//     if(err)
//       console.log("Cant connect to mongodb");
//     else{
//        console.log("mongodb connected");
//        db=database;
//        app.listen(port,()=>{
//        console.log(`Server is connected at ${port}`);
//        }) 
//     }
// });

// app.get('/',(req,res)=>{
//     res.send(`
//         <h1>Student Records</h1>
    
//     <h2>Add Student</h2>
//     <form action="/inserting" method="POST">
//       Name: <input type="text" name="name" required><br><br>
//       Semester: <input type="number" name="semester" required><br><br>
//       <button type="submit">Add Student</button>
//     </form>
    
//     <h2>Update Student</h2>
//     <form action="/updating" method="POST">
//       Current Name: <input type="text" name="currentName" required><br><br>
//       New Name: <input type="text" name="newName"><br><br>
//       New Semester: <input type="number" name="newSemester"><br><br>
//       <button type="submit">Update Student</button>
//     </form>
    
//     <h2>Delete Student</h2>
//     <form action="/deleting" method="POST">
//       Name to Delete: <input type="text" name="name" required><br><br>
//       <button type="submit">Delete Student</button>
//     </form>
    
//     <h2>Find Students</h2>
//     <form action="/getting" method="POST">
//       Search by Name: <input type="text" name="name"><br><br>
//       Search by Semester: <input type="number" name="semester"><br><br>
//       <button type="submit">Search Students</button>
//     </form>
    
//     <br>
//     <a href="/getting">View All Students</a>
//     `);
// })

// app.post('/inserting',(req,res)=>{
//     const {field1,field2}=req.body;
//     db.collection('my_collection').insert({field1:field1,field2:field2},function(err,results){
//        if(err) {
//             res.status(500).json({ error: err.message });
//        }
//        else{
//             res.send("Insertion successful!");
//        }
//     });//make sure to use field2:parseInt(field2) incase u want to save as numbers
// });

// app.get('/getting',(req,res)=>{//for less than,greater than,notequals use ({field1:{$lt:20}}) //gt//ne amnd u can add more fields using commas
//     db.collection('my_collection').find({field1:"value"}).toArray(function(err,results){
//         if(err) {
//             res.status(500).json({ error: err.message });
//         } else {
//             let html = '<h1>Values found < 20</h1>';
//             results.forEach(value => {
//                 html += `<p>${value.field1} - ${value.field2}</p>`;
//             });
//             html += '<a href="/">Back</a>';
//             res.send(html);
//         }
//     })
// })

// app.post('/deleting',(req,res)=>{//for less than,greater than,notequals use ({field1:{$lt:20}}) //gt//ne amnd u can add more fields using commas
//     db.collection('my_collection').remove({field1:"value"},function(err,result){
//         if (err) return res.send('Failed to delete');
//         const count = result && result.result ? result.result.n : 0;
//         res.send(`Deleted ${count} entries`);
//     })
// })

// app.post('/updating',(req,res)=>{
//     const { field1, field2 } = req.body;
//     db.collection('students').update({field1:field1}, {$set: {field2: field2}}, function(err, result) {
//         console.log('Update result - Error:', err, 'Result:', result);
//         if(err) {
//             res.status(500).json({ error: err.message });
//         } else {
//             const numUpdated = result.result ? result.result.n : result;
//             if(numUpdated > 0) {
//                 res.send(`SUccessfully updated`);
//             } else {
//                 res.send(`data not found`);
//             }
//         }
//     });
// })

//works for mongodb server2.6-4.4(in your system) till 4 and driver v1x,v2x(in node_modules)
//mongod --version(for server) npm list mongodb(for driver)
const express=require('express');
const bodyParser=require('body-parser');
var MongoClient=require('mongodb').MongoClient;

const app=express();
const port=3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

let db;
const mongoUrl='mongodb://127.0.0.1:27017/my_db';
MongoClient.connect(mongoUrl,function(err,database){
    if(err)
      console.log("Cant connect to mongodb");
    else{
       console.log("mongodb connected");
       db=database;
       app.listen(port,()=>{
       console.log(`Server is connected at ${port}`);
       }) 
    }
});

app.get('/',(req,res)=>{
    res.send(`
        <h1>Student Records</h1>
    
    <h2>Add Student</h2>
    <form action="/inserting" method="POST">
      Name: <input type="text" name="name" required><br><br>
      Semester: <input type="number" name="semester" required><br><br>
      <button type="submit">Add Student</button>
    </form>
    
    <h2>Update Student</h2>
    <form action="/updating" method="POST">
      Current Name: <input type="text" name="currentName" required><br><br>
      New Name: <input type="text" name="newName" required><br><br>
      New Semester: <input type="number" name="newSemester" required><br><br>
      <button type="submit">Update Student</button>
    </form>
    
    <h2>Delete Student</h2>
    <form action="/deleting" method="POST">
      Name to Delete: <input type="text" name="name" required><br><br>
      <button type="submit">Delete Student</button>
    </form>
    
    <h2>Find Students</h2>
    <form action="/getting" method="POST">
      Search by Name: <input type="text" name="name"><br><br>
      Search by Semester: <input type="number" name="semester"><br><br>
      <button type="submit">Search Students</button>
    </form>
    
    <br>
    <a href="/getting">View All Students</a>
    `);
})

app.post('/inserting',(req,res)=>{
    const {name, semester}=req.body;
    db.collection('my_collection').insert({name:name, semester:parseInt(semester)},function(err,results){
       if(err) {
            res.status(500).json({ error: err.message });
       }
       else{
            res.send("Insertion successful!<br><a href='/'>Back</a>");
       }
    });
});

app.get('/getting',(req,res)=>{
    db.collection('my_collection').find({}).toArray(function(err,results){
        if(err) {
            res.status(500).json({ error: err.message });
        } else {
            let html = '<h1>All Students</h1>';
            results.forEach(value => {
                html += `<p>${value.name} - Semester: ${value.semester}</p>`;
            });
            html += '<a href="/">Back</a>';
            res.send(html);
        }
    })
})

app.post('/getting',(req,res)=>{
    const {name, semester} = req.body;
    db.collection('my_collection').find({name:name,semester:parseInt(semester)}).toArray(function(err,results){
        if(err) {
            res.status(500).json({ error: err.message });
        } else {
            let html = '<h1>Search Results</h1>';
            results.forEach(value => {
                html += `<p>${value.name} - Semester: ${value.semester}</p>`;
            });
            html += '<a href="/">Back</a>';
            res.send(html);
        }
    })
})

app.post('/deleting',(req,res)=>{
    const {name} = req.body;
    db.collection('my_collection').remove({name:name},function(err,result){
        if (err) return res.send('Failed to delete<br><a href="/">Back</a>');
        const count = result && result.result ? result.result.n : 0;
        res.send(`Deleted ${count} entries<br><a href="/">Back</a>`);
    })
})

app.post('/updating',(req,res)=>{
    const { currentName, newName, newSemester } = req.body;
    db.collection('my_collection').update({name:currentName}, {$set: {name:newName,semester:parseInt(newSemester)}}, function(err, result) {
        if(err) {
            res.status(500).json({ error: err.message });
        } else {
            const numUpdated = result.result ? result.result.n : result;
            if(numUpdated > 0) {
                res.send(`Successfully updated<br><a href="/">Back</a>`);
            } else {
                res.send(`Data not found<br><a href="/">Back</a>`);
            }
        }
    });
})
