//Sort array using loop for number array and string array
function bubbleSort(arr) {
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - 1 - i; j++) {
      // Compare adjacent elements and swap if necessary
      if (arr[j] > arr[j + 1]) {
        // Swap
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }

  return arr;
}

// Example usage
const unsortedArray = [64, 34, 25, 12, 22, 11, 90] or ["banana", "apple", "orange", "grape", "kiwi"];
const sortedArray = bubbleSort(unsortedArray.slice()); // Create a copy to avoid modifying the original array


// Example usage
const unsortedStrings = ["banana", "apple", "orange", "grape", "kiwi"];
const sortedStrings = bubbleSortStrings(unsortedStrings.slice()); // Create a copy to avoid modifying the original array

console.log("Unsorted Strings:", unsortedStrings);
console.log("Sorted Strings:", sortedStrings);

function findSubstring(mainString, substring) {
  const index = mainString.indexOf(substring);
  return index;
}

// Example usage
const mainString1 = "Hello, World!";
const substringToFind1 = "World";

const index1 = findSubstring(mainString1, substringToFind1);

if (index1 !== -1) {
  console.log(`Substring found at index ${index}`);
} else {
  console.log("Substring not found");
}

//Array, string, object method

//For in => array, string, object ( for getting index )
//For of=> array, string ( for getting value )
//Debouncing and throttling
//Payment getway
//Aws deploy with github action
//S3
//how to use switch case, forloop, forin forOf in mongodb query and sql query.
//Difference between docker and github
// Purpose: Docker Hub is a cloud-based repository where you can store, share, and manage Docker container images.
// Docker Hub: Focuses on storing and distributing Docker images.
// Docker Hub: Used in the deployment phase to pull and run pre-built Docker images.

// Purpose: GitHub is a web-based platform for version control and collaborative software development using Git.
// GitHub: Focuses on source code management and version control.
// GitHub: Used in the development phase for source code management, collaboration, and CI/CD workflows.

// Development Workflow: Developers use Git to manage source code. When the code is ready, they use Docker to package the application into a container. This ensures that the application runs the same way in development, testing, and production environments

// git stash is a powerful command in Git that allows you to temporarily save changes in your working directory without committing them. This can be useful when you need to switch branches or perform other tasks but want to return to your current work later

//Integrate razor pay
//Write a cron job for checking all file in folder upload to cloudinary
//Fetch , Ajax, axios
//Node , express and nest architecture
//Argument host????
//Delete drop and truncate
//Cafka,redis,elastic search, join in graphql with postures, rabitmq, s3,
//Data over fetching and underfetching
//typescript
//websocket and socket io
//npx kill-port 3001\

//A stream is a sequence of data elements made available over time. It allows you to read or write data piece by piece (chunk) rather than loading the entire data into memory.
//Streams are used for handling large amounts of data efficiently, especially when working with I/O operations such as reading from or writing to files, network communication, or handling HTTP requests.

//buffers are used for direct manipulation of binary data and are typically fixed-size, while streams are used for handling data in a streaming fashion, allowing for more efficient processing of large datasets or continuous streams of data. They serve different purposes and can be used in conjunction to efficiently handle various data scenarios in

const fs = require("fs");
const readableStream = fs.createReadStream("example.txt", "utf-8");

//Debouncing is a technique used in web development, particularly in handling events like scroll, resize, and keyboard input. The primary advantage of debouncing is to control the rate at which a function is executed.

//1. Reduced Function Calls:
//2. Performance Optimization:
//Closures allow you to encapsulate variables within a function's scope. The variables inside a function are not accessible from the outside, creating a form of data privacy.

//Closures allow variables to persist between function calls. The state of a variable is retained even after the outer function has finished executing.
//This is useful for maintaining state in situations where you need to remember information across multiple function calls.

//Curried functions can make code more readable and maintainable, especially when dealing with complex functions or a series of transformations.

// Non-curried function speed is fast because it will take all arguement at one time and return it immediatly
function add(x, y) {
  return x + y;
}

// Curried version speed is slow because it will create a function every time so it will take extra peformance cost.
function curryAdd(x) {
  return function (y) {
    return x + y;
  };
}

// Usage
const sum = add(2, 3); // Result: 5
const curriedSum = curryAdd(2)(3); // Result: 5
//------------------------------
// Data Encapsulation: Closures allow private data to be encapsulated within a function.
// Reusability: Currying helps in reusing a function with a fixed initial argument.
// Readability: It improves code readability since the scope and lifetime of variables are clearly defined by their lexical context.
// Security: Lexical scope can restrict access to variables, enhancing security and avoiding naming conflicts.
console.log("1");
const promise = new Promise((resolve, reject) => {
  for (var i = 0; i < 100000000000000; i++) {
    resolve("2");
  }
});
promise.then((data) => console.log(data));
console.log("3");

//----------------------

const promise1 = new Promise((res, res) => {
  setTimeout(() => {
    return res("promise resolved");
  }, 1000);
});
promise.then((dta) => console.log(dta));
console.log("Start");
setTimeout(() => {
  console.log("setTimeout 100");
}, 100);
setTimeout(() => {
  console.log("setTimeout callback executed");
}, 0);
console.log("End");
//--------------------------
let flag1 = true;
let flag2 = false;
// extra cases added by Abdull
let optionalKey8 = 8;
let optionalKey9 = undefined;
let optionalKey10 = false;
let optionalKey11 = null;
let optionalKey12 = "twelve";
// const obj = {
//   requiredKey1: 1,
//   requiredKey2: 2,
//   ...(flag1 && { optionalKey3: 3 }),
//   ...(flag2 && { optionalKey4: 4, optionalKey5: 5 }), // ignored
//   ...(flag1 && { optionalKey6: 6, optionalKey7: 7 }),
//   ...(optionalKey8 && { optionalKey8 }),
//   ...(optionalKey9 && { optionalKey9 }), // ignored
//   ...(optionalKey10 && { optionalKey10 }), // ignored
//   ...(optionalKey11 && { optionalKey11 }), // ignored
//   ...(optionalKey12 && { optionalKey12 }),
// };
// console.log(obj);

//------

const arr = [
  true && "one",
  false && "two",
  1 === 1 && "three",
  1 + 1 === 9 && "four",
].filter(Boolean);
console.log(arr);
const cond = false;
const myArr = ["foo", cond ? "bar" : undefined].filter(Boolean);
console.log(myArr);

//--------

const arrs = [6, 2, -3, 7, -5, 11, 0, -5, 6, 8];
// Filter positive numbers and sort them
const positiveNumbers = arrs.filter((num) => num >= 0).sort((a, b) => a - b);
// Map the original array, replacing positive numbers with sorted ones
const result = arrs.map((num) => (num >= 0 ? positiveNumbers.shift() : num));
console.log(result);

//---------------

const contact = {
  alerDays: 7,
  abc: "lplp",
};
console.log(Object.values(contact));
if (contact && Object.keys(contact).length) {
  Object.keys(contact).forEach((key) => {
    console.log(contact[key]);
  });
}
//array method
Push(),
  pop(),
  shift(),
  unshift(),
  slice(),
  splice(),
  join(),
  map(),
  filter(),
  indexOf(),
  length(),
  includes();
concat();
//string method
charAt(), charCodeAt(), concat();
toUpperCase(), slice(), trim(), replace(), split();
// object method
Object.keys();
Object.values();
Object.assign();
Object.hasOwnProperty();
//date Method
const today = new Date();
const year = today.getFullYear();
const month = today.getMonth();
const dayOfMonth = today.getDate();
const dayOfWeek = today.getDay();
const now = new Date();
const hours = now.getHours();
const minutes = now.getMinutes();
const seconds = now.getSeconds();
const milliseconds = now.getMilliseconds();
const futureDate = new Date();
futureDate.setFullYear(2022);
futureDate.setMonth(6); // July (0-11)
futureDate.setDate(15);
const upcomingEvent = new Date();
upcomingEvent.setHours(18);
upcomingEvent.setMinutes(30);
upcomingEvent.setSeconds(0);

const dateString = today.toDateString(); // Returns 'Sat Oct 09 2021'
const timeString = today.toTimeString(); // Returns '14:30:00 GMT+0200 (Central European Summer Time)'
const isoString = today.toISOString(); // Returns '2021-10-09T12:30:00.000Z'

//JavaScript Hoisting
x = 5; // Assign 5 to x

elem = document.getElementById("demo"); // Find an element
elem.innerHTML = x; // Display x in the element

var x; // Declare x
//Variables defined with let and const are hoisted to the top of the block, but not initialized.
// Meaning: The block of code is aware of the variable, but it cannot be used until it has been declared.

//A regular expression is a sequence of characters that forms a search pattern.

//The buffers module provides a way of handling streams of binary data.

//The Buffer object is a global object in Node.js, and it is not necessary to import it using the require keyword.

var buf1 = Buffer.from("a");
var buf2 = Buffer.from("b");
var buf3 = Buffer.from("c");
var arr2 = [buf1, buf2, buf3];

var buf = Buffer.concat(arr2);
console.log(buf);

var buf1 = Buffer.from("abc");
var buf2 = Buffer.from("abc");
var x = Buffer.compare(buf1, buf2);
console.log(x);

var buf1 = Buffer.from("a");
var buf2 = Buffer.from("b");
var x = Buffer.compare(buf1, buf2);
console.log(x);

var buf1 = Buffer.from("b");
var buf2 = Buffer.from("a");
var x = Buffer.compare(buf1, buf2);
console.log(x);

//The syntax for creating an empty Buffer of the length 15:
var buf = Buffer.alloc(15);
//-------------
var buf = Buffer.from("Hello, and welcome to Rome!");

console.log(buf.includes("welcome"));
//--------------------
var buf = Buffer.alloc(15);

buf.fill("a");

console.log(buf);

// -------------------
var buf1 = Buffer.from("abc");
var buf2 = Buffer.from("abcd");

console.log(buf1.equals(buf2)); //false

// Entries = Display the content of a Buffer, both index and byte:
var buf = Buffer.from("abc");

for (x of buf.entries()) {
  console.log(x);
}
// [ 0, 97 ]
// [ 1, 98 ]
// [ 2, 99 ]

//copy
var buf1 = Buffer.from("abcdefghijkl");
var buf2 = Buffer.from("HELLO");

//Copy buf2 into parts of buf1:
buf2.copy(buf1, 2);

console.log(buf1.toString()); //abHELLOhijkl
//keys
var buf = Buffer.from("abc");

for (x of buf.keys()) {
  console.log(x);
}

//indexOf
var buf = Buffer.from("Hello, and welcome to Rome!");

console.log(buf.indexOf("welcome")); //11

//toString
var buf = Buffer.from("abc");

console.log(buf.toString());

//Display the Buffer without converting it into a String:

console.log(buf);

//returns the buffer object
var buf = Buffer.from("abc");

console.log(buf.toJSON()); //{ type: 'Buffer', data: [ 97, 98, 99 ] }

// values
var buf = Buffer.from("abcdef");

for (x of buf.values()) {
  console.log(x); //97,98,99,100,101,102
}
//cluster

//The cluster module provides a way of creating child processes that runs simultaneously and share the same server port.

//Node.js runs single threaded programming, which is very memory efficient, but to take advantage of computers multi-core systems, the Cluster module allows you to easily create child processes that each runs on their own single thread, to handle the load.
disconnect() - 	//Disconnects all workers,
fork() - //Creates a new worker, from a master
isConnected() - //Returns true if the worker is connected to its master, otherwise false
isDead() - //Returns true if the worker's process is dead, otherwise false
isMaster() - //Returns true if the current process is master, otherwise false
isWorker() - //Returns true if the current process is worker, otherwise false

// var cluster = require("cluster");

// if (cluster.isWorker) {
//   console.log("I am a worker");
// } else {
//   console.log("I am a master");
//   cluster.fork();
//   cluster.fork();
// }

//crypto
// var crypto = require('crypto');

// var mykey = crypto.createCipher('aes-128-cbc', 'mypassword');
// var mystr = mykey.update('abc', 'utf8', 'hex')
// mystr += mykey.final('hex');

console.log(mystr); //34feb914c099df25794bf9ccb85bea72

var crypto = require('crypto');

var mykey = crypto.createDecipher('aes-128-cbc', 'mypassword');
var mystr = mykey.update('34feb914c099df25794bf9ccb85bea72', 'hex', 'utf8')
mystr += mykey.final('utf8');

console.log(mystr); //abc

//filesystem
var fs = require('fs');

fs.readFile('demofile.txt', 'utf8', function(err, data) {
  if (err) throw err;
  console.log(data);
});

//os
os.freemem() - //Returns the number of free memory of the system,
hostname() - //Returns the hostname of the operating system
tmpdir()	//Returns the operating system's default directory for temporary files

//http

createServer() //create server,
request()	//Returns an object containing the user's request

// https - Create a https server that listens on port 8080 of your computer.

//url
var http = require('http');
var url = require('url');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  var q = url.parse(req.url, true);
  res.write(q.href);
  res.end();
}).listen(8080);

//url.format()
//importing the module 'url' 
const url = require('url'); 
  
//creating and initializing urlObject 
var urlObject={ 
        protocol: 'https', 
        hostname: 'example.com', 
        port: 1800, 
        pathname: 'sample/path', 
        query: { 
                page: 1, 
                format: 'json'
        }, 
        hash: 'first'
    } 
  
//getting the derived URL from urlObject using the url.format function 
var sampleUrl=url.format(urlObject); 
  
//Display the returned value 
console.log(sampleUrl.toString()); 
// url.parse()

const url = require('url'); 
  
// URL address  
const address = 'https://geeksforgeeks.org/projects?sort=newest&lang=nodejs'; 
  
// Call parse() method using url module 
let urlObject = url.parse(address, true); 
  
console.log('URL Object returned after parsing'); 
  
// Returns an URL Object 
console.log(urlObject) 
// url.resolve()
    
//importing the module 'url'  
const url = require('url');  
  
//We can directly console.log() return value of the method 
  
//Method 1: 
console.log(url.resolve("http://www.google.com/", "/one"));                   
console.log(url.resolve("http://www.google.com/one/two/three", "/four"));     
  
//Method 2: 
console.log(url.resolve("http://www.google.com/", "one"));                   
console.log(url.resolve("http://www.google.com/one/two/three", "four")); 

// o/p http://www.google.com/one
// http://www.google.com/four

// http://www.google.com/one
// http://www.google.com/one/two/four

//path
var path = require('path');
var filename = path.basename('/Users/Refsnes/demo_path.js');
console.log(filename); //demo_path.js

// dirname()	Returns the directories of a path
// extname()	Returns the file extension of a path
// format()	Formats a path object into a path string
// join()	Joins the specified paths into one

var path = require('path');

var x = path.join('Users', 'Refsnes', 'demo_path.js');

console.log(x); //Users\Refsnes\demo_path.js
// parse()	Formats a path string into a path object

// Import the path module 
const path = require('path'); 
   
path1 = path.parse("/users/admin/website/index.html"); 
console.log(path1); 
   
path2 = path.parse("website/readme.md"); 
console.log(path2); 
// output
// {
//   root: '/',
//   dir: '/users/admin/website',
//   base: 'index.html',
//   ext: '.html',
//   name: 'index'
// }
// {
//   root: '',
//   dir: 'website',
//   base: 'readme.md',
//   ext: '.md',
//   name: 'readme'
// }

//normalize()	Normalizes the specified path

var x = path.normalize('Users/Refsnes/../Jackson');

console.log(x); //Users\Jackson

//isAbsolute()	Returns true if a path is an absolute path, otherwise false

console.log(path.isAbsolute('/test/demo_path.js')); //true
console.log(path.isAbsolute('test/demo_path.js')); //false
console.log(path.isAbsolute('C:\\test\\demo_path.js')); //true

//querystring
// escape()	Returns an escaped querystring
// String to be encoded 
let str = "I love geeksforgeeks"; 
  
// Using the escape function to the string 
let encodedURL = querystring.escape(str); 
  
// Printing the encoded url 
console.log(encodedURL)  //encoded url : I%20love%20geeksforgeeks

// parse()	Parses the querystring and returns an object
// Specify the URL query string 
// to be parsed 
let urlQuery =  
  "username=user1&units=kgs&units=pounds&permission=false"; 
  
// Use the parse() method on the string 
let parsedObject = querystring.parse(urlQuery); 
  
console.log("Parsed Query:", parsedObject); 
// output
// Parsed Query: [Object: null prototype] {
//   username: 'user1',
//   units: [ 'kgs', 'pounds' ],
//   permission: 'false'
// }
// stringify()	Stringifies an object, and returns a query string

// Specify the URL object 
// to be serialized 
let urlObject = { 
  user: "sam", 
  access: true, 
  role: ["admin", "editor", "manager"], 
}; 

// Use the stringify() method on the object 
let parsedQuery = querystring.stringify(urlObject); 

