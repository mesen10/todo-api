# TODO Item Application
Sample TODO Item Application written with Node.js

## Getting Started
1. First, clone the repository to your local machine and navigate into the folder. For example:

```bash
git clone https://github.com/mesen10/todo-api
cd todo-api
```
2. Second, install all the dependencies:

```bash
yarn
```

3. Edit your environment variables

You don't need to set any environment variable. The server will start with an in-memory database.
If you set `process.env.NODE_ENV` to any value other than `development` then the server will try to connect a real MongoDB.

4. Then run the development server:

```bash
yarn dev
# or
npm run dev
```

You can use a PostMan collection or curl command.

5. Create a new logically-named branch. For example:

```bash
git checkout -b user-role-enhancements
```

6. Push your changes to GitHub and create a PR against the master branch, linking the PR to any relevant issues.

##Sample requests & responses
###Post http://localhost:3000/item
`{
"name": "Item 10"
}`

Creates a TODO item with name `Item 10` and returns
<pre>{
    _id: "612427cf5e3e49c6468eeead",
    name: "Item 10",
    status: "INCOMPLETE",
    createdAt: "2021-08-24T07:57:19.522Z",
    updatedAt: "2021-08-24T07:57:19.522Z",
    __v: 0,
}</pre>

### Patch http://localhost:3000/item/612427cf5e3e49c6468eeead
`{
"status": "COMPLETED"
}` or `{
"status": "INCOMPLETE"
}`

Updates the TODO item status and returns in payload. (Updates the updatedAt field)
<pre>{
    _id: "612427cf5e3e49c6468eeead",
    name: "Item 10",
    status: "COMPLETED",
    createdAt: "2021-08-24T07:57:19.522Z",
    updatedAt: "2021-08-24T07:58:11.522Z",
    __v: 0,
}</pre>

### Delete http://localhost:3000/item/612427cf5e3e49c6468eeead

Deletes the item and returns 204 response code


### Get Items http://localhost:3000/item
Returns all items in the database
<pre>
[{
  _id: "612427cf5e3e49c6468eeead",
  name: "Item 1",
  status: "INCOMPLETE",
  createdAt: "2021-08-24T07:57:19.522Z",
  updatedAt: "2021-08-24T07:57:19.522Z",
  __v: 0,
}, {
  _id: "612427d75e3e49c6468eeeaf",
  name: "Item 2",
  status: "COMPLETED",
  createdAt: "2021-08-24T07:57:27.493Z",
  updatedAt: "2021-08-24T07:59:11.222Z",
  __v: 0,
}]
</pre>

#### Get Items http://localhost:3000/item?status=INCOMPLETE
This filters the TODO items by INCOMPLETE status

#### Get Items http://localhost:3000/item?status=COMPLETED
This filters the TODO items by COMPLETED status
