# MongoDB Notes

## MongoDB Introduction

MongoDB is a NoSQL database that can manage alot of data. It is a document-based database, which means that it stores data in JSON-like documents.
NoSQL means not only SQL.
Mongodb stores data using the Binary Javascript Object Notation (JSON) format.
Binary Javascript Object Notion is a lightweight data interchange format that is easy for humans to read and write.

## Creating a new connection

To create a new connection to the localhost MongoDB database, you can use the following url: mongodb://localhost:27017
C:\Users\Frizz\Documents\programs\mongosh-2.3.3-win32-x64\bin\mongosh.exe

## MongoDB Commands

### show all databases

```bash
show dbs
```

### use a database

```bash
use admin
```

### create a database

Lets create a school database

```bash
use school
```

### add a collection to our school database

```bash
use school
db.createCollection("students")
```

### Delete/Drop our current database

```bash
db.dropDatabase()
```

### insert data to a collection

```bash
use school
db.students.insertOne({name:'aelin', age:18, gpa:3.2})
```

### return all documents/objects in a collection

```bash
db.students.find()
```

### inserting many objects/documents in a collection

```bash
db.students.insertMany([
    {
        name:'Aedolin',
        age:23,
        gpa:4.0
    },
    {
        name:'Patrick',
        age:38,
        gpa:3.4
    },
    {
        name:'Sandy',
        age:28,
        gpa:4.3
    }
])
```

### Sorting Documents/Objects in some sort of order

we use 1 for ascending/alphabetical sorting and -1 descending/reverse alphabetical sorting

```bash

db.students.find().sort({age:1})
db.students.find().sort({name:1})
db.students.find().sort({name:-1})

```

### Limit the number of documents returned to us

```bash
db.students.find().limit(1)
db.students.find().limit(1)
db.students.find().sort({name:1}).limit(3)
```

### Get the student with the lowest gpa

```bash
db.students.find().sort({gpa:1}).limit(1)
```

### Return the documents where name is Aelin

```bash
db.students.find({name:"Aelin"})
```

### Filtering using two fields

```bash
db.students.find({name:"Aelin",gpa:4.0})
```

### The projection parameter

.find({query,{projection}})
if you dont spectify the query parameter, it returns all objects
projection => used to return spectific fields

Returns all objects but with only the name fields

```bash
db.students.find({},{name:true})
db.students.find({},{_id:false,name:true})
```

### updating documents

db.students.updateOne(filter, update)
filter => which one to update
update => what to update

```bash
db.students.updateOne({name:"Patrick"},{$set:{name:'Lochan'}})
db.students.updateOne({id:'6732fb635d4d6411350d8193',{$set:{name:'Lochan'}}})
```

### Update Many

adding the fulltime field to each student

```bash
db.students.updateMany({},{$set:{fulltime:true}})
```

### Checking if a field exists or not

Checking if the students has a house field
Returns all the students that dont have a house field

```bash
db.students.updateMany({house:{$exists:false}})
```

### Deleting Documents/Objects

db.students.deleteOne({filter})
db.students.deleteOne({filter})

```bash
db.students.deleteOne({name:'Larry'})
db.students.deleteMany({fulltime:false})
db.students.deleteMany({})
```

### Deleting any document that is missing a registration date

```bash
db.students.deleteMany({registration:{$exists:false}})
```

### Comparison Operators

Comparison Operators return data based on value Comparisons

find everybody but not Aelin

```bash

db.students.find({name:{$ne:"Aelin"}})

```

### Less Than or Less Than equal to

```bash

db.students.find({age:{$lt:18}})
db.student.find({age:{$lte:27}})
```

### Greater Than or Greater Than Equal to

```bash
db.students.find({age:{$gt:18}})
db.students.find({age:{$gte:30}})
```

### Getting all students that have a gpa between 3.5 and 4

```bash
db.students.find({gpa:{$gte:3, $lte:4}})
```

### Getting all the students that are in the array

```bash
db.students.find({name:{$in:['Rowan','Aelin','Aedolin']}})
```

### Getting all the students that are not in the array

```bash
db.students.find({name:{$nin:['Rowan','Aelin','Aedolin']}})
```

### Logical Operators

1. $and
2. $not
3. $nor
4. $or

```bash
db.students.find({$and:[{fulltime:true},{age:{$lte:22}}]}) //both conditions have to be true
db.students.find({$or:[{fulltime:true},{age:{$lte:22}}]}) //one condition has to be true
db.students.find({$nor:[{fulltime:true},{age:{$lte:22}}]}) //both conditions have to be false
db.students.find({age:{$not:{$gte:30}}}) //give me all the students that is not greater than or equal to 30 => gives you even null values

```

### Getting the execution stats of a query

```bash
db.students.find({name:"Larry"}).explain("executionStats")

```

### Indexes

Indexing is created automatically for the id field
if your database is more concerned about searches than insertion and updating you can add indexes for quick lookups
Here is the code do that:

```bash
db.students.createIndex({name:1})

```

### Getting all the indexes

```bash
db.students.getIndexes()
```

### deleting or droping indexes

```bash
db.students.dropIndex("name_1")
```

### Showing all the collections

```bash
show collections
```

### Showing all the collections

```bash
show collections
```

### Creating a new collection

```bash
db.createCollection('teachers')
```