console.log("Parsed Query:", parsedQuery); // user=sam&access=true&role=admin&role=editor&role=manager

import { find, update } from "lodash";
// unescape()	Returns an unescaped query string
import querystring from "querystring" 
import { encryptUsingSessionKey } from "./utils/message-helper";
import { INSERT, SELECT, UPDATE } from "sequelize/lib/query-types";
  
// String to be decoded 
// let str = "I%20love%20geeksforgeeks"; 
  
// Using the unescape function to decode 
let decodedURL = querystring.unescape(str); 
  
// Printing the decoded url 
console.log(decodedURL) 
//I love geeksforgeeks

//events
var events = require('events');
var eventEmitter = new events.EventEmitter();

eventEmitter.on('scream', function() {
console.log('A scream is detected!');
});
eventEmitter.emit('scream');

// Importing events 
const EventEmitter = require('events'); 

// Initializing event emitter instances 
var eventEmitter = new EventEmitter(); 

var geek1= (msg) => { 
	console.log("Message from geek1: " + msg); 
}; 

var geek2 = (msg) => { 
	console.log("Message from geek2: " + msg); 
}; 

// Registering geek1 and geek2 
eventEmitter.on('myEvent', geek1); 
eventEmitter.on('myEvent', geek1); 
eventEmitter.on('myEvent', geek2); 

// Removing listener geek1 that was 
// registered on the line 13 
eventEmitter.removeListener('myEvent', geek1); 

// Triggering myEvent 
eventEmitter.emit('myEvent', "Event occurred"); 

// Removing all the listeners to myEvent 
eventEmitter.removeAllListeners('myEvent'); 

// Triggering myEvent 
eventEmitter.emit('myEvent', "Event occurred"); 


//prependListener()	Adds the specified listener as the first event with the specified name
//prependOnceListener()	Adds the specified listener as the first event with the specified name, once. When the specified listener has been executed, the listener is removed
//removeAllListeners()	Removes all listeners with the specified name, or ALL listeners if no name is specified
// removeListener()	Removes the specified listener with the specified name
// on()	Adds the specified listener
// once()	Adds the specified listener once. When the specified listener has been executed, the listener is removed
// emit()	Call all the listeners registered with the specified name
// eventNames()	Returns an array containing all registered events
// getMaxListeners()	Returns the maximum number of listeners allowed for one event
// listenerCount()	Returns the number of listeners with the specified name
// listeners()	Returns an array of listeners with the specified name

//event driven 
//whenever rrquest comes it treated as event and placed that req to event queue and eventloop process that.
// efficiently manage a large number of connections and provide high-performance server-side applications.


// In MySQL, a transaction is a sequence of one or more SQL statements that are executed as a single unit of work. A transaction allows you to group multiple statements into a single operation, ensuring that either all of the statements are executed successfully, or none of them are. This is known as the ACID properties:

// Atomicity: All or nothing. If any part of the transaction fails, the entire transaction is rolled back, and the database is left unchanged.

// Consistency: The database remains in a consistent state before and after the transaction.

// Isolation: The execution of a transaction is isolated from other transactions, ensuring that the operations within a transaction are not affected by concurrent transactions.

// Durability: Once a transaction is committed, the changes made to the database are permanent and will survive subsequent failures.



//Static Typing:
// TypeScript allows developers to define types for variables, function parameters, and return values. This helps catch type-related errors at compile-time rather than runtime, providing an additional layer of safety.
// Improved code quality and maintainability are achieved through clear and explicit type annotations.



// In summary, TypeScript is used to improve the development experience by catching errors early, providing better tooling support, enhancing code readability, and enabling more scalable and maintainable software development


function customSort(arr) {
  const numbers = [];
  const strings = [];

  // Separate numbers and strings
  for (const element of arr) {
    if (typeof element === 'number') {
      numbers.push(element);
    } else if (typeof element === 'string') {
      strings.push(element);
    }
  }

  // Sort numbers in ascending order using a loop (e.g., bubble sort)
  for (let i = 0; i < numbers.length - 1; i++) {
    for (let j = 0; j < numbers.length - 1 - i; j++) {
      if (numbers[j] > numbers[j + 1]) {
        // Swap elements if they are in the wrong order
        const temp = numbers[j];
        numbers[j] = numbers[j + 1];
        numbers[j + 1] = temp;
      }
    }
  }

  // Sort strings in descending order using a loop
  for (let i = 0; i < strings.length - 1; i++) {
    for (let j = 0; j < strings.length - 1 - i; j++) {
      if (strings[j] < strings[j + 1]) {
        // Swap elements if they are in the wrong order
        const temp = strings[j];
        strings[j] = strings[j + 1];
        strings[j + 1] = temp;
      }
    }
  }

  // Combine the sorted numbers and strings
  const sortedArray = numbers.concat(strings);

  return sortedArray;
}

// Example usage:
// const mixedArray = [10, 'apple', 5, 'orange', 3, 'banana'];

// const sortedResult = customSort(mixedArray);

// console.log('Original Array:', mixedArray);
// console.log('Sorted Array:', sortedResult);

// // sequelize
// // SELECT foo, COUNT(hats) AS n_hats, bar FROM;



const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const User = sequelize.define('User', {
  // Model attributes are defined here
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING
    // allowNull defaults to true
  }
}, {
  // Other model options go here
});

// `sequelize.define` also returns the model
console.log(User === sequelize.models.User); // true

const { Sequelize } = require('sequelize');

// Replace these values with your actual database connection details
// const sequelize = new Sequelize('your_database', 'your_username', 'your_password', {
//   host: 'your_host',
//   dialect: 'mysql',
// });

// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });


  const { MongoClient } = require('mongodb');

// Replace these values with your actual MongoDB connection details
const url = 'mongodb://localhost:27017/your_database';

// Create a new MongoClient
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect to the MongoDB server
client.connect((err) => {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
    return;
  }

  console.log('Connected to MongoDB');

  // Perform operations here...

  // Close the connection
  client.close();
});


const mongoose = require('mongoose');

// Define a mongoose schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  age: Number,
});

// Create a mongoose model from the schema
// const User = mongoose.model('User', userSchema);

// Create a new user document
const newUser = new User({
  username: 'john_doe',
  email: 'john@example.com',
  age: 25,
});

// Save the document to the database
newUser.save((err, savedUser) => {
  if (err) {
    console.error('Error saving user:', err);
    return;
  }

  console.log('User saved:', savedUser);
});

mongoose
  .connect("mongodb://127.0.0.1:27017/export")
  .then((ans) => {
    console.log("ConnectedSuccessful");
  })
  .catch((err) => {
    console.log("Error in the Connection");
  });

  const YourModel = require('./YourModel'); // Replace with the actual path to your model file

  // Perform aggregation with projection
  YourModel.aggregate([
    {
      $match: {
        // Your match conditions go here
        // For example:
        // field1: { $gte: 10 },
      },
    },
    {
      $group: {
        _id: '$field2', // Group by field2
        total: { $sum: '$field3' }, // Calculate the sum of field3 for each group
        count: { $sum: 1 }, // Calculate the count of documents in each group
      },
    },
    {
      $project: {
        _id: 0, // Exclude _id field from the final output
        field2: '$_id', // Include field2 in the final output
        total: 1, // Include total in the final output
        count: 1, // Include count in the final output
      },
    },
    {
      $sort: {
        total: -1, // Sort by total in descending order
      },
    },
    {
      $limit: 10, // Limit the result to 10 documents
    },
  ])
    .exec()
    .then((result) => {
      console.log('Aggregation result:', result);
    })
    .catch((err) => {
      console.error('Aggregation error:', err);
    });
  
// //transaction in momngodb 
// const mongoose = require('mongoose');

// // Replace these values with your actual MongoDB connection details
// const url = 'mongodb://localhost:27017/your_database';

// // Connect to MongoDB
// mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

// // Define your Mongoose model
// const YourModel = mongoose.model('YourModel', new mongoose.Schema({
//   field1: String,
//   field2: Number,
// }));

// // Start a session
// const session = await mongoose.startSession();
// session.startTransaction();

// try {
//   // Operations within the transaction
//   const document1 = await YourModel.create({ field1: 'Value1', field2: 123 }, { session });
//   const document2 = await YourModel.create({ field1: 'Value2', field2: 456 }, { session });

//   // Other operations...

//   // Commit the transaction
//   await session.commitTransaction();
//   session.endSession();

//   console.log('Transaction committed successfully.');
// } catch (error) {
//   // If an error occurs, abort the transaction
//   await session.abortTransaction();
//   session.endSession();

//   console.error('Error in transaction:', error);
// }

// //sequelize transaction 
// const t = await sequelize.transaction();

// try {

  // Then, we do some calls passing this transaction as an option:

//   const user = await User.create({
//     firstName: 'Bart',
//     lastName: 'Simpson'
//   }, { transaction: t });

//   await user.addSibling({
//     firstName: 'Lisa',
//     lastName: 'Simpson'
//   }, { transaction: t });

//   // If the execution reaches this line, no errors were thrown.
//   // We commit the transaction.
//   await t.commit();

// } catch (error) {

//   // If the execution reaches this line, an error was thrown.
//   // We rollback the transaction.
//   await t.rollback();

// }

// mongodb doesnot support migration features as relational database do because of schemaless featurses of mongodb

//Unmanaged transactions: Committing and rolling back the transaction should be done manually by the user (by calling the appropriate Sequelize methods).

// Managed transactions: Sequelize will automatically rollback the transaction if any error is thrown, or commit the transaction otherwise. Also, if CLS (Continuation Local Storage) is enabled, all queries within the transaction callback will automatically receive the transaction object.

//npm install --save-dev sequelize-cli
//npx sequelize-cli init
//This will create following folders

// config, contains config file, which tells CLI how to connect with database
// models, contains all models for your project
// migrations, contains all migration files
// seeders, contains all seed files

//npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string // create the user.js model in models folder and migrtion file in migration folder.

//npx sequelize-cli db:migrate //migrate all the file of migration folder are migrated in db

//npx sequelize-cli db:migrate:undo //undo most recent migration

//npx sequelize-cli db:migrate:undo:all --to XXXXXXXXXXXXXX-create-posts.js


// const project = await Project.findOne({ where: { title: 'My Title' } });
// const [user, created] = await User.findOrCreate({
//   where: { username: 'sdepold' },
//   defaults: {
//     job: 'Technical Lead JavaScript'
//   }
// });
// const { count, rows } = await Project.findAndCountAll({
//   where: {
//     title: {
//       [Op.like]: 'foo%'
//     }
//   },
//   offset: 10,
//   limit: 2
// });

// const project = await Project.findByPk(123);
// if (project === null) {
//   console.log('Not found!');
// } else {
//   console.log(project instanceof Project); // true
//   // Its primary key is 123
// }
// mongoose query
YourModel.findByIdAndUpdate(documentId, { age: 30 }, { new: true })
YourModel.findOneAndUpdate({ name: 'John' }, { age: 30 }, { new: true })
Model.deleteMany()
Model.deleteOne()
Model.find()
Model.findById()
Model.findByIdAndDelete()
Model.findByIdAndRemove()
Model.findByIdAndUpdate()
Model.findOne()
Model.findOneAndDelete()
Model.findOneAndReplace()
Model.findOneAndUpdate()
Model.replaceOne()
Model.updateMany()
Model.updateOne()

// mongoose hooks
schema.pre('validate', function() {
  console.log('this gets printed first');
});
schema.post('validate', function() {
  console.log('this gets printed second');
});
schema.pre('save', function() {
  console.log('this gets printed third');
});
schema.post('save', function() {
  console.log('this gets printed fourth');
});

// const User = mongoose.model('User', userSchema);

// const doc = new User({ name: 'John', age: 30 });
// await doc.save({ validateModifiedOnly: true });


// sequelize hooks
// Hooks firing order
(1)
  beforeBulkCreate(instances, options)
  beforeBulkDestroy(options)
  beforeBulkUpdate(options)
(2)
  beforeValidate(instance, options)

// [... validation happens ...]

(3)
  afterValidate(instance, options)
  validationFailed(instance, options, error)
(4)
  beforeCreate(instance, options)
  beforeDestroy(instance, options)
  beforeUpdate(instance, options)
  beforeSave(instance, options)
  beforeUpsert(values, options)

// [... creation/update/destruction happens ...]

(5)
  afterCreate(instance, options)
  afterDestroy(instance, options)
  afterUpdate(instance, options)
  afterSave(instance, options)
  afterUpsert(created, options)
(6)
  afterBulkCreate(instances, options)
  afterBulkDestroy(options)
  afterBulkUpdate(options)

  // Declaring Hooks
  // Method 2 via the .addHook() method
User.addHook('beforeValidate', (user, options) => {
  user.mood = 'happy';
});

User.addHook('afterValidate', 'someCustomName', (user, options) => {
  return Promise.reject(new Error("I'm afraid I can't let you do that!"));
});

// Method 3 via the direct method
User.beforeCreate(async (user, options) => {
  const hashedPassword = await hashPassword(user.password);
  user.password = hashedPassword;
});

User.afterValidate('myHookAfter', (user, options) => {
  user.username = 'Toni';
});

Book.removeHook('afterCreate', 'notifyUsers');

// Global / universal hooks
// Global hooks are hooks that are run for all models. They are especially useful for plugins and can define behaviours that you want for all your models
// = sequelize.define('User', {}, {
//   tableName: 'users',
//   hooks : {
//       beforeCreate : (record, options) => {
//           record.dataValues.createdAt = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
//           record.dataValues.updatedAt = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
//       },
//       beforeUpdate : (record, options) => {
//           record.dataValues.updatedAt = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
//       }
//   }
// });

// connection hook
sequelize.beforeConnect();
sequelize.afterConnect();
sequelize.beforeDisconnect();
sequelize.afterDisconnect();
sequelize.beforeConnect(async (config) => {
  config.password = await getAuthToken();
});

// models hook
// YourModel.beforeBulkCreate()
// YourModel.beforeBulkUpdate()
// YourModel.beforeBulkDestroy()
// YourModel.afterBulkCreate()

// Aggregate functions:
// These functions are used to do operations from the values of the column and a single value is returned.
// AVG()
// COUNT()
// FIRST()
// LAST()
// MAX()
// MIN()
// SUM()

// Scalar functions:
// These functions are based on user input, these too returns single value.
// UCASE()
// LCASE()
// MID()
// LEN()
// ROUND()
// NOW()
// FORMAT()

//mysql string function
// CHAR_LENGTH	Returns the length of a string (in characters)
// CHARACTER_LENGTH	Returns the length of a string (in characters)
// CONCAT	Adds two or more expressions together
// CONCAT_WS	Adds two or more expressions together with a separator
// FIELD	Returns the index position of a value in a list of values
// FIND_IN_SET	Returns the position of a string within a list of strings
// FORMAT	Formats a number to a format like "#,###,###.##", rounded to a specified number of decimal places
// INSERT	Inserts a string within a string at the specified position and for a certain number of characters
// INSTR	Returns the position of the first occurrence of a string in another string
// LCASE	Converts a string to lower-case
// LEFT	Extracts a number of characters from a string (starting from left)
// LENGTH	Returns the length of a string (in bytes)
// LOCATE	Returns the position of the first occurrence of a substring in a string
// LOWER	Converts a string to lower-case
// LPAD	Left-pads a string with another string, to a certain length
// LTRIM	Removes leading spaces from a string
// MID	Extracts a substring from a string (starting at any position)
// POSITION	Returns the position of the first occurrence of a substring in a string
// REPEAT	Repeats a string as many times as specified
// REPLACE	Replaces all occurrences of a substring within a string, with a new substring
// REVERSE	Reverses a string and returns the result
// RIGHT	Extracts a number of characters from a string (starting from right)
// RPAD	Right-pads a string with another string, to a certain length
// RTRIM	Removes trailing spaces from a string
// SPACE	Returns a string of the specified number of space characters
// STRCMP	Compares two strings
// SUBSTR	Extracts a substring from a string (starting at any position)
// SUBSTRING	Extracts a substring from a string (starting at any position)
// SUBSTRING_INDEX	Returns a substring of a string before a specified number of delimiter occurs
// TRIM	Removes leading and trailing spaces from a string
// UCASE	Converts a string to upper-case
// UPPER	Converts a string to upper-case

//MySQL Numeric Functions


