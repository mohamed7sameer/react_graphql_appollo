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