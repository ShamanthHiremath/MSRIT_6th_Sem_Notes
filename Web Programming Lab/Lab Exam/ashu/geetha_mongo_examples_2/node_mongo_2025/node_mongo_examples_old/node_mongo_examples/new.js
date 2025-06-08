const { MongoClient } = require('mongodb');

const uri = 'mongodb://127.0.0.1:27017'; // or use your cloud URI
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log('We are connected');

    const db = client.db('mydb');
    const employee = db.collection('employee');

    // Insert sample data
    await employee.insertMany([
      { empid: 1, empname: 'Steve' },
      { empid: 2, empname: 'Bill' },
      { empid: 3, empname: 'James' },
    ]);

    // Count documents
    const total = await employee.countDocuments();
    console.log('Total Rows:', total);

    // Find all records
    const allRecords = await employee.find().toArray();
    console.log('All Records:');
    allRecords.forEach(doc => console.log(doc));

    // Delete one document
    await employee.deleteOne({ empname: 'xxx' });
    await employee.deleteMany({ empname: 'ele' });

    // Count after deletion
    const countAfterDelete = await employee.countDocuments();
    console.log('Count after delete:', countAfterDelete);

    // Find one by empname
    const found = await employee.findOne({ empname: 'Martin' });
    console.log('Returned #1 document:', found);

    // Query: empid > 4
    const greaterThan4 = await employee.find({ empid: { $gt: 4 } }).toArray();
    console.log('Empid > 4:');
    greaterThan4.forEach(doc => console.log(doc));

    // Query: empname == 'oldemp'
    const oldEmps = await employee.find({ empname: 'oldemp' }).toArray();
    console.log('Old Employees:');
    oldEmps.forEach(doc => console.log(doc));

  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

run();