// ABS	Returns the absolute value of a number
// ACOS	Returns the arc cosine of a number
// ASIN	Returns the arc sine of a number
// ATAN	Returns the arc tangent of one or two numbers
// ATAN2	Returns the arc tangent of two numbers
// AVG	Returns the average value of an expression
// CEIL	Returns the smallest integer value that is >= to a number
// CEILING	Returns the smallest integer value that is >= to a number
// COS	Returns the cosine of a number
// COT	Returns the cotangent of a number
// COUNT	Returns the number of records returned by a select query
// DEGREES	Converts a value in radians to degrees
// DIV	Used for integer division
// EXP	Returns e raised to the power of a specified number
// FLOOR	Returns the largest integer value that is <= to a number
// GREATEST	Returns the greatest value of the list of arguments
// LEAST	Returns the smallest value of the list of arguments
// LN	Returns the natural logarithm of a number
// LOG	Returns the natural logarithm of a number, or the logarithm of a number to a specified base
// LOG10	Returns the natural logarithm of a number to base 10
// LOG2	Returns the natural logarithm of a number to base 2
// MAX	Returns the maximum value in a set of values
// MIN	Returns the minimum value in a set of values
// MOD	Returns the remainder of a number divided by another number
// PI	Returns the value of PI
// POW	Returns the value of a number raised to the power of another number
// POWER	Returns the value of a number raised to the power of another number
// RADIANS	Converts a degree value into radians
// RAND	Returns a random number
// ROUND	Rounds a number to a specified number of decimal places
// SIGN	Returns the sign of a number
// SIN	Returns the sine of a number
// SQRT	Returns the square root of a number
// SUM	Calculates the sum of a set of values
// TAN	Returns the tangent of a number
// TRUNCATE	Truncates a number to the specified number of decimal places

//MySQL Date Functions

// ADDDATE	Adds a time/date interval to a date and then returns the date
// ADDTIME	Adds a time interval to a time/datetime and then returns the time/datetime
// CURDATE	Returns the current date
// CURRENT_DATE	Returns the current date
// CURRENT_TIME	Returns the current time
// CURRENT_TIMESTAMP	Returns the current date and time
// CURTIME	Returns the current time
// DATE	Extracts the date part from a datetime expression
// DATEDIFF	Returns the number of days between two date values
// DATE_ADD	Adds a time/date interval to a date and then returns the date
// DATE_FORMAT	Formats a date
// DATE_SUB	Subtracts a time/date interval from a date and then returns the date
// DAY	Returns the day of the month for a given date
// DAYNAME	Returns the weekday name for a given date
// DAYOFMONTH	Returns the day of the month for a given date
// DAYOFWEEK	Returns the weekday index for a given date
// DAYOFYEAR	Returns the day of the year for a given date
// EXTRACT	Extracts a part from a given date
// FROM_DAYS	Returns a date from a numeric datevalue
// HOUR	Returns the hour part for a given date
// LAST_DAY	Extracts the last day of the month for a given date
// LOCALTIME	Returns the current date and time
// LOCALTIMESTAMP	Returns the current date and time
// MAKEDATE	Creates and returns a date based on a year and a number of days value
// MAKETIME	Creates and returns a time based on an hour, minute, and second value
// MICROSECOND	Returns the microsecond part of a time/datetime
// MINUTE	Returns the minute part of a time/datetime
// MONTH	Returns the month part for a given date
// MONTHNAME	Returns the name of the month for a given date
// NOW	Returns the current date and time
// PERIOD_ADD	Adds a specified number of months to a period
// PERIOD_DIFF	Returns the difference between two periods
// QUARTER	Returns the quarter of the year for a given date value
// SECOND	Returns the seconds part of a time/datetime
// SEC_TO_TIME	Returns a time value based on the specified seconds
// STR_TO_DATE	Returns a date based on a string and a format
// SUBDATE	Subtracts a time/date interval from a date and then returns the date
// SUBTIME	Subtracts a time interval from a datetime and then returns the time/datetime
// SYSDATE	Returns the current date and time
// TIME	Extracts the time part from a given time/datetime
// TIME_FORMAT	Formats a time by a specified format
// TIME_TO_SEC	Converts a time value into seconds
// TIMEDIFF	Returns the difference between two time/datetime expressions
// TIMESTAMP	Returns a datetime value based on a date or datetime value
// TO_DAYS	Returns the number of days between a date and date "0000-00-00"
// WEEK	Returns the week number for a given date
// WEEKDAY	Returns the weekday number for a given date
// WEEKOFYEAR	Returns the week number for a given date
// YEAR	Returns the year part for a given date
// YEARWEEK	Returns the year and week number for a given date

//MySQL Advanced Functions

// BIN	Returns a binary representation of a number
// BINARY	Converts a value to a binary string
// CASE	Goes through conditions and return a value when the first condition is met
// CAST	Converts a value (of any type) into a specified datatype
// COALESCE	Returns the first non-null value in a list
// CONNECTION_ID	Returns the unique connection ID for the current connection
// CONV	Converts a number from one numeric base system to another
// CONVERT	Converts a value into the specified datatype or character set
// CURRENT_USER	Returns the user name and host name for the MySQL account that the server used to authenticate the current client
// DATABASE	Returns the name of the current database
// IF	Returns a value if a condition is TRUE, or another value if a condition is FALSE
// IFNULL	Return a specified value if the expression is NULL, otherwise return the expression
// ISNULL	Returns 1 or 0 depending on whether an expression is NULL
// LAST_INSERT_ID	Returns the AUTO_INCREMENT id of the last row that has been inserted or updated in a table
// NULLIF	Compares two expressions and returns NULL if they are equal. Otherwise, the first expression is returned
// SESSION_USER	Returns the current MySQL user name and host name
// SYSTEM_USER	Returns the current MySQL user name and host name
// USER	Returns the current MySQL user name and host name
// VERSION	Returns the current version of the MySQL database

//
// Conclusion. In the early days of the web, AJAX concept was strongly used along with XMLHttpRequest API. Nowadays we have a better and modern way to handle data asynchronously by using Fetch API. 

//Fetch API is Promise based api used to fetch resource across web server, almost same like AJAX but with easy syntax and more features. Fetch API can also send or receive data like XML, JSON, TEXT and HTML from web server without reloading.

//While integrating AJAX methods with JQuery you’ll realize that you need to write more lines of code, which creates unnecessary file load and delays the load time speed.

// To get rid of these disadvantages JSE6 introduced fetch API( ), now were using fetch to make AJAX calls in JS

// SOAP stands for Simple Object Access Protocol and REST stands for Representational State Transfer.
// Since SOAP is a protocol, it follows a strict standard to allow communication between the client and the server whereas REST is an architectural style that doesn’t follow any strict standard but follows six constraints defined by Roy Fielding in 2000. Those constraints are – Uniform Interface, Client-Server, Stateless, Cacheable, Layered System, Code on Demand.
// SOAP uses only XML for exchanging information in its message format whereas REST is not restricted to XML and its the choice of implementer which Media-Type to use like XML, JSON, Plain-text. Moreover, REST can use SOAP protocol but SOAP cannot use REST.
// On behalf of services interfaces to business logic, SOAP uses @WebService whereas REST instead of using interfaces uses URI like @Path.
// SOAP is difficult to implement and it requires more bandwidth whereas REST is easy to implement and requires less bandwidth such as smartphones.

// Both REST API and RESTful API are stateless, which means that each request contains all the necessary information to complete the request.
// Both REST API and RESTful API provide a simple and standardized way of accessing resources over the internet.

// both REST API and RESTful API may not be suitable for complex business logic and workflows.
// both REST API and RESTful API can be difficult to implement in certain situations, especially when dealing with complex data structures


// typescript type
//union
// enum
// enum StatusCodes {
//   NotFound = 404,
//   Success = 200,
//   Accepted = 202,
//   BadRequest = 400
// }
// // logs 404
// console.log(StatusCodes.NotFound);
// // logs 200
// console.log(StatusCodes.Success);
// // array
// const names: string[] = [];
names.push("Dylan"); // no error
// names.push(3); // Error: Argument of type 'number' is not assignable to parameter of type 'string'.
// object
// const car: { type: string, model: string, year: number } = {
//   type: "Toyota",
//   model: "Corolla",
//   year: 2009
// };
// // tuple
// // define our tuple
// let ourTuple: [number, boolean, string];

// // initialize correctly
// ourTuple = [5, false, 'Coding God was here'];
// // unknown
// let x: unknown = ["true"];
// console.log((x as string[]));

// let value: string | undefined | null = null;
// console.log(typeof value); //object

// value = 'hello';
// console.log(typeof value); //string

// value = undefined;
// console.log(typeof value); //undefined  

//OOP is faster and easier to execute
// OOP provides a clear structure for the programs
// OOP makes it possible to create full reusable applications with less code and shorter development time

function areObjectsEqual(obj1, obj2) {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  for (const key of keys1) {
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }
  return true;
}
const obj1 = { name: "John", age: 30};
const obj2 = { name: "John", age: 30 };
console.log(areObjectsEqual(obj1, obj2)); // true (content is the same)

const array1 = [1, 2, 3];
const array2 = [1, 2, 3];
const arraysAreEqual = array1.length === array2.length && array1.every((value, index) => value === array2[index]);
console.log(arraysAreEqual); // true (same content)


function arraysAreEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
      return false;
  }
  for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
          return false;
      }
  }
  return true;
}

console.log(arraysAreEqual(array1, array2)); // true (same content)

// Data Definition Language (DDL)
CREATE
ALTER
DROP
TRUNCATE
//Data Manipulation Language
INSERT
UPDATE
DELETE
//Data Control Language
Grant
Revoke
// Transaction Control Language
COMMIT
ROLLBACK
SAVEPOINT
//Data Query Language
SELECT

// A SAVEPOINT is a point in a transaction in which you can roll the transaction back to a certain point without rolling back the entire transaction

// How internally Node js runs javascript code?
// Node.js internally runs JavaScript code using the V8 JavaScript engine. The V8 engine, developed by Google, is also used in the Google Chrome browser. It provides the runtime environment for executing JavaScript code.
// When you run a JavaScript file using Node.js, the following steps occur:
// Parsing: Node.js first parses the JavaScript code to create an Abstract Syntax Tree (AST). This process involves breaking down the code into its fundamental syntax components, such as functions, variables, and expressions.
// Compilation: After parsing, the AST is converted into machine code using the V8 engine's just-in-time (JIT) compiler. The JIT compiler optimizes the code for performance by analyzing and transforming it.
// Execution: Once the code is compiled into machine code, it is executed by the V8 engine. The execution follows the event-driven, single-threaded model of Node.js, using an event loop for handling asynchronous operations.
// Node.js also provides a set of built-in modules and APIs that allow you to interact with the file system, network, and other resources. These modules, such as fs (file system) and http (HTTP server), are implemented in C++ and exposed to JavaScript through the V8 engine.
// It's worth noting that Node.js is designed to be non-blocking and asynchronous, which means it can efficiently handle concurrent operations without blocking the execution of other tasks. This is achieved through the use of callback functions, Promises, and async/await syntax to handle asynchronous operations.

//Create a file named Dockerfile in the root of your Node.js project. Open the file in a text editor and add the following content:

// # Use an official Node.js runtime as a base image
// FROM node:14

// # Set the working directory inside the container
// WORKDIR /usr/src/app

// # Copy package.json and package-lock.json to the working directory
// COPY package*.json ./

// # Install app dependencies
// RUN npm install

// # Copy the rest of the application code to the working directory
// COPY . .

// # Expose the port your app will run on
// EXPOSE 3000

// # Define the command to run your application
// CMD ["node", "app.js"]

// Replace "app.js" with the entry point file of your Node.js application if it has a different filename.

// 2. Build the Docker Image
// Open a terminal, navigate to the directory containing your Dockerfile, and run the following command to build the Docker image:

//docker build -t your-image-name .

// 3. Run the Docker Container
// Once the image is built, you can run a container based on that image:

// docker run -p 3000:3000 -d your-image-name

//docker-compose up --build
  // above command will build the images and start the containers as defined in the docker-compose.yml file

  // Constraints in MySQL:
  //PRIMARY KEY: Ensures the uniqueness of each record in a table
  // FOREIGN KEY: Establishes a link between two tables, ensuring referential integrity.
  // UNIQUE: Ensures that values in a column or a group of columns are unique.

  // MongoDB is schema-less, and it doesn't enforce constraints in the traditional sense. However, you can implement constraints in your application logic or use MongoDB's validation feature introduced in version 3.2 to enforce certain rules on the data.


  // Index Storage in MySQL:
// In MySQL, when you create an index, the index data is stored separately from the actual table data. The storage mechanism depends on the type of storage engine used for the table. MySQL supports various storage engines, and the most commonly used ones are InnoDB and MyISAM.

// InnoDB Storage Engine:

// InnoDB stores the index and table data together in the same tablespace.
// The primary key index, also known as the clustered index, determines the physical order of the data rows in the table.
// Secondary indexes in InnoDB store a copy of the indexed columns along with a reference to the primary key. This reference is used to locate the actual row in the clustered index.
// MyISAM Storage Engine:

// MyISAM stores the index and data separately.
// The index file contains a separate index for each index defined on the table.
// The data file contains the actual table data in a different format.
// MyISAM tables also have a separate .MYI file for each index, which stores the index data.
// Index Storage in MongoDB:
// In MongoDB, indexes are stored in a separate data structure called a B-tree. The B-tree is maintained in the WiredTiger storage engine (the default storage engine since MongoDB 3.2). Here's how MongoDB stores indexes:

// WiredTiger Storage Engine:

// WiredTiger uses a file-per-collection storage model.
// Each collection has its own set of files for data and indexes.
// For each index on a collection, WiredTiger creates an .wt file to store the B-tree structure.
// The .wt file contains the index keys and pointers to the corresponding documents in the data files.
// Namespace Files:

// MongoDB uses namespace files (.ns files) to store metadata about the collections and indexes in a database.
// Namespace files store information such as index key patterns, index names, and other metadata.
// Data Files:

// The actual document data is stored in separate data files.
// Each document in a collection has a unique identifier (_id), and indexes help MongoDB quickly locate documents based on indexed fields.
// Summary:
// In both MySQL and MongoDB, indexes are stored separately from the raw data to optimize query performance.
// MySQL's storage depends on the storage engine, with InnoDB storing index and data together, and MyISAM storing them separately.
// MongoDB, using the WiredTiger storage engine, maintains separate .wt files for each index and uses namespace files for metadata.
// Understanding the storage details helps you make informed decisions about indexing strategies and storage engine choices based on your specific use case and performance requirements. Keep in mind that the information provided here is a generalization, and specific configurations or versions might introduce variations.

// A  stored procedure in MySQL is a set of SQL statements that can be stored on the server and executed as a single unit. Stored procedures provide several advantages, including code modularity, improved performance, and enhanced security. Here's an explanation of stored procedures in MySQL:

//DELIMITER //

// CREATE PROCEDURE GetEmployee(IN employee_id INT)
// BEGIN
//    SELECT * FROM employees WHERE id = employee_id;
// END //

// DELIMITER ;

// In this example, a stored procedure named GetEmployee is created, which takes an employee ID as a parameter and retrieves information from the employees table.

// Executing a Stored Procedure:
// CALL GetEmployee(1);
  // This command calls the GetEmployee stored procedure with an argument of 1.

  // Parameters and Variables:

  // Stored procedures can have input and output parameters, as well as local variables.
  // DELIMITER //

// CREATE PROCEDURE CalculateSalary(IN employee_id INT, OUT salary INT)
// BEGIN
//    SELECT base_salary + bonus INTO salary FROM employees WHERE id = employee_id;
// END //

// DELIMITER ;

// in MySQL, a view is a virtual table that is based on the result of a SELECT query. A view is not a physical table; instead, it's a stored query that can be used to simplify complex queries, provide a layer of security, or encapsulate certain logic. Here's an explanation of views in MySQL:

// CREATE VIEW EmployeeView AS
// SELECT id, name, department FROM employees WHERE department = 'IT';

// This example creates a view named EmployeeView that selects specific columns from the employees table for employees in the 'IT' department.

// Querying a View:

// Once a view is created, you can query it like a regular table.
// SELECT * FROM EmployeeView;

// CREATE OR REPLACE VIEW EmployeeView AS
// SELECT id, name, department FROM employees WHERE department = 'Sales';

// SELECT orders.order_id, customers.name
// FROM orders
// JOIN EmployeeView ON orders.employee_id = EmployeeView.id;

// MongoDB doesn't have traditional stored procedures like MySQL. MongoDB uses JavaScript-based stored procedures, called JavaScript Stored Procedures or Functions, which are executed on the server using the db.eval() method. However, it's essential to note that db.eval() has been deprecated in recent versions due to security concerns. MongoDB encourages using the aggregation framework or other server-side logic for complex operations.

//write a query for version 


//var x = 12345678901234567890
// console.log(x);

var x = true&false;
var x = true&&false;

//add foreign key in a build table by query
// Foreign keys are supported by the InnoDB storage engine. Make sure your tables are using InnoDB, or convert them if needed. You can do this when creating the table:

// ALTER TABLE child_table
// ADD  FOREIGN KEY (child_column)
// REFERENCES parent_table(parent_column);

// for adding index on a existing table
// CREATE INDEX index_name
// ON table_name (column1, column2, ...);

// useNewUrlParser: true:

// This option is used to enable or disable the new URL parser introduced in MongoDB. The URL parser is responsible for parsing the connection string and extracting connection details from it.
// In earlier versions of the MongoDB Node.js driver, the default URL parser was different, and setting useNewUrlParser: true indicates that you want to use the new URL parser. This is important when working with modern MongoDB connection strings.

// useUnifiedTopology: true:

// This option is used to enable or disable the use of the new Server Discovery and Monitoring engine in the MongoDB driver, which was introduced to replace the legacy monitoring engine.
// When useUnifiedTopology is set to true, it activates the new engine, providing a more efficient and reliable way for the driver to discover and monitor MongoDB servers in a replica set or sharded cluster.
// It is recommended to set useUnifiedTopology: true for new applications, as the legacy monitoring engine is deprecated, and the unified topology is designed to be more robust and maintainable.

// Clouse and lexical scope
// function test(x){
//   function hello(y){
//       return x+y // Lexical scope: inner can access outerVariable
//   }
//   return hello;
// }
// const result = test(5);
// console.log(result(5));

// Bad Request (400):
// The server could not understand the request due to invalid syntax or other client-side error.

// Forbidden (403):
// The server understood the request, but it refuses to authorize it. The client does not have the necessary permissions.

// Unauthorized (401):
// Similar to Forbidden, but specifically indicates that authentication is required and has failed or has not been provided.

//Not Found (404):
// The server cannot find the requested resource. It is a common response when the requested endpoint or resource does not exist

//Conflict (409):
// Indicates that the request could not be completed due to a conflict with the current state of the target resource.

// -- Update all active to inactive and all inactive to active in one query
// UPDATE your_table
// SET status = CASE
//     WHEN status = 'active' THEN 'inactive'
//     WHEN status = 'inactive' THEN 'active'
//     ELSE status
// END;

// // Update all active to inactive and all inactive to active in one query
// db.your_collection.update(
//   { },
//   { $set: { status: { $cond: { if: { $eq: ["$status", "active"] }, then: "inactive", else: "active" } } } },
//   { multi: true }
// );

// 200 OK: The request was successful.
// 201 Created: The request has been fulfilled, resulting in the creation of a new resource.
// 202 Accepted: The request has been accepted for processing but is not yet complete.
// 204 No Content: The server successfully processed the request, but there is no additional content to send in the response.

//  If the server runs out of memory, disk space, or other critical resources, it might not be able to process requests properly, leading to a 500 error 

//500 Internal Server Error: A generic error message returned when an unexpected condition was encountered by the server(Database Connection Failures).
// 501 Not Implemented: The server does not support the functionality required to fulfill the request.
// 502 Bad Gateway: The server, while acting as a gateway or proxy, received an invalid response from the upstream server.
// 503 Service Unavailable: The server is not ready to handle the request. Common causes are a server that is down for maintenance or is overloaded.
// 504 Gateway Timeout: The server, while acting as a gateway or proxy, did not receive a timely response from the upstream server.

// pokemon = {
//   firstname: 'Pika',
//   lastname: 'Chu ',
//   getPokeName: function() {
//       var fullname = this.firstname + ' ' + this.lastname;
//       return fullname;
//   }
// };

// var pokemonName = function() {
//   console.log(this.getPokeName() + 'I choose you!');
// };

// var logPokemon = pokemonName.bind(pokemon); // creates new object and binds pokemon. 'this' of pokemon === pokemon now

// logPokemon(); // 'Pika Chu I choose you!'

// pokemon = {
//   firstname: 'Pika',
//   lastname: 'Chu ',
//   getPokeName: function() {
//       var fullname = this.firstname + ' ' + this.lastname;
//       return fullname;
//   }
// };

// var pokemonName = function(snack, hobby) {
//   console.log(this.getPokeName() + ' loves ' + snack + ' and ' + hobby);
// };

// pokemonName.call(pokemon,'sushi', 'algorithms'); // Pika Chu  loves sushi and algorithms
// pokemonName.apply(pokemon,['sushi', 'algorithms']); // Pika Chu  loves sushi and algorithms

// docker image rm 56f738715a24
// docker image ls
// docker build .
// docker -v
// docker build -t node-app-image .
// docker run -d --name node-app node-app-image
// docker run -p 8000:6000 -d --name node-app node-app-image
// docker ps
// docker rm node-app -f //remove container forcefully without stoping by name
// docker exec -it node-app bash
// docker stop 2d1d68ae819f  // stoping container by id
// docker rm 2d1d68ae819f  //remove container by id
// docker ps -a

// docker compose up -d
// docker compose down -v

// The docker-compose down -v command is used to stop and remove the Docker containers defined in a Docker Compose file along with their associated volumes. Let's break down the components of this command:
// docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build

// -v This option is used to remove the volumes along with the containers. Volumes in Docker are used to persist data outside of container lifetimes. By default, docker-compose down removes only the containers but leaves the volumes intact. Adding the -v option ensures that associated volumes are also removed.



// JSON: Human-readable text format, which is easy for humans to read and write. However, it may be less efficient in terms of space and processing compared to binary formats.
// BSON: Binary format, which is more efficient for storage and data interchange between systems. BSON is particularly useful when dealing with large datasets and in scenarios where efficiency is a priority.

// In summary, while both JSON and BSON serve similar purposes of representing structured data, BSON is a binary format that offers better efficiency in terms of storage and processing, making it suitable for certain use cases, particularly in the context of databases like MongoDB.

// PostgreSQL:

// When to use:

// You need support for complex queries and transactions.
// Your application requires advanced data types (e.g., arrays, JSON, hstore).

// MySQL:

// When to use:

// Your data has a structured and fixed schema.
// ACID compliance (Atomicity, Consistency, Isolation, Durability) is a priority.
// You require support for complex transactions and relationships between tables.


// MongoDB:

// When to use:

// You need a flexible schema or have dynamic and evolving data structures.
// Your data is document-oriented, and you want to store JSON-like documents.
// You're working on projects with large amounts of unstructured or semi-structured data.

// employee.findAll({
//   attributes:['name','age','email'],
//   where:{
//     salery:{
//       [Op.gt]:1200
//     },
//     name:{
//       [Op.and]:[
//         {[Op.startsWith]:'a'},
//         {[Op.endsWith]:'t'}
//         ]
//     },
//     hobbies:{
//       [Op.or]:[
//         {[Op.like]:'%cricket%'},
//         {[Op.like]:'%football%'}
//         ]
//     }
//   }
// })

//  const result = await employeesCollection.aggregate([
//       {
//         $lookup: {
//           from: 'departments',
//           localField: 'departmentId',
//           foreignField: '_id',
//           as: 'department',
//         },
//       },
//       {
//         $unwind: '$department', // Unwind the array created by $lookup to access its fields
//       },
//       {
//         $match: {
//           'department.name': 'YourDepartmentName', // Add conditions for the department table
//           salary: { $gt: 1200 }, // Additional conditions for the employees table
//           name: { $regex: /^a.*r$/i },
//           hobbies: { $in: ['cricket', 'football'] },
//         },
//       },
//     ]).toArray();

// const result = await employeesCollection.aggregate([
//       {
//         $lookup: {
//           from: 'departments',
//           localField: 'departmentId',
//           foreignField: '_id',
//           as: 'department',
//         },
//       },
//     ]).toArray();

// Employee.findAll({
//   include: [
//     {
//       model: Department,
//       required: false,
//       attributes: ['name'], // Specify the attributes you want to retrieve from the joined table
//     },
//   ],
// })

// const arr = [
//   { name: "test", desc: true, hobby: "test" },
//   { hobby: "listening music" },
//   { hobby: "cricket" },
//   { name: "lol", desc: false, hobby: "test" },
//   { hobby: "reading" },
// ];

// const resultObject = arr.reduce((acc, curr) => {
//   const { name, hobby } = curr;

//   if (name) {
//     acc.currentName = name;
//     if (!acc[acc.currentName]) {
//       acc[acc.currentName] = [];
//     }
//   }

//   if (hobby) {
//     acc[acc.currentName].push(hobby);
//   }

//   return acc;
// }, {});

// console.log(resultObject);


// const att = [1,2,1,2,3,3,1,2,5,8,9,"a","a","0","1"]
// let obj = {};
// for(key of att){
//   if(!obj[key]) obj[key] = 1;
//   else obj[key]++
// }
// console.log(obj)

const att = [1,2,1,2,3,3,1,2,5,8,9,"a","a","0","1"]
let obj = {};
for(key of att){
if(key == "1") obj[key] = 1;
else if(key == "a") delete obj[key];
 else if(!obj[key]) obj[key] = 1;
  else obj[key]++

}
console.log(obj)

var arrData = [{name:"test", age:23},
{name:"test1", age:231},
{name:"test2", age:232}

];
const data = arrData.reduce((obj,cur)=>({...obj,[cur.name]:cur.age}),{})
var object = arrData.reduce((obj, item) => Object.assign(obj,{[item.name]:item.age}) ,{});

console.log(data)
console.log(object)

// In summary, views are virtual tables representing the result of a query, while stored procedures are named sets of SQL statements and procedural code executed as a unit. Views are primarily used for data retrieval and simplification, while stored procedures are used for encapsulating logic and providing a reusable and organized way to execute operations on the database server.

// Stored procedures are primarily used for code organization, reusability, and providing a way to execute complex logic on the database server.

//Views are virtual tables that are based on the result of a SELECT query. They provide a way to represent the result set of a query as if it were a table.
// Views are primarily used for simplifying complex queries, abstracting underlying data structures, and providing a convenient way to access and analyze data.

//Views do not store the data themselves; they represent a query's result set dynamically.
// When you query a view, the underlying SELECT statement is executed to retrieve the data.



// If your application requires transactions, data integrity, and foreign key constraints, InnoDB is a good choice.
// Concurrency: InnoDB performs well in high-concurrency environments due to its support for row-level locking

// MySQL supports powerful SQL queries and joins, making it suitable for scenarios where complex queries are necessary.
// Example: Reporting systems, business intelligence applications, where complex aggregations and joins are common
// MySQL is a relational database management system (RDBMS) that excels in handling structured data with well-defined schemas.
// Example: Financial applications, content management systems, e-commerce platforms, where data relationships are well-defined.
// If your application requires ACID (Atomicity, Consistency, Isolation, Durability) transactions for data integrity, MySQL is a strong choice.
// Example: Banking applications, order processing systems, where transactional consistency is critical

//Non-Blocking Function:  
const fs = require('fs');

// Non-blocking function
fs.readFile('example.txt', 'utf-8', (err, data) => {
  if (err) throw err;
  console.log(data);
});

console.log('Program finished.');

// Blocking Function
const fs = require('fs');

// Blocking function
// const data = fs.readFileSync('example.txt', 'utf-8');
// console.log(data);
// console.log('Program finished.');



// const user = [
//   { id: "1", title: "test1", desc: "test" },
//   { id: "2", title: "test2", desc: "test" },
//   { id: "3", title: "test3", desc: "test" },
//   { id: "4", title: "tes4",  desc: "test" },
// ];

// const post = [
//   { id: "1", userId: "1", title: "test1", desc: "test" },
//   { id: "2", userId: "1", title: "test2", desc: "test" },
//   { id: "3", userId: "1", title: "test3", desc: "test" },
//   { id: "4", userId: "2", title: "tes4",  desc: "test" },
//   { id: "5", userId: "2", title: "test1", desc: "test" },
//   { id: "6", userId: "2", title: "test2", desc: "test" },
//   { id: "7", userId: "3", title: "test3", desc: "test" },
//   { id: "8", userId: "3", title: "tes4",  desc: "test" },
//   { id: "9", userId: "4", title: "test1", desc: "test" },
//   { id: "10", userId: "4", title: "test2", desc: "test" },
//   { id: "11", userId: "4", title: "test3", desc: "test" },
//   { id: "12", userId: "4", title: "tes4",  desc: "test" },
// ];

// const data = {};

// // Organize data based on userId
// user.forEach((userData) => {
//   const userId = userData.id;
//   data[userId] = [];
//   post
//     .filter((postItem) => postItem.userId === userId)
//     .forEach((postItem) => {
//       data[userId].push(postItem);
//     });
// });

// console.log(data);

// const user = [
//   { id: "1", title: "test1", desc: "teet", age: 22 },
//   { id: "2", title: "test2", desc: "teet", age: 22 },
//   { id: "3", title: "test3", desc: "teet", age: 23 },
//   { id: "4", title: "tes4", desc: "teet", age: 23 },
// ];

// const filteredUser = user.filter((userData) => userData.age >= 23);

// Sort the array based on the 'age' property
user.sort((a, b) => a.age - b.age);
const user = [
  { id: "1", title: "test1", desc: "teet", age: 22 },
  { id: "2", title: "test2", desc: "teet", age: 22 },
  { id: "3", title: "test3", desc: "teet", age: 23 },
  { id: "4", title: "tes4", desc: "teet", age: 23 },
];

for (let i = 0; i < user.length - 1; i++) {
  for (let j = 0; j < user.length - 1 - i; j++) {
    if (user[j].age > user[j + 1].age) {
      // Swap elements if they are in the wrong order
      let temp = user[j];
      user[j] = user[j + 1];
      user[j + 1] = temp;
    }
  }
}

console.log(user);

// Sort the array based on the 'title' property
user.sort((a, b) => b.title.localeCompare(a.title));
console.log(user);


//string substring 
const mainString = "Hello, world!";
const substring = "d!";

let found = false;

for (let i = 0; i <= mainString.length - substring.length; i++) {
  let match = true;

  for (let j = 0; j < substring.length; j++) {
    if (mainString[i + j] !== substring[j]) {
      match = false;
      break;
    }
  }

  if (match) {
    found = true;
    break;
  }
}

console.log(found); // Output: true






// function findLongest(str){
//     const word = str.split(" ")
//     let longestWord = word[0].length;

//     for(let i=0; i < word.length; i++){
//         //  if(word[i].length<longestWord){ // for smallest Word
//         if(word[i].length > longestWord){ //for longest word
//              longestWord = word[i].length;
//         }
     
//     }
//    return longestWord;
// }

// console.log(findLongest( "abc jklm this is spiderman"));
//  const arr = ["one","twoe","three","htudurt"]
//  const descendinzg =  arr.sort((a,b)=>b.length - a.length)
//  const ascendinzg =  arr.sort((a,b)=>a.length - b.length)
// //  console.log(ascendinzg);
//  console.log(descendinzg);

//  const string = "koplo";
//  const res = [...string].reverse().join("");
//  console.log(res);

//  let a = 5;
//  let b = 9;
//  console.log(a,b);
//  [a,b] = [b,a]
//  console.log(a,b);

//  let obj = {
//     "test":"tes1",
//     "abc":"abc1",
//     "jkl":"jkl1",
//     "pop":"pop1",

//  }
// if("test" in obj){
//     console.log(true);
// }
//  console.log(obj.hasOwnProperty("test"))
//  Object.assign(obj,{"jiji":"lol"});
// const keyArr = Object.keys(obj);
// const valArr = Object.values(obj);
//  console.log(keyArr);
//  console.log(valArr);
// let x = 100;
// (()=>{
//     var x = 20
// })();
// console.log(x);

// function countLength(str){

// var length = 0;

// while(str[length] !== undefined){
//     length++;
// }
// return length;
// }

// console.log(countLength("jkllp"))
// var str = "kokokko"
// console.log(str.charAt(0).toUpperCase() + str.slice(1));
// function splitArray(arr,size){
//     let finalArr = [];
//     let split = 0;
//     while(split < arr.length){
//         finalArr.push(arr.slice(split,split+size))
//         split += size
//     }
//     return finalArr;
// }
//    console.log(splitArray([2,4,5,6,8,9],4));
// reduce method executes reducer function on each element of array and return single output value
// let arr = [1,4,5,2,3]
// let obj = arr.reduce((a,lt,i)=>({...a,[i]:lt}),{})
// console.log(obj);

// let str = "koiupo";

// let vowels = ["a","e","i","o","u"];
//  let cnt = 0
// for (let i = 0; i < str.length; i++) {
//    if(vowels.includes(str[i])){
// cnt++;
//    }
    
// }

// console.log(cnt);

// function fact(num){
// if(num ==0 || num ==1){
//     return 1;
// }
// for (var i = num-1; i >= 1; i--) {
//      num *= i;
// }
// return num;

// }

//   console.log(fact(6));

// function fectRecursion(num){
//     if(num ==0){
//         return 1
//     }else{
//         return num * fectRecursion(num - 1);
//     }
// }

// console.log(fectRecursion(5));

// let str = "kooo lpllp okook"

// console.log(str.indexOf("polpll"));
// console.log(str.search("polpll"));
// console.log(str.includes("lpll"));
// let text = "The rain in SPAIN stays mainly in the plain";
// let result = text.match(/ain/gi);
// console.log(result) //[ 'ain', 'AIN', 'ain', 'ain' ]



