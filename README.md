[youtube](https://www.youtube.com/watch?v=XQHz9CnHeMs&list=PLFsTDfETmB8YW5qzE6OZRumORvTwkAgvv&index=2)

[react](https://legacy.reactjs.org/docs/create-a-new-react-app.html)

[@apollo/react-hooks](https://www.npmjs.com/package/@apollo/react-hooks)


# بسم الله الرحمن الرحيم

```shell
npx create-react-app my-app
# npm install apollo-boost react-apollo graphql --save
# npm install apollo-boost graphql --save
```

```shell
npm install @apollo/react-hooks
```


```jsx
// src/Components/BooksComponents
import { useState } from "react";
function BooksComponents() {
    const mySubmit = (e) => {
        e.preventDefault();
    }
    const [formData, setFormData] = useState({
        title: null,
        year: null,
        number_of_page: null,
        author_id: null
    });
    return (
        <div>
            <ul>
                <li>hello</li>
                <li>hello</li>
                <li>hello</li>
            </ul>

            <form onSubmit={(e) => {
                mySubmit(e);
            }}>
                <input onChange={(e) => {
                    setFormData({
                        ...formData,
                        title: e.target.value
                    })
                }} required type="text" placeholder='Title' />
                <input onChange={(e) => {
                    setFormData({
                        ...formData,
                        year: e.target.value
                    })
                }} required type="text" placeholder='Year' />
                <input onChange={(e) => {
                    setFormData({
                        ...formData,
                        number_of_page: e.target.value
                    })
                }} required type="text" placeholder='Number Of Page' />
                <select required value={formData.author_id || ''}
                    onChange={(e) => {
                        setFormData({
                            ...formData,
                            author_id: e.target.value
                        })
                    }}
                >
                    <option disabled value=''>SELECT AUTHOR</option>
                    <option value='1'>aaaa</option>
                    <option value='2'>bbb</option>
                </select>
                <input type="submit" value="Create" />
            </form>
        </div>
    )
}

export default BooksComponents
```


```jsx
import BooksComponents from './Components/BooksComponents';
function App() {
  return (
    <div>
        <BooksComponents />
    </div>
  );
}
export default App;
```




# query 

```jsx
// -------------- import ----------------
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
const client = new ApolloClient({
  uri: 'http://laravel_graphql.test/graphql',
  cache: new InMemoryCache(),
});
// --------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* --------------- here --------------- */}
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,

    {/* ------------------------------------ */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```






```jsx
import { useState } from "react";

// =========== here ===============
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
const BOOKS_QUERY = gql`
{
    myBooksQuary{
        id
        title
        year
        number_of_page
    }
}
`
const AUTHOR_QUERY = gql`{
    myAuthorsQuery {
        id
        name
        age
    }
}
`
// ==============================

function BooksComponents() {
    const mySubmit = (e) => {
        e.preventDefault();
    }
    const [formData, setFormData] = useState({
        title: null,
        year: null,
        number_of_page: null,
        author_id: null
    });

    // =========== here ===============
    // const {data:dataBook,error:errorBook} = useQuery(BOOKS_QUERY)
    // const {data:dataAuthor,error:errorAuthor} = useQuery(AUTHOR_QUERY)
    const books = useQuery(BOOKS_QUERY);
    const authors = useQuery(AUTHOR_QUERY);
    // ==============================
    return (
        <div>
            <ul>
                {/* =========== here =============== */}
                {
                    books.data != undefined && 
                    books.data.myBooksQuary.map((item, key) => {
                        return (
                            <li key={key}>
                                {item.title}
                            </li>
                        )
                    })
                }
                {/* ============================== */}
            </ul>

            <form onSubmit={(e) => {
                mySubmit(e);
            }}>
                <input onChange={(e) => {
                    setFormData({
                        ...formData,
                        title: e.target.value
                    })
                }} required type="text" placeholder='Title' />
                <input onChange={(e) => {
                    setFormData({
                        ...formData,
                        year: parseInt(e.target.value)
                    })
                }} required type="text" placeholder='Year' />
                <input onChange={(e) => {
                    setFormData({
                        ...formData,
                        number_of_page: parseInt(e.target.value)
                    })
                }} required type="text" placeholder='Number Of Page' />
                <select required value={formData.author_id || ''}
                    onChange={(e) => {
                        setFormData({
                            ...formData,
                            author_id: parseInt(e.target.value)
                        })
                    }}
                >
                    <option disabled value=''>SELECT AUTHOR</option>
                    {/* =========== here =============== */}
                    {
                        authors.data != undefined && 
                        authors.data.myAuthorsQuery.map((item, key) => {
                            return (
                                <option value={item.id} key={key}>
                                    {item.name}
                                </option>
                            )
                        })
                    }
                    {/* ============================== */}
                </select>
                <input type="submit" value="Create" />
            </form>
        </div>
    )
}

export default BooksComponents
```



## Mutation


```jsx
import { useState } from "react";


import { gql } from 'apollo-boost';
import { useMutation, useQuery } from '@apollo/react-hooks';
const BOOKS_QUERY = gql`
{
    myBooksQuary{
        id
        title
        year
        number_of_page
    }
}
`
const AUTHOR_QUERY = gql`{
    myAuthorsQuery {
        id
        name
        age
    }
}
`
// =========== here ===============
const ADD_BOOK = gql`
  mutation($title: String, $year: Int, $number_of_page: Int, $author_id: Int) {
    CreateMyBook(title: $title, year: $year, number_of_page: $number_of_page, author_id: $author_id) {
      id
      title
    }
  }
`;
// ==============================


function BooksComponents() {
    // =========== here ===============
    const [addbook,{data,error}] = useMutation(ADD_BOOK);
    // ==============================

    const mySubmit = (e) => {
        e.preventDefault();
        // =========== here ===============
        addbook({
            variables :{
                ...formData
            },
            refetchQueries:[
                {query: BOOKS_QUERY}
            ]
        })
        // ==============================
    }
    const [formData, setFormData] = useState({
        title: null,
        year: null,
        number_of_page: null,
        author_id: null
    });
    const books = useQuery(BOOKS_QUERY);
    const authors = useQuery(AUTHOR_QUERY);
    


    return (
        <div>
            <ul>
                {
                    books.data != undefined && 
                    books.data.myBooksQuary.map((item, key) => {
                        return (
                            <li key={key}>
                                {item.title}
                            </li>
                        )
                    })
                }
            </ul>

            <form onSubmit={(e) => {
                mySubmit(e);
            }}>
                <input onChange={(e) => {
                    setFormData({
                        ...formData,
                        title: e.target.value
                    })
                }} required type="text" placeholder='Title' />
                <input onChange={(e) => {
                    setFormData({
                        ...formData,
                        year: parseInt(e.target.value)  // ------------< here
                    })
                }} required type="text" placeholder='Year' />
                <input onChange={(e) => {
                    setFormData({
                        ...formData,
                        number_of_page: parseInt(e.target.value) // ------------< here
                    })
                }} required type="text" placeholder='Number Of Page' />
                <select required value={formData.author_id || ''}
                    onChange={(e) => {
                        setFormData({
                            ...formData,
                            author_id: parseInt(e.target.value) // ------------< here
                        })
                    }}
                >
                    <option disabled value=''>SELECT AUTHOR</option>
                    {
                        authors.data != undefined && 
                        authors.data.myAuthorsQuery.map((item, key) => {
                            return (
                                <option value={item.id} key={key}>
                                    {item.name}
                                </option>
                            )
                        })
                    }
                </select>
                <input type="submit" value="Create" />
            </form>
        </div>
    )
}
export default BooksComponents
```