// let str = "hello hii you are"

// let strings = str.split(" ");

// let isfind = strings.map(value=>{
//     return value.charAt(0).toUpperCase() + value.slice(1)
// })

// console.log(isfind.join(" "));
// let arr = [1,2,3,4,5,5,3,4]
// let removeDuplicate = arr.filter((cur,i, ar)=>{
//     return arr.indexOf(cur) === i
// })

// let isDupl = arr.filter((cur,i, ar)=>{
//     return arr.indexOf(cur) !== i
// })

// console.log(removeDuplicate);

// fibonacci

// let a =0
// let b = 1;
// for (let i = 0; i <= 15; i++) {
//     const temp = a + b;

//     a = b;
//     b = temp;
//     console.log(temp);
    
// }

//intersection

// let arr1 = [1,32,3,4,5];
// let arr2 = [1,3,3,4,5]; 

//     let inte = arr1.filter(value=>{
//    return arr2.includes(value)
// })
// console.log(inte);
// let arr =[4,5,1]

// const isMax = arr.reduce((acc,ele)=>{
//     return acc > ele ? acc : ele;
// })

// const isMin = arr.reduce((acc,ele)=>{
//     return acc < ele ? acc : ele;
// })
// console.log(isMax);
// console.log(isMin);

// let minValue = Math.min(...arr);
// let maxValue = Math.max(...arr);
// let missingArr = []

// for (let i = minValue; i < maxValue; i++) {
//    if(arr.indexOf(i)< 0){
//     missingArr.push(i)
//    }
    
// }

// console.log(missingArr);

// union 
// let arr1 = [1,32,3,4,5];
// let arr2 = [1,3,3,4,5];

// let newArr = [...arr1,...arr2]
// console.log([...new Set(newArr)]);

// var str = ("kolokko").toLowerCase().split("");

// for (let i = 0;i < str.length;i+=2) {
//      str[i] = str[i].toUpperCase();
// }
//     console.log(str.join(""));

// function sayHi(){
//     return (()=>0)();
// }

// console.log(typeof sayHi());
//most frequent element in array
// let arr = [1,1,2,2,3,3,3,3,5,4,4,4,4,4,6,6,6,6,6,,8,8,8,8,8,8,8,8,8,8,8,8,9]
// let freq = {}
//  arr.forEach(elem=>{
//     if(freq.hasOwnProperty(elem)) freq[elem]++;
//     else freq[elem] = 1;
// })

// const ELEMT = Object.keys(freq).reduce((acc,cur)=>{
//     return freq[acc] > freq[cur] ? acc:cur //most frequent element
//     return freq[acc] < freq[cur] ? acc:cur //least frequent element
// })
// console.log(ELEMT);

// shuffle element of array
// const arr = [1,2,3,4,5]

// let person = {name:"lydia"}

// const member = [person];
// person = null;
// console.log(person);
// console.log(member);



// const obj = {
// name:"pop",
// 1:"pop"
// }
// Object.freeze(obj);  update and assign to obj is not allowed.
// Object.seal(obj); only update is allowed not assign to obj
// Object.defineProperty(obj,"age",{
//     value:3,
//     writable:true
// })

// obj.name = "ooo"
// obj.age = 52

// console.log(obj.hasOwnProperty(name)); //false
// console.log(obj.hasOwnProperty("name")); //true
// console.log(obj.hasOwnProperty(1)); //true
// console.log(obj.hasOwnProperty("1"));  //true

var a = 0;
function b(){
    a=10;
    return;
    var a= function(){}
}
b();
console.log(a);


// missing element
// let arr = [7,2,8,10];

// let maxNum = Math.max(...arr);
// let missingArr = [];
// for(let i=1; i <= maxNum; i++){
//   let match = true;
//   for(let j=0; j < arr.length; j++){
//    if(arr[j] == i){
//      match = false;
//      break;
//    }
//   }
//    if(match){
//         missingArr.push(i)
//     }
// }

// console.log(missingArr)

// function outerFunction() {
//   const outerVariable = 'I am outside!';

//   function innerFunction() {
//     console.log(outerVariable); // The inner function has access to the outerVariable
//   }

//   innerFunction();
// }

// outerFunction(); // Output: I am outside!


function outerFunction() {
  const outerVariable = 'I am outside!';

  function innerFunction() {
    console.log(outerVariable);
  }

  return innerFunction;
}

const closureFunction = outerFunction();
closureFunction(); // Output: I am outside!


function createCounter() {
  let count = 0;

  return {
    increment: function() {
      count++;
      return count;
    },
    decrement: function() {
      count--;
      return count;
    },
    getCount: function() {
      return count;
    }
  };
}

const counter = createCounter();
console.log(counter.increment()); // Output: 1
console.log(counter.getCount());  // Output: 1
console.log(counter.decrement()); // Output: 0

// infinite currying version
function addition(val1){
  return function(val2){
    if(val2){
      return addition(val1 + val2);
    }
    return val1;
  }
}

// const data = addition(1)(2)(3)();

// console.log(data)

// let promise = new Promise(function (resolve, reject) {
//     const x = "geeksforgeeks";
//     const y = "geeksforgeeks"
//     if (x === y) {
//         resolve();
//     } else {
//         reject();
//     }
// });

// promise.
//     then(function () {
//         console.log('Success, You are a GEEK');
//     }).
//     catch(function () {
//         console.log('Some error has occurred');
//     });
    



// The event queue is nothing but a queue that stores the incoming requests in the order that it received them. It then passes on these requests to the Event Loop when it is available. For every I/O request, the event loop receives, passes it on to the internal C++ threads for processing and makes itself available for the other requests, and starts processing those. Then it uses the concept of callback functions from JavaScript to receive the responses of the tasks that were sent to the internal C++ threads earlier for processing and delivers them to the client.

function func() {
	console.log("Hey I am Line number 1");
	setTimeout(function () {
		console.log("Hey I am Line number 2");
	}, 2000);
	console.log("Hey I am Line number 3");
}
console.log("Hey I am Line number 4");

func();
// Explanation: Here, the “Hey I am Line number 4” will get executed first as it is above the function call. After that, the function will be called. Then “Hey I am Line number 1” will be printed and the application will add callback passed to setTimeout into browser macrotask queue, print “Hey I am Line number 3” respectively and then when time specified as 2-nd argument of setTimeout exceedes, JS event loop will get callback function from queue and execute it, thus printing “Hey I am Line number 2”.

// Program 2: To resolve above situation we use reject() instead of throw the statements after the reject statement inside the function will get executed before the control goes to the catch block
{/* <script>
const p = new Promise( ( resolve, reject ) => {

	reject( 'promise failed!' );	 

	console.log( "Here" );
});

p.catch( err => {

	console.log( err )
});
</script>
// o/p = Here
promise failed!


<script>
const p = new Promise( ( resolve, reject ) => {

	throw( 'promise failed!' );	 

	console.log("Here");
});

p.catch( err => {
	console.log( err )
});
</script> */} // o/p='promise failed!'
// Non-blocking I/O means that operations like reading from a file, writing to a database, or making network requests do not block the execution of other code. Instead of waiting for these operations to complete, Node.js uses an event-driven approach where a callback function is registered to handle the response once the operation finishes.

// This allows Node.js to handle many I/O operations in parallel without requiring multiple threads, making it highly efficient for I/O-bound tasks

//callbacks
fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});


//promioses
fs.readFile('file.txt', 'utf8')
  .then(data => console.log(data))
  .catch(err => console.error(err));


  //  Since JavaScript and Node weren’t made for CPU tasks, this is an exceptional case and will be handled differently by using worker threads.

//   Clients Send request to Web Server.
// Node JS Web Server internally maintains a Limited Thread pool to provide services to the Client Requests.
// Node JS Web Server receives those requests and places them into a Queue. It is known as “Event Queue”.
// Node JS Web Server internally has a Component, known as “Event Loop”. Why it got this name is that it uses indefinite loop to receive requests and process them. (See some Java Pseudo code to understand this below).
// Event Loop uses Single Thread only. It is main heart of Node JS Platform Processing Model.
// Even Loop checks any Client Request is placed in Event Queue. If no, then wait for incoming requests for indefinitely.
// If yes, then pick up one Client Request from Event Queue
// Starts process that Client Request
// If that Client Request Does Not requires any Blocking IO Operations, then process everything, prepare response and send it back to client.
// If that Client Request requires some Blocking IO Operations like interacting with Database, File System, External Services then it will follow different approach
// Checks Threads availability from Internal Thread Pool
// Picks up one Thread and assign this Client Request to that thread.
// That Thread is responsible for taking that request, process it, perform Blocking IO operations, prepare response and send it back to the Event Loop
// Event Loop in turn, sends that Response to the respective Client.

// Although Node.js has hidden threads, you cannot use them to offload CPU-intensive tasks, such as complex calculations, image resizing, or video compression. Since JavaScript is single-threaded when a CPU-intensive task runs, it blocks the main thread and no other code executes until the task completes. Without using other threads, the only way to speed up a CPU-bound task is to increase the processor speed.

// However, in recent years, CPUs haven’t been getting faster. Instead, computers are shipping with extra cores, and it’s now more common for computers to have 8 or more cores. Despite this trend, your code will not take advantage of the extra cores on your computer to speed up CPU-bound tasks or avoid breaking the main thread because JavaScript is single-threaded.

// To remedy this, Node.js introduced the worker-threads module, which allows you to create threads and execute multiple JavaScript tasks in parallel. Once a thread finishes a task, it sends a message to the main thread that contains the result of the operation so that it can be used with other parts of the code. The advantage of using worker threads is that CPU-bound tasks don’t block the main thread and you can divide and distribute a task to multiple workers to optimize it.

// In this tutorial, you’ll create a Node.js app with a CPU-intensive task that blocks the main thread. Next, you will use the worker-threads module to offload the CPU-intensive task to another thread to avoid blocking the main thread. Finally, you will divide the CPU-bound task and have four threads work on it in parallel to speed up the task.


// On a single core machine, the processes execute concurrently. That is, the operating system switches between the processes in regular intervals. For example, process D executes for a limited time, then its state is saved somewhere and the OS schedules process B to execute for a limited time, and so on. This happens back and forth until all the tasks have been finished. From the output, it might look like each process has run to completion, but in reality, the OS scheduler is constantly switching between them.

// On a multi-core system—assuming you have four cores—the OS schedules each process to execute on each core at the same time. This is known as parallelism. However, if you create four more processes (bringing the total to eight), each core will execute two processes concurrently until they are finished.

// Threads
// Threads are like processes: they have their own instruction pointer and can execute one JavaScript task at a time. Unlike processes, threads do not have their own memory. Instead, they reside within a process’s memory. When you create a process, it can have multiple threads created with the worker_threads module executing JavaScript code in parallel. Furthermore, threads can communicate with one another through message passing or sharing data in the process’s memory. This makes them lightweight in comparison to processes, since spawning a thread does not ask for more memory from the operating system.

// When it comes to the execution of threads, they have similar behavior to that of processes.If you have multiple threads running on a single core system, the operating system will switch between them in regular intervals, giving each thread a chance to execute directly on the single CPU.On a multi - core system, the OS schedules the threads across all cores and executes the JavaScript code at the same time.If you end up creating more threads than there are cores available, each core will execute multiple threads concurrently.

// However, Node.js implements the libuv library, which provides four extra threads to a Node.js process. With these threads, the I/O operations are handled separately and when they are finished, the event loop adds the callback associated with the I/O task in a microtask queue. When the call stack in the main thread is clear, the callback is pushed on the call stack and then it executes. To make this clear, the callback associated with the given I/O task does not execute in parallel; however, the task itself of reading a file or a network request happens in parallel with the help of the threads. Once the I/O task finishes, the callback runs in the main thread.

// In addition to these four threads, the V8 engine, also provides two threads for handling things like automatic garbage collection. This brings the total number of threads in a process to seven: one main thread, four Node.js threads, and two V8 threads.

// ALTER TABLE Customers
// ADD isActive boolean(1) NOT NULL  DEFAULT (1);

// UPDATE Customers SET isActive = 0 where customer_id IN(2, 4);

// 3306 is MySQL server‘s default port.

// SELECT count(last_name),last_name
// FROM Customers
// GROUP BY last_name
// HAVING COUNT(customer_id) > 1;


//  The default storage engine in MySQL is InnoDB, offering features like transaction support and referential integrity.

// In MySQL, replication is a technique used to synchronize data across multiple servers, which can improve performance, provide redundancy, and distribute load. The difference between master-slave and master-master replication lies in how the data is synchronized and the roles of the servers involved:

// Master-Slave Replication: In this configuration, there's one master server and one or more slave servers. The master server handles all the write operations, while the slave servers replicate the data from the master and handle read operations. The data flows in a unidirectional manner from the master to the slaves. This setup is commonly used to distribute read load, or for backup and analytics purposes.

// Master-Master Replication: In this configuration, two or more servers act as masters, and the data is synchronized bidirectionally across the servers. Each server can handle both read and write operations, allowing updates on any of the masters. This setup provides redundancy, fault tolerance, and improved write performance. However, it can lead to increased complexity in managing potential conflicts and ensuring consistency between the masters.


// Partitioning in MySQL is a technique for dividing a huge table into smaller, more manageable sections based on a partitioning key in order to enhance query performance and manageability, particularly for large datasets. There are various partitioning techniques available such as range, list, hash, or key partitioning.


// Sharding in MySQL is a technique used to distribute data across multiple servers, based on a shared key, to improve scalability and performance. Each server stores a subset of the data, and queries are routed to the appropriate server based on the shard key. To implement sharding in MySQL, you can use third-party tools or build your own solution.


// Microtasks (like process.nextTick and Promise.then) are executed immediately after the currently executing script completes, but before the event loop continues.
// Macrotasks (like setTimeout, setInterval, and setImmediate) are executed in their respective phases of the event loop, after all microtasks have been processed.

// Aggregation operations process multiple documents and return computed results. You can use aggregation operations to:

// Group values from multiple documents together.

// Perform operations on the grouped data to return a single result.

// Analyze data changes over time.

// An aggregation pipeline consists of one or more stages that process documents:

// Each stage performs an operation on the input documents. For example, a stage can filter documents, group documents, and calculate values.

// The documents that are output from a stage are passed to the next stage.

// db.orders.aggregate([
//   {
//     $lookup: {
//       from: "customers",        // The collection to join with (first join)
//       localField: "customer_id", // The field from the orders collection
//       foreignField: "_id",       // The field from the customers collection
//       as: "customerDetails"      // The name of the new array field to add the matched documents
//     }
//   },
//   {
//     $unwind: "$customerDetails"  // Deconstructs the array field from the input documents to output a document for each element
//   },
//   {
//     $lookup: {
//       from: "products",          // The collection to join with (second join)
//       localField: "product_id",   // The field from the orders collection
//       foreignField: "_id",        // The field from the products collection
//       as: "productDetails"        // The name of the new array field to add the matched documents
//     }
//   },
//   {
//     $unwind: "$productDetails"   // Deconstructs the array field from the input documents to output a document for each element
//   }
// ]);

// {
//   "_id": 1,
//   "product_id": 101,
//   "customer_id": 1,
//   "quantity": 2,
//   "customerDetails": { "_id": 1, "name": "Alice", "email": "alice@example.com" },
//   "productDetails": { "_id": 101, "name": "Laptop", "price": 800 }
// }
// {
//   "_id": 2,
//   "product_id": 102,
//   "customer_id": 2,
//   "quantity": 1,
//   "customerDetails": { "_id": 2, "name": "Bob", "email": "bob@example.com" },
//   "productDetails": { "_id": 102, "name": "Phone", "price": 500 }
// }
// {
//   "_id": 3,
//   "product_id": 103,
//   "customer_id": 1,
//   "quantity": 3,
//   "customerDetails": { "_id": 1, "name": "Alice", "email": "alice@example.com" },
//   "productDetails": { "_id": 103, "name": "Tablet", "price": 300 }
// }


// Order.find()
//   .populate('customer_id')
//   .populate('product_id')
//   .exec((err, orders) => {
//     if (err) {
//       console.error(err);
//       return;
//     }
//     console.log(orders);
//   });

// [
//   {
//     "_id": "60d21b4967d0d8992e610c85",
//     "product_id": {
//       "_id": "60d21b4667d0d8992e610c82",
//       "name": "Laptop",
//       "price": 800
//     },
//     "customer_id": {
//       "_id": "60d21b4467d0d8992e610c80",
//       "name": "Alice",
//       "email": "alice@example.com"
//     },
//     "quantity": 2
//   },
//   {
//     "_id": "60d21b4967d0d8992e610c86",
//     "product_id": {
//       "_id": "60d21b4667d0d8992e610c83",
//       "name": "Phone",
//       "price": 500
//     },
//     "customer_id": {
//       "_id": "60d21b4467d0d8992e610c81",
//       "name": "Bob",
//       "email": "bob@example.com"
//     },
//     "quantity": 1
//   }
// ]

// Order.find({}, 'quantity orderDate') // Select specific fields from the orders collection
//   .populate({
//     path: 'customer_id',
//     select: 'name email', // Select specific fields from the customers collection
//     populate: {
//       path: 'address_id',
//       select: 'street city zip' // Select specific fields from the addresses collection
//     }
//   })
//   .populate({
//     path: 'product_id',
//     select: 'name price' // Select specific fields from the products collection
//   })
//   .exec((err, orders) => {
//     if (err) {
//       console.error(err);
//       return;
//     }
//     console.log(orders);
//   });
// Interceptors: Modify HTTP requests and responses globally.
// Guards: Control access to routes based on conditions.
// Pipes: Transform data in templates for display purposes.
//   Directives: Add custom behavior to DOM elements, either by manipulating the DOM structure or by altering element properties and styles.

//   Definition: Directives are classes that add behavior to elements in the Angular application.They can be categorized into three types: structural, attribute, and custom.

  // statusCode and error code (200,401,503 AND ERR001,INVALID_PARAMETER)
// put and patch
// The PATCH method is used to partially update a resource. When you send a PATCH request, you only send the fields you want to update, and the server only updates those specific fields, leaving the rest of the resource unchanged.

// PUT updates the entire resource, replacing it with the new resource provided.
// PATCH updates only the specified fields in the resource.

// WebSockets do not have built-in support for automatic reconnection. Developers need to implement their own reconnection logic.
// Socket.IO has built-in support for automatic reconnection, including configurable options for reconnection attempts, delays, and exponential backoff.
// in websocket implementing message broadcasting to multiple clients and organizing clients into groups (rooms) requires additional effort
//  Socket.IO provides built-in support for broadcasting messages to all clients or to specific rooms, simplifying the implementation of group messaging and chat applications.
//  WebSockets provide a simple, low-level API with basic message handling, requiring developers to implement their own event system.
// Socket.IO offers an event-based communication model out of the box, making it easier to handle different types of messages and events.
// socketIo
// WebSocket is a protocol that provides full-duplex communication channels over a single TCP connection. It is designed to be a more efficient alternative to HTTP for real-time communication.
//     Full-Duplex Communication: Both client and server can send and receive messages simultaneously.
// Persistent Connection: Once established, the connection remains open, allowing for real-time data exchange.
// Low Latency: Because the connection stays open, there is less overhead in establishing connections, leading to faster communication.
// Binary and Text Data: WebSockets can transmit both binary and text data, making them versatile for various types of real - time applications.
  
//   Use Cases:
// Real-time chat applications
// Online gaming
// Real-time notifications
// Live streaming

// Socket.IO is a library that enables real - time, bidirectional, and event - based communication between web clients and servers.It is built on top of WebSocket but provides additional features and fallbacks for environments where WebSocket is not supported.
//   const io = require('socket.io')(3000);

// io.on('connection', (socket) => {
//   console.log('a user connected');

//   socket.on('message', (msg) => {
//     console.log('message received:', msg);
//     // Broadcast the message to all connected clients
//     io.emit('message', msg);
//   });

//   socket.on('disconnect', () => {
//     console.log('user disconnected');
//   });
// });

//   Event-Based Communication: Socket.IO uses an event-driven model, making it easier to handle complex interactions.
// Automatic Reconnection: If the connection drops, Socket.IO will automatically attempt to reconnect.
// Fallback Mechanisms: If WebSocket is not available, Socket.IO will fall back to other techniques such as long polling.
// Long polling is a useful technique for maintaining a real-time connection when other options are not available,
// Rooms and Namespaces: These features allow for better organization and management of connections and events.
// Cross-Browser Compatibility: Socket.IO ensures that your real-time application works across various browsers and network conditions.
// Example Use Cases:
// Real-time chat applications
// Collaborative document editing
// Real-time analytics
// Multiplayer online games
// eventEmitter
// EventEmitter is a core module in Node.js that provides a way to handle asynchronous events. It is a class that is part of the events module/
// const EventEmitter = require('events');
// const myEmitter = new EventEmitter();
// myEmitter.on('event', () => {
//   console.log('An event occurred!');
// });
// myEmitter.emit('event');

// promise and observable
// setImmediate(macrotask) and process.nextTick(microtask)
// promise.all and promise.allSettled
// stored procedure and viwes

// Views can encapsulate complex queries, making it easier to work with data without needing to rewrite those complex queries repeatedly.
// For example, if you frequently need to join several tables and filter data, you can create a view that handles this logic.
// Consistency and Reusability:
// By using views, you ensure that complex logic is defined in one place and reused wherever needed, promoting consistency across the application.
// Views also make it easier to manage and maintain SQL queries.
// Views can help manage derived data or aggregated information more efficiently.For example, you can create a view to show the average sales per region based on a sales table.

// Views can abstract the underlying table structures. This means that if the schema of the underlying tables changes, the view can be updated to reflect these changes without affecting the end users or applications relying on the view.
// CREATE Proc findDetails // alter and drop we can also used
// @emp_id INTEGER;
// @name varchar(20)

// with encryption
// AS
// BEGIN
// SELECT * FROM employee WHERE id = @emap_id;
// SELECT * FROM employee WHERE name = @name;
// END

// call stored procedure
// findDetails 2, 'lol';
// OR
// execute findDetails 2, 'lol'
// OR
// exec findDetails 2, 'lol'
// trigger
// in mongodb we have two types of trigger (database trigger and scheduled trigger) in atlas provided
// database trigger will execute at real time when we perform database operation ( insert docement,update docement,delete docement, replace docement) with collection.
// example -- sending mails to user when he creates an order.
// scheduled trigger will execute at specefic time or in a interval of time.
//  example ---trigger a function that will move orders older than one year to the archived_orders collection:

  // Calculate the date one year ago from today
  // const oneYearAgo = new Date();
//   oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

//   // Find orders older than one year
//   const oldOrders = await ordersCollection.find({ orderDate: { $lt: oneYearAgo } }).toArray();

//   if (oldOrders.length > 0) {
//     // Insert old orders into the archived_orders collection
//     await archivedOrdersCollection.insertMany(oldOrders);

//     // Remove old orders from the orders collection
//     await ordersCollection.deleteMany({ orderDate: { $lt: oneYearAgo } });
//   }

//   console.log(`Archived ${oldOrders.length} orders`);
// };

// trigger in mysql
// before INSERT
// after INSERT
// before update
// after update
// before delete
// after delete

// DELIMITER//
// CREATE TRIGGER after_user_insert AFTER INSERT
// on user
// FOR EACH ROW
// BIGIN
// INSERT INTO new_user(new_user_id)values(new.id);
// END
// DELEMITER;

// DELEMITER//
// CREATE TRIGGER before_user_update BEFORE UPDATE
// on user
// FOR EACH ROW
// BEGIN
// INSERT INTO user_log(name, email, phone) values(old.name, old.email, old.phone);
// END
// DELEMITER;

// DELEMITER//
// CREATE TRIGGER before_user_update BEFORE UPDATE
// on user
// FOR EACH ROW FOLLOW before_user_update1
// BEGIN
// INSERT INTO user_log(name, email, phone) values(old.name, old.email, old.phone);
// END
// DELEMITER;


// SELECT * FROM information_schema.TRIGGERS where TRIGGER_SCHEMA = 'databaseName'

// SHOW TRIGGERS;
  
// DROP TRIGGER databaseName.triggerName
const original = { a: 1, b: 2, c: { d: 3 } };
const shallowCopy = {};

for (let key in original) {
  if (original.hasOwnProperty(key)) {
    shallowCopy[key] = original[key];
  }
}

console.log(shallowCopy);  // Output: { a: 1, b: 2, c: { d: 3 } }
shallowCopy.c.d = 4;
console.log(original.c.d); // Output: 4  (because it's a shallow copy)

const originalArray = [1, 2, 3, [4, 5]];
const shallowCopyArray = [];

for (let i = 0; i < originalArray.length; i++) {
  shallowCopyArray[i] = originalArray[i];
}

console.log(shallowCopyArray);  // Output: [1, 2, 3, [4, 5]]
shallowCopyArray[3][0] = 6;
console.log(originalArray[3][0]); // Output: 6 (because it's a shallow copy)

// const original = { a: 1, b: 2, c: { d: 3 } };

// function deepCopy(obj) {
//   let copy = Array.isArray(obj) ? [] : {};
  
//   for (let key in obj) {
//     if (obj.hasOwnProperty(key)) {
//       if (typeof obj[key] === 'object' && obj[key] !== null) {
//         copy[key] = deepCopy(obj[key]);  // Recursive call
//       } else {
//         copy[key] = obj[key];
//       }
//     }
//   }
  
//   return copy;
// }

// const deepCopyObject = deepCopy(original);

// console.log(deepCopyObject);  // Output: { a: 1, b: 2, c: { d: 3 } }
// deepCopyObject.c.d = 4;
// console.log(original.c.d);    // Output: 3 (original object remains unchanged)


// const originalArray = [1, 2, 3, [4, 5]];

// function deepCopyArray(arr) {
//   let copy = [];

//   for (let i = 0; i < arr.length; i++) {
//     if (Array.isArray(arr[i])) {
//       copy[i] = deepCopyArray(arr[i]);  // Recursive call
//     } else if (typeof arr[i] === 'object' && arr[i] !== null) {
//       copy[i] = deepCopy(arr[i]);
//     } else {
//       copy[i] = arr[i];
//     }
//   }

//   return copy;
// }

const deepCopyArrayResult = deepCopyArray(originalArray);

console.log(deepCopyArrayResult);  // Output: [1, 2, 3, [4, 5]]
deepCopyArrayResult[3][0] = 6;
console.log(originalArray[3][0]);  // Output: 4 (original array remains unchanged)

// Shallow Copy: Copies top-level properties only. Nested objects or arrays are not duplicated, just referenced.
// Deep Copy: Recursively copies all properties and elements, including nested objects or arrays.

  // Dos Attack:- in this one attacker send 100 and 1000 of request to the server and server is busy to respond to the request of actual client
  // DDOS Attack: - in this not limited to on attacker it will attack from multiple machine from different location same as DOS attack.
  
  // brute Froce Attack: - in this attacker use huge amount of combination of email and password from dictionary and requst is continue until one is succeded

  // Prevented by 
// captcha
  // rate limiter

// assoication in sequelize
// Define the associations
// A one-to-many relationship means a single record in one table is associated with multiple records in another table. Conversely, many-to-one means multiple records in one table are associated with a single record in another table.
// A many-to-many relationship means that multiple records in one table are associated with multiple records in another table. This is typically implemented with a join table.

// The HasOne association
// The BelongsTo association
// The HasMany association
// The BelongsToMany association

// To create a One-To-One relationship, the hasOne and belongsTo associations are used together;
// To create a One-To-Many relationship, the hasMany and belongsTo associations are used together;
// To create a Many-To-Many relationship, two belongsToMany calls are used together


User.hasMany(Post, { foreignKey: 'userId' }); // One-to-Many
Post.belongsTo(User, { foreignKey: 'userId' }); // Many-to-One

Student.belongsToMany(Course, { through: Enrollment });
Course.belongsToMany(Student, { through: Enrollment });

// set and get in sequelize
// const User = sequelize.define('user', {
  
//   username: {
//     type: DataTypes.STRING,
//     get() {
//       const rawValue = this.getDataValue('username');
//       return rawValue ? rawValue.toUpperCase() : null;
//     },
//   },
// });

// const User = sequelize.define('user', {
//   username: DataTypes.STRING,
//   password: {
//     type: DataTypes.STRING,
//     set(value) {
//       // Storing passwords in plaintext in the database is terrible.
//       // Hashing the value with an appropriate cryptographic hash function is better.
//       this.setDataValue('password', hash(value));
//     },
//   },
// });

// const { DataTypes } = require('sequelize');

// const User = sequelize.define('user', {
//   firstName: DataTypes.TEXT,
//   lastName: DataTypes.TEXT,
//   fullName: {
//     type: DataTypes.VIRTUAL,
//     get() {
//       return `${this.firstName} ${this.lastName}`;
//     },
//     set(value) {
//       throw new Error('Do not try to set the `fullName` value!');
//     },
//   },
// });
// dialectOptions: { multipleStatements: true }
  const sql = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL
      );
      CREATE TABLE IF NOT EXISTS posts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        userId INT,
        content TEXT,
        FOREIGN KEY (userId) REFERENCES users(id)
      );
    `;

// advantage of test case
// Bug Detection: Test cases help identify bugs and issues early in the development process, reducing the cost and effort needed for fixing them later.
// Self - Documenting Code: Well - written test cases serve as documentation for the codebase, explaining how different parts of the application are supposed to work.

// we can identify the requirements and expected behavior of the application and API
// Easier Maintenance: Test cases make it easier to maintain and update the codebase by ensuring that changes do not introduce new bugs.

// {
//       "name":"2222",
//     "email":"p2p@gmail.com",
//     "password":"kp",
// hobbies:["cricket","footbal"],
// company:[{id:1,name:"lol",gender:"male"},{id:1,name:"lol",gender:"male"}]
// }
// const userSchema = Joi.object({
//   name: Joi.string().min(3).max(30).required(),
//   email: Joi.string().email().required(),
//   password: Joi.string().min(6).required(),
//   hobbies: Joi.array().items(Joi.string().min(3)).required(),
//   company: Joi.array().items(
//     Joi.object({
//       id: Joi.number().integer().required(),
//       name: Joi.string().min(3).required(),
//       gender: Joi.string().valid('male', 'female', 'other').required()
//     })
//   ).required()
// });


db.dropDatabase();
db.product.drop();
db.product.deleteMany({})

// 11000 errorCode for duplicate key error in mongodb
// Error Code: 1062 in mysql

// db.student.find({age:5})
// db.student.find({age:{$gte:7}})
// db.student.find({age:{$in:[1,7,9]}})
// db.student.find({age:{$nin:[1,7,9]}})
// db.student.find({$and:[{hasMakBook:{$exists:true,$type:"bool"}},{}]})

// in react, a component is a reusable building block for creating user Interface.
// SPA - only content or section will be updated in same page every time without page reload
advantage--
// simple to nuild SPA using comppnents
//it is open source and free to use
//light weight and  very fast (virtual DOM)

disadvantage--
// it is not good choice for small application
// arrow function is concise way of defining a function

// Explanation of Cookie Options

// httpOnly:
// Prevents client-side JavaScript from accessing the cookie.
// Mitigates the risk of XSS attacks.
  
// secure:
// Ensures the cookie is only sent over HTTPS connections.
// Protects against cookie theft over unsecured networks.
// sameSite:

// Helps prevent CSRF(Cross - Site Request Forgery) attacks by controlling whether cookies are sent with cross - site requests.

// Strict: Cookies are only sent in a first-party context and not sent along with requests initiated by third-party websites.
// Lax: Cookies are not sent on cross-site subrequests (e.g., loading images or frames), but are sent when a user navigates to the URL from an external site (e.g., by following a link).
// None: Cookies will be sent in all contexts, i.e., in responses to both first-party and cross-origin requests. Requires the Secure flag to be set.
  // Setting the JWT token in a cookie
    res.cookie('token', token, { 
        httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
        secure: true, // Ensures the cookie is only sent over HTTPS
        sameSite: 'Strict' // Helps prevent CSRF (Cross-Site Request Forgery) attacks
    });

//     const mainString = "Hello, world!";
// const substring = "o, w";

// let found = false;

// for (let i = 0; i <= mainString.length - substring.length; i++) {
//   let match = true;

//   for (let j = 0; j < substring.length; j++) {
//     if (mainString[i + j] !== substring[j]) {
//       match = false;
//       break;
//     }
//   }

//   if (match) {
//     found = true;
//     break;
//   }
// }

// console.log(found); // Output: true

    // Find whether an array is a subset of another array in javascript
// function isSubset(arr1, arr2) {
//     // Ensure arr1 is the larger array and arr2 is the smaller one
//     if (arr1.length < arr2.length) {
//         [arr1, arr2] = [arr2, arr1];
//     }

//     // Create a hash set of elements from the larger array
//     const set = new Set(arr1);

//     // Check if every element in the smaller array is in the hash set
//     for (let elem of arr2) {
//         if (!set.has(elem)) {
//             return false; // If any element is not found, return false
//         }
//     }

//     return true; // All elements found, return true
// }

// // Example usage:
// const array1 = [1, 2, 3, 4, 5];
// const array2 = [2, 4];
// const array3 = [2, 6];

// console.log(isSubset(array1, array2)); // Output: true
// console.log(isSubset(array1, array3)); // Output: false


//     function isSubset(arr1, arr2) {
//     const set2 = new Set(arr2);
//     return arr1.every(element => set2.has(element));
// }

// // Example usage:
// const array1 = [1, 2, 3];
// const array2 = [1, 2, 3, 4, 5];
// const array3 = [1, 6, 3];

// console.log(isSubset(array1, array2)); // true
// console.log(isSubset(array3, array2)); // false


function moveNegativesToOneSide(arr) {
    const result = [];
    let negativeCount = 0;

    // Collect negative elements first
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < 0) {
            result[negativeCount++] = arr[i];
        }
    }

    // Collect non-negative elements
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] >= 0) {
            result[negativeCount++] = arr[i];
        }
    }

    return result;
}

// Example usage:
const array = [1, -2, -3, 4, -5, 6, -7, 8, 9];
console.log(moveNegativesToOneSide(array)); // Output: [-2, -3, -5, -7, 1, 4, 6, 8, 9]



// function kthMinAndMax(arr, k) {
//     if (k <= 0 || k > arr.length) {
//         throw new Error('k is out of bounds');
//     }

//     // Sort the array in ascending order
//     arr.sort((a, b) => a - b);

//     // Kth minimum element (1-based index)
//     const kthMin = arr[k - 1];

//     // Kth maximum element (1-based index)
//     const kthMax = arr[arr.length - k];

//     return { kthMin, kthMax };
// }

// // Example usage:
// const array = [7, 10, 4, 3, 20, 15];
// const k = 3;
// const result = kthMinAndMax(array, k);
// console.log(`The ${k}rd minimum element is ${result.kthMin}`); // Output: 7
// console.log(`The ${k}rd maximum element is ${result.kthMax}`); // Output: 10


// Check if two given strings are isomorphic to each other	in javascript

function areIsomorphic(s, t) {
    if (s.length !== t.length) return false;

    const mapS = {};
    const mapT = {};

    for (let i = 0; i < s.length; i++) {
        const charS = s[i];
        const charT = t[i];

        if (mapS[charS] === undefined && mapT[charT] === undefined) {
            mapS[charS] = charT;
            mapT[charT] = charS;
        } else if (mapS[charS] !== charT || mapT[charT] !== charS) {
            return false;
        }
    }

    return true;
}

// Example usage:
console.log(areIsomorphic("egg", "add")); // true
console.log(areIsomorphic("foo", "bar")); // false
console.log(areIsomorphic("paper", "title")); // true
console.log(areIsomorphic("ab", "aa")); // false

// Recursively remove all adjacent duplicates	
function removeAdjacentDuplicates(s) {
    let stack = [];

    for (let char of s) {
        if (stack.length > 0 && stack[stack.length - 1] === char) {
            // Pop the last character if it's the same as the current one
            stack.pop();
        } else {
            // Push the current character to the stack
            stack.push(char);
        }
    }

    // Join the stack to form the final string without adjacent duplicates
    return stack.join('');
}

// Example usage:
console.log(removeAdjacentDuplicates("abbaca")); // Output: "ca"
console.log(removeAdjacentDuplicates("azxxzy")); // Output: "ay"
console.log(removeAdjacentDuplicates("aabcca")); // Output: "bcca"
console.log(removeAdjacentDuplicates("aaaa")); // Output: ""


// Find the first repeated word in string.	in javascript


function findFirstRepeatedWord(str) {
    const words = str.split(/\s+/); // Split the string into words by whitespace
    const seen = new Set();

    for (let word of words) {
        if (seen.has(word)) {
            return word; // Return the first repeated word
        }
        seen.add(word);
    }

    return null; // Return null if no word is repeated
}

// Example usage:
console.log(findFirstRepeatedWord("this is a test this")); // Output: "this"
console.log(findFirstRepeatedWord("hello world hello")); // Output: "hello"
console.log(findFirstRepeatedWord("no repeated words here")); // Output: null


// Check whether a String is Palindrome or not in javascript


function isPalindrome(str) {
    // Normalize the string: remove non-alphanumeric characters and convert to lowercase
    const normalizedStr = str.toLowerCase().replace(/[^a-z0-9]/gi, '');

    // Reverse the normalized string
    let reversedStr = '';
    for (let i = normalizedStr.length - 1; i >= 0; i--) {
        reversedStr += normalizedStr[i];
    }

    // Check if the reversed string matches the normalized string
    return normalizedStr === reversedStr;
}

// Example usage:
console.log(isPalindrome("A man, a plan, a canal, Panama")); // Output: true
console.log(isPalindrome("racecar")); // Output: true
console.log(isPalindrome("hello")); // Output: false

// function findNextNumberInSeries(series) {
//     // Calculate the common difference
//     const difference = series[0] - series[1];

//     // Verify if the common difference is consistent
//     for (let i = 1; i < series.length - 1; i++) {
//         if (series[i] - series[i + 1] !== difference) {
//             throw new Error('The series does not have a consistent pattern.');
//         }
//     }

//     // Calculate the next number
//     const nextNumber = series[series.length - 1] - difference;
//     return nextNumber;
// }

// Example usage
// const series = [64, 58, 52, 46];
// const nextNumber = findNextNumberInSeries(series);
// console.log(nextNumber); // Output: 40

// function findNextNumberInSeries(series) {
//     // Calculate the differences between consecutive terms
//     const differences = [];
//     for (let i = 1; i < series.length; i++) {
//         differences.push(series[i] - series[i - 1]);
//     }

//     // Calculate the next difference (which is incremented by 2)
//     const nextDifference = differences[differences.length - 1] + 2;

//     // Calculate the next number in the series
//     const nextNumber = series[series.length - 1] + nextDifference;
//     return nextNumber;
// }

// Example usage
// const series = [2, 6, 12, 20];
// const nextNumber = findNextNumberInSeries(series);
// console.log(nextNumber); // Output: 30

// Type: Does not support declaration merging.

// type Person = {
//     name: string;
// };

// // Error: Duplicate identifier 'Person'.
// type Person = {
//     age: number;
// };
// Interface: Supports declaration merging, where multiple declarations with the same name are merged into a single interface.  

// interface Person {
//     name: string;
// }

// interface Person {
//     age: number;
// }

// // Person is now { name: string; age: number; }
// Interface: Uses extends to extend other interfaces or multiple interfaces.

// how to secure nodejs application please write the best solution
// 1.) Keep Dependencies Up to Date

// Regularly update your Node.js and npm packages to the latest versions. Use tools like npm audit to check for vulnerabilities in your dependencies.
// Avoid using deprecated or unmaintained packages.

//  2.) Use Secure Coding Practices
// Input Validation: Always validate and sanitize user inputs to prevent injection attacks, such as SQL injection or NoSQL injection.
// Escape Output: Escape data before rendering it in the view to prevent Cross-Site Scripting (XSS) attacks.
// Limit Input Size: Set limits on the size of data that users can send to your application to prevent Denial of Service(DoS) attacks.

// 3) Implement Strong Authentication and Authorization
// Use Strong Password Hashing: Use bcrypt or Argon2 for hashing passwords.
// JWT Best Practices: If using JSON Web Tokens (JWT), ensure that they are signed and verified correctly, use short expiration times, and store them securely.
// OAuth2 and OpenID Connect: Use industry-standard authentication protocols for secure login flows.
//   Role - Based Access Control(RBAC): Implement RBAC to control access based on user roles.

  // 4) Use HTTPS
// Always serve your application over HTTPS to ensure data is encrypted in transit.
// Use strong TLS configurations and avoid outdated protocols like SSL 3.0 and TLS 1.0.

// 5) Set Security-Related HTTP Headers
// Helmet: Use the helmet middleware to set various HTTP headers, such as:
// X-Frame-Options to prevent clickjacking.
// X-Content-Type-Options to prevent MIME type sniffing.
// Content Security Policy (CSP) to prevent XSS attacks.
// Strict-Transport-Security (HSTS) to enforce HTTPS.
// Rate Limiting: Implement rate limiting to mitigate brute-force attacks.
//   CORS: Configure CORS policies to restrict resource access based on origin.

  // 6) Protect Against Cross-Site Request Forgery (CSRF)
// Use CSRF protection middleware like csurf to prevent unauthorized commands being executed on behalf of an authenticated user.

//  7) Secure Session Management
// Use secure cookies with the HttpOnly and Secure flags to prevent client-side script access and ensure they are only sent over HTTPS.
// Set session expiration times and regenerate session IDs on critical operations.

// 9) Limit Exposure of Sensitive Data
// Avoid storing sensitive information like API keys, passwords, or database credentials in your source code. Use environment variables or secret management tools.
// Encrypt sensitive data at rest using strong encryption algorithms.
  
//  10) Implement Secure File Uploads
// Restrict the types and sizes of files that can be uploaded.
// Store uploaded files in a location separate from your application's source code and sanitize file names to prevent directory traversal attacks.

// 11) Protect Against Denial of Service (DoS) Attacks
// Implement rate limiting and request throttling.
// Use tools like pm2 or cluster to manage your Node.js processes effectively and distribute load.

//   in mongodb Use Security Middleware

//   const mongoSanitize = require('express-mongo-sanitize');
// app.use(mongoSanitize());

// Use tools like npm audit or Snyk to check for vulnerabilities in your dependencies.
// Most database libraries provide escaping functions.For example, in mysql2, you can use mysql.escape().

// Input Validation and Sanitization
// Always validate and sanitize user inputs to ensure they meet the expected format and content.
// Validation: Use libraries like Joi or validator.js to enforce rules on inputs.

// Avoid Dynamic Query Construction in sql and nosql for preventing ingection attack.

// Sanitization: Strip unwanted characters or escape special characters to prevent injection. Libraries like xss-clean can be used to sanitize input.

// Sanitization: Strip unwanted characters or escape special characters to prevent injection. Libraries like xss-clean can be used to sanitize input.

const express = require('express');
const xssClean = require('xss-clean'); // Import xss-clean

const app = express();

app.use(express.json()); // For parsing application/json
app.use(xssClean()); // Sanitize user input

// Example route to handle user comments
app.post('/submit-comment', (req, res) => {
  const comment = req.body.comment; // User input from the request body

  // After passing through xss-clean, the comment is sanitized
  console.log('Sanitized Comment:', comment);

  // Process the sanitized comment, e.g., save it to the database
  res.send('Comment submitted successfully!');
});

app.listen(3000, () => console.log('Server running on port 3000'));

// How xss-clean Works
// Input Sanitization: When a user submits data (e.g., a comment), xss-clean automatically sanitizes the input by stripping or escaping potentially dangerous characters that could be used in XSS attacks.
// Sanitized Example: If a user tries to submit a comment with malicious content like <script>alert('XSS');</script>, xss-clean will sanitize it, resulting in a safe version, such as &lt;script&gt;alert('XSS');&lt;/script&gt;.

function sanitizeInput(input) {
  return input.replace(/<|>|&|"/g, function (match) {
    switch (match) {
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '&':
        return '&amp;';
      case '"':
        return '&quot;';
      default:
        return match;
    }
  });
}

// const unsafeInput = `<script>alert('XSS');</script>`;
// const safeInput = sanitizeInput(unsafeInput);

// console.log('Sanitized Input:', safeInput); // Output: &lt;script&gt;alert('XSS');&lt;/script&gt;

// When: If your application loads resources from external domains(e.g., scripts, images, fonts) or uses features like inline scripts, you’ll need to customize the CSP to balance security and functionality.

// app.use(helmet.contentSecurityPolicy({
//   directives: {
//     defaultSrc: ["'self'"],
//     scriptSrc: ["'self'", "https://trusted.cdn.com"],
//     objectSrc: ["'none'"],
//     upgradeInsecureRequests: [],
//   },
// }));
// When: If your application needs to interact with resources from different origins(e.g., APIs, fonts, or images), you’ll need to configure CORS headers manually.

// const cors = require('cors');
// app.use(cors({
//   origin: 'https://your-allowed-origin.com',
//   methods: 'GET,POST',
//   allowedHeaders: 'Content-Type,Authorization',
// }));

// helmet is a middleware that helps secure your Express.js applications by setting various HTTP headers automatically. It includes the following protections:

// X-Content-Type-Options: nosniff: Prevents browsers from interpreting files as a different MIME type, which can help mitigate certain types of attacks.
// X-Frame-Options: DENY or SAMEORIGIN: Prevents clickjacking attacks by controlling whether your site can be framed.
// X-XSS-Protection: 0: Disables the buggy cross-site scripting filter in older browsers, which can sometimes cause more harm than good.
// Strict-Transport-Security (HSTS): Enforces HTTPS for your site, telling browsers to only communicate over HTTPS.
// Content Security Policy (CSP): Helps prevent XSS and data injection attacks by specifying what content is allowed to load on your site.
// Expect-CT: Helps prevent the use of misissued certificates by enforcing Certificate Transparency.
//   Referrer - Policy: Controls how much referrer information is sent with requests. 

  // When you set X - Frame - Options: DENY, you're telling web browsers not to allow your website to be displayed inside a frame or iframe, not just on other websites, but also on your own.
  // When you use X-Frame-Options: SAMEORIGIN, you're telling web browsers to allow your website to be displayed inside a frame or iframe, but only if that frame is on the same domain as your website.
  
  // DENY: Completely blocks your site from being framed by any site, including your own. Use this for the highest level of security when framing is not needed.
  // SAMEORIGIN: Allows framing only by pages on the same origin.Use this when you need to allow framing within your own site but want to protect against external clickjacking

  // The Referrer-Policy header controls how much information about the previous page (the referrer) is sent along when a user clicks a link to navigate to another page.

// Why Does This Matter?
// When someone clicks a link on your website, the browser usually sends the URL of the page they came from (the referrer) to the new site. This referrer information can sometimes contain sensitive data, like the specific page they were on or even personal information in the URL.

// Full URL: You can send the full URL of the previous page.
// Just the Domain: You can send only the main part of the URL (e.g., just the domain name).
// Nothing at All: You can choose to send no referrer information.
// By setting the Referrer - Policy, you control what information is shared when users navigate away from your site, helping to protect their privacy.

// ?.: The ?. operator checks if the thing before it exists (is not null or undefined). If it exists, it continues to the next part. If it doesn’t exist, it stops and returns undefined.
// No More Errors: If any part of the chain doesn’t exist, instead of throwing an error, it simply returns undefined.

//  It helps you avoid errors like "Cannot read property 'something' of undefined."

//  with jsx
//  import React from 'react';

// function Greeting() {
//   return (
//     <div>
//       <h1>Hello, World!</h1>
//       <p>Welcome to React with JSX!</p>
//     </div>
//   );
// }

// export default Greeting;

// // without jsx
// import React from 'react';
// import { features } from "process";

// function Greeting() {
//   return React.createElement(
//     'div', 
//     null, 
//     React.createElement('h1', null, 'Hello, World!'),
//     React.createElement('p', null, 'Welcome to React without JSX!')
//   );
// }

// export default Greeting;

// // never

// function throwError(message: string): never {
//   throw new Error(message);
// }

// function infiniteLoop(): never {
//   while (true) {
//     console.log('This will run forever');
//   }
// }

// The unknown type is a safer alternative to any.You can assign any type to unknown, but you must check its type before you can use it.This prevents unintended errors.

// let uncertain: unknown = 'Hello';

// uncertain = 42; // No error
// uncertain = true; // No error

// // To use it, you must narrow down the type first
// if (typeof uncertain === 'string') {
//   console.log(uncertain.toUpperCase()); // Now TypeScript knows it's a string
// } else if (typeof uncertain === 'number') {
//   console.log(uncertain.toFixed(2)); // Now TypeScript knows it's a number
// }


// never: Represents something that never happens (like a function that never returns). It’s useful for functions that throw errors or run indefinitely.
// any: Disables type checking for a variable, allowing it to hold any type. It’s flexible but can lead to runtime errors if misused.
//   unknown: A safer version of any.You can assign anything to it, but you need to check its type before using it, making your code safer and more predictable 


//   es 6 features

//   1. let and const
// 2. Arrow Functions
// 3. Template Literals
// 4. Destructuring Assignment
// 5 spread operator and rest operator

// Write an SQL query to fetch only even rows from the table.
// In case we have an auto-increment field e.g. EmpId then we can simply use the below query-

// SELECT * FROM EmployeeDetails
// WHERE MOD(EmpId, 2) = 0

// Write an SQL query to fetch only odd rows from the table.
// In case we have an auto-increment field e.g. EmpId then we can simply use the below query-

// SELECT * FROM EmployeeDetails
// WHERE MOD (EmpId, 2) <> 0

// Consider a SalesData with columns SaleID, ProductID, RegionID, SaleAmount. Write a query to find the total sales amount for each product in each region.
// The below query sums up SaleAmount for each combination of ProductID and RegionID, giving an insight into the total sales per product per region.

// SELECT ProductID, RegionID, SUM(SaleAmount) AS TotalSales 
// FROM SalesData 
// GROUP BY ProductID, RegionID;


// Write a query to find employees who earn more than their managers.
// Here, we will write a query that joins the EmployeeDetails table with itself to compare the salaries of employees with their respective managers.

// SELECT E.Name AS EmployeeName, 
// M.Name AS ManagerName, 
// E.Salary AS EmployeeSalary, 
// M.Salary AS ManagerSalary 
// FROM EmployeeDetails E JOIN EmployeeDetails M 
// ON E.ManagerID = M.EmployeeID 
// WHERE E.Salary > M.Salary;

// Consider a BookCheckout table with columns – CheckoutID, MemberID, BookID, CheckoutDate, ReturnDate. Write an SQL query to find the number of books checked out by each member.

// SELECT MemberID, COUNT(*) AS NumberOfBooksCheckedOut 
// FROM BookCheckout 
// GROUP BY MemberID;

// Consider a StudentGrades table with columns – StudentID, CourseID, Grade. Write a query to find students who have scored an ‘A’ in more than three courses.
// Here we will write an SQL query that filters students who have received an ‘A’ grade and groups them by StudentID, counting the number of ‘A’ grades per student.

// SELECT StudentID FROM StudentGrades 
// WHERE Grade = 'A' 
// GROUP BY StudentID 
// HAVING COUNT(*) > 3;

//  Consider a table OrderDetails with columns – OrderID, CustomerID, ProductID, OrderDate, Quantity, Price. Write a query to find the average order value for each customer.
// The below query calculates the average order value (quantity multiplied by price) for each customer.

// SELECT CustomerID, AVG(Quantity * Price) AS AvgOrderValue 
// FROM OrderDetails 
// GROUP BY CustomerID;

// Consider a table PatientVisits with Columns VisitID, PatientID, DoctorID, VisitDate, Diagnosis. Write a query to find the latest visit date for each patient.

// SELECT PatientID, MAX(VisitDate) AS LatestVisitDate 
// FROM PatientVisits 
// GROUP BY PatientID;

// For a table FlightBookings with columns – BookingID, FlightID, PassengerID, BookingDate, TravelDate, Class, write a query to count the number of bookings for each flight class.
// Here, we will write an SQL query that groups the bookings by Class and counts the number of bookings in each class.

// SELECT Class, COUNT(*) AS NumberOfBookings 
// FROM FlightBookings 
// GROUP BY Class;

// Consider a table FoodOrders with columns – OrderID, TableID, MenuItemID, OrderTime, Quantity. Write a query to find the most ordered menu item.
// For the desired output, we will group the orders by MenuItemID and then sort the results by the count in descending order, fetching the top result.

// SELECT MenuItemID 
// FROM FoodOrders 
// GROUP BY MenuItemID 
// ORDER BY COUNT(*) DESC 
// LIMIT 1;


// Consider a table Transactions with columns – TransactionID, CustomerID, ProductID, TransactionDate, Amount. Write a query to find the total transaction amount for each month.
// The below query sums the Amount for each month, giving a monthly total transaction amount.

// SELECT MONTH(TransactionDate) AS Month, 
// SUM(Amount) AS TotalAmount 
// FROM Transactions 
// GROUP BY MONTH(TransactionDate);

// Consider a table EmployeeAttendance with columns – AttendanceID, EmployeeID, Date, Status. Write a query to find employees with more than 5 absences in a month.
// This query filters the records for absent status, groups them by EmployeeID and month, and counts absences, filtering for more than 5 absences.

// SELECT EmployeeID, 
// MONTH(Date) AS Month, 
// COUNT(*) AS Absences 
// FROM EmployeeAttendance 
// WHERE Status = 'Absent' 
// GROUP BY EmployeeID, MONTH(Date) 
// HAVING COUNT(*) > 5;

// 32. Write an SQL query to fetch duplicate records from EmployeeDetails (without considering the primary key – EmpId).

// SELECT FullName, ManagerId, DateOfJoining, City, COUNT(*)
// FROM EmployeeDetails
// GROUP BY FullName, ManagerId, DateOfJoining, City
// HAVING COUNT(*) > 1;


// 39. Write an SQL query to find the nth highest salary from a table.

// SELECT Salary
// FROM Employee
// ORDER BY Salary DESC LIMIT N-1,1;

//  Write an SQL query to remove duplicates from a table without using a temporary table.
// Here, we can use delete with alias and inner join. We will check for the equality of all the matching records and then remove the row with a higher EmpId.

// DELETE E1 FROM EmployeeDetails E1
// INNER JOIN EmployeeDetails E2 
// WHERE E1.EmpId > E2.EmpId 
// AND E1.FullName = E2.FullName 
// AND E1.ManagerId = E2.ManagerId
// AND E1.DateOfJoining = E2.DateOfJoining
// AND E1.City = E2.City;

//  Write an SQL query to fetch all the Employees who are also managers from the EmployeeDetails table.

// SELECT DISTINCT E.FullName
// FROM EmployeeDetails E
// INNER JOIN EmployeeDetails M
// ON E.EmpID = M.ManagerID


//  Write a query to fetch employee names and salary records.Display the employee details even if the salary record is not present for the employee.
   
// SELECT E.FullName, S.Salary 
// FROM EmployeeDetails E 
// LEFT JOIN 
// EmployeeSalary S
// ON E.EmpId = S.EmpId;

// Write an SQL query to fetch the project-wise count of employees sorted by project’s count in descending order.
// The query has two requirements – first to fetch the project-wise count and then to sort the result by that count.

// SELECT Project, count(EmpId) EmpProjectCount
// FROM EmployeeSalary
// GROUP BY Project
// ORDER BY EmpProjectCount DESC;

// Write an SQL query to fetch all employee records from the EmployeeDetails table who have a salary record in the EmployeeSalary table.
// Using ‘Exists’-

// SELECT * FROM EmployeeDetails E
// WHERE EXISTS
// (SELECT * FROM EmployeeSalary S 
// WHERE  E.EmpId = S.EmpId);

// Write an SQL query to fetch all the Employee details from the EmployeeDetails table who joined in the Year 2020.
// Using BETWEEN for the date range ’01-01-2020′ AND ’31-12-2020′-

// SELECT * FROM EmployeeDetails
// WHERE DateOfJoining BETWEEN '2020/01/01'
// AND '2020/12/31';

// Also, we can extract the year part from the joining date (using YEAR in MySQL)-

// SELECT * FROM EmployeeDetails 
// WHERE YEAR(DateOfJoining) = '2020';

// Write an SQL query to find the current date-time.
// MySQL-

//   SELECT NOW();


//   Write an SQL query to fetch employee names having a salary greater than or equal to 5000 and less than or equal to 10000.
// Here, we will use BETWEEN in the ‘where’ clause to return the EmpId of the employees with salary satisfying the required criteria and then use it as a subquery to find the fullName of the employee from the EmployeeDetails table.

// SELECT FullName 
// FROM EmployeeDetails 
// WHERE EmpId IN 
// (SELECT EmpId FROM EmployeeSalary 
// WHERE Salary BETWEEN 5000 AND 10000);

// Fetch all the employees who are not working on any project.
// This is one of the very basic interview questions in which the interviewer wants to see if the person knows about the commonly used – Is NULL operator.

// SELECT EmpId 
// FROM EmployeeSalary 
// WHERE Project IS NULL;

//  Write an SQL query to update the employee names by removing leading and trailing spaces.
// Using the ‘Update’ command with the ‘LTRIM’ and ‘RTRIM’ functions.

// UPDATE EmployeeDetails 
// SET FullName = LTRIM(RTRIM(FullName));


//  Write an SQL query to update the employee names by removing leading and trailing spaces.
// Using the ‘Update’ command with the ‘LTRIM’ and ‘RTRIM’ functions.

// UPDATE EmployeeDetails 
// SET FullName = LTRIM(RTRIM(FullName));

// Write an SQL query to find the count of the total occurrences of a particular character – ‘n’ in the FullName field.
// Here, we can use the ‘Length’ function. We can subtract the total length of the FullName field from the length of the FullName after replacing the character – ‘n’.

// SELECT FullName, 
// LENGTH(FullName) - LENGTH(REPLACE(FullName, 'n', ''))
// FROM EmployeeDetails


// Write an SQL query to uppercase the name of the employee and lowercase the city values.
// We can use SQL Upper and Lower functions to achieve the intended results.

// SELECT UPPER(FullName), LOWER(City) 
// FROM EmployeeDetails;


// Write an SQL query to display both the EmpId and ManagerId together.
// Here we can use the CONCAT command.

// SELECT CONCAT(EmpId, ManagerId) as NewId
// FROM EmployeeDetails;

//  Write an SQL query to fetch the employee’s full names and replace the space with ‘-’.
// Using the ‘Replace’ function-

// SELECT REPLACE(FullName, ' ', '-') 
// FROM EmployeeDetails;

// Write an SQL query to fetch the EmpIds that are present in EmployeeDetails but not in EmployeeSalary.
// Using subquery-

// SELECT EmpId FROM 
// EmployeeDetails 
// where EmpId Not IN 
//   (SELECT EmpId FROM EmployeeSalary);

//   Write an SQL query to fetch records that are present in one table but not in another table.

// SELECT EmployeeSalary.*
// FROM EmployeeSalary
// LEFT JOIN
// ManagerSalary USING (EmpId)
// WHERE ManagerSalary.EmpId IS NULL;

//   Write an SQL query to fetch common records between two tables.

// SELECT *
// FROM EmployeeSalary
// WHERE EmpId IN 
//   (SELECT EmpId from ManagerSalary);

//   Write an SQL query to fetch the employees whose name begins with any two characters, followed by a text “hn” and ends with any sequence of characters.

// SELECT FullName
// FROM EmployeeDetails
// WHERE FullName LIKE ‘__hn %’;

// Write an SQL query to display the total salary of each employee adding the Salary with Variable value.

// SELECT EmpId,
// Salary+Variable as TotalSalary 
// FROM EmployeeSalary;


//  Write an SQL query to fetch all those employees who work on Projects other than P1.

// SELECT EmpId
// FROM EmployeeSalary
// WHERE NOT Project='P1';

// Or using the ‘not equal to’ operator-

// SELECT EmpId
// FROM EmployeeSalary
// WHERE Project <> 'P1';

// Write an SQL query to fetch the EmpId and FullName of all the employees working under the Manager with id – ‘986’.

// SELECT  EmpId, FullName
// FROM EmployeeDetails
// WHERE ManagerId = 986;

//  Write an SQL query to fetch the names of workers who earn the highest salary.
//  SELECT FIRST_NAME, SALARY from Worker WHERE SALARY = (SELECT max(SALARY) from Worker);
//  Q-49. Write an SQL query to fetch departments along with the total salaries paid for each of them.
// SELECT DEPARTMENT, sum(Salary) from Worker group by DEPARTMENT;

// Q - 47. Write an SQL query to fetch three min salaries from a table.
// SELECT distinct Salary from Worker a WHERE 3 >= (SELECT count(distinct Salary) from Worker b WHERE a.Salary >= b.Salary) order by a.Salary desc;
// Q-46. Write an SQL query to fetch three max salaries from a table.
// SELECT distinct Salary from Worker a WHERE 3 >= (SELECT count(distinct Salary) from Worker b WHERE a.Salary <= b.Salary) order by a.Salary desc;
// Q-45. Write an SQL query to print the names of employees having the highest salary in each department.
// SELECT t.DEPARTMENT, t.FIRST_NAME, t.Salary from(SELECT max(Salary) as TotalSalary, DEPARTMENT from Worker group by DEPARTMENT) as TempNew Inner Join Worker t on TempNew.DEPARTMENT = t.DEPARTMENT and TempNew.TotalSalary = t.Salary;
// Q-44. Write an SQL query to fetch the last five records from a table.
// -- Solution 1
// SELECT * FROM Worker WHERE WORKER_ID <= 5 UNION SELECT * FROM (SELECT * FROM Worker W ORDER BY W.WORKER_ID DESC) AS W1 WHERE W1.WORKER_ID <= 5;

// -- Solution 2
// SELECT * FROM Worker ORDER BY WORKER_ID DESC LIMIT 5;
// Q-43. Write an SQL query to fetch the first row of a table.
//   Select * from Worker where WORKER_ID = (SELECT min(WORKER_ID) from Worker); 
// Q-42. Write an SQL query to show the last record from a table.
//   Select * from Worker where WORKER_ID = (SELECT max(WORKER_ID) from Worker);
// Q-41. Write an SQL query to show all departments along with the number of people in there.
// SELECT DEPARTMENT, COUNT(DEPARTMENT) as 'Number of Workers' FROM Worker GROUP BY DEPARTMENT;
// Q-40. Write an SQL query to fetch the departments that have less than five people in them.
//   SELECT DEPARTMENT, COUNT(WORKER_ID) as 'Number of Workers' FROM Worker GROUP BY DEPARTMENT HAVING COUNT(WORKER_ID) < 5;
//   Q-39. Write an SQL query to fetch the first 50% of records from a table.
//   SELECT * FROM WORKER WHERE WORKER_ID <= (SELECT count(WORKER_ID) / 2 from Worker);
// Q-37. Write an SQL query to show one row twice in the results from a table.
// SELECT FIRST_NAME, DEPARTMENT from Worker W where W.DEPARTMENT = 'HR' union all select FIRST_NAME, DEPARTMENT from Worker W1 where W1.DEPARTMENT = 'HR';
// Q-36. Write an SQL query to show the second-highest salary from a table.
// SELECT max(Salary) from Worker where Salary not in (Select max(Salary) from Worker);
// Q-35. Write an SQL query to fetch the list of employees with the same salary.
// SELECT distinct W.WORKER_ID, W.FIRST_NAME, W.Salary from Worker W, Worker W1 where W.Salary = W1.Salary and W.WORKER_ID != W1.WORKER_ID;
// Q-34. Write an SQL query to determine the 5th highest salary without using the TOP or limit method.
//   SELECT Salary FROM Worker W1 WHERE 4 = (SELECT COUNT(DISTINCT W2.Salary) FROM Worker W2 WHERE W2.Salary >= W1.Salary);
// Q-33. Write an SQL query to determine the nth (say n=5) highest salary from a table.
// SELECT DISTINCT SALARY
// FROM Worker
// ORDER BY SALARY DESC
// LIMIT 1 OFFSET 4;
// Q-29. Write an SQL query to fetch intersecting records of two tables.
//   SELECT * FROM Worker INTERSECT SELECT * FROM WorkerClone;
// Q-28. Write an SQL query to clone a new table from another table.
// CREATE TABLE WorkerClone AS SELECT * FROM Worker;
// Q-24. Write an SQL query to print details of the Workers who are also Managers.
// Q-23. Write an SQL query to fetch the number of workers for each department in descending order.
// SELECT DEPARTMENT, count(WORKER_ID) No_Of_Workers FROM Worker GROUP BY DEPARTMENT ORDER BY No_Of_Workers DESC;
// Q-14. Write an SQL query to print details of workers excluding first names, “Vipul” and “Satish” from the Worker table.
//   Select * from Worker where FIRST_NAME not in ('Vipul', 'Satish');
// Q-12. Write an SQL query to print all Worker details from the Worker table order by FIRST_NAME Ascending and DEPARTMENT Descending.
//   Select * from Worker order by FIRST_NAME asc, DEPARTMENT desc;
// Q-8. Write an SQL query that fetches the unique values of DEPARTMENT from the Worker table and prints its length.
// SELECT DISTINCT DEPARTMENT, LENGTH(DEPARTMENT) AS Department_Length FROM Worker;
// Q-4. Write an SQL query to print the first three characters of  FIRST_NAME from the Worker table.
// Select substring(FIRST_NAME, 1, 3) from Worker;
// Q-5. Write an SQL query to find the position of the alphabet (‘a’) in the first name column ‘Amitabh’ from the Worker table.
// SELECT INSTR(FIRST_NAME, 'a') FROM Worker WHERE FIRST_NAME = 'Amitabh';
// Q-2. Write an SQL query to fetch “FIRST_NAME” from the Worker table in upper case.
// Select upper(FIRST_NAME) from Worker;

// Definition: A DBMS is software that allows users to create, retrieve, update, and manage data in a database.It can manage data in various formats, including hierarchical, network, or object - oriented.
//   Definition: An RDBMS is a type of DBMS that stores data in a tabular form and maintains relationships between the data using foreign keys.It is based on the relational model proposed by E.F.Codd. 
//   Definition: SQL is a standard programming language specifically designed for managing and manipulating relational databases.It is used for querying, updating, and managing data stored in databases.
//   Definition: MySQL is a relational database management system(RDBMS) that uses SQL as its primary query language.It is an open - source software used for managing databases.
  
//     5. List all joins supported in SQL. 
// INNER JOIN

// LEFT JOIN

// RIGHT JOIN

// FULL JOIN

// CROSS JOIN

