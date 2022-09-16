import React, { useState, useEffect } from 'react';
import './app.css';
// Import components from MUI
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Skeleton from '@mui/material/Skeleton';
import LoadingButton from '@mui/lab/LoadingButton';

// Dark theme relation imports
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

// Change for production
const BASE_API_URL = 'api' 

const App = () => {
  const [books, setBooks] = useState([]);
  const [selected, setSelected] = useState(-1);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [desc, setDesc] = useState('');
  const [bookId, setBookId] = useState('');
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [updating, setUpdating] = useState(false);

  // Get all books and save to books variable
  useEffect(() => {
    fetch(`${BASE_API_URL}/books`)
    .then((resp) => resp.json())
    .then((data) => {
      setBooks(data);
      setLoading(false);
    })
    .catch((err) => console.log(err.message))
  }, []);

  const resetStates = () => {
    setTitle('');
    setAuthor('');
    setDesc('');
    setSelected(-1);
    setBookId('');
    setAdding(false);
    setUpdating(false);
  }

  // Add new book
  const addBook = async(title,author,desc) => {
    await fetch(`${BASE_API_URL}/book/`, {
      method: 'POST',
      body: JSON.stringify({
        title: title,
        author: author,
        description: desc,
      }),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    })
    .then((resp) => resp.text())
    .then((data) => {
      let id = data.split(':').pop();
      setBooks((books) => [...books, {id: id,title:title,author:author,description:desc}]);
      resetStates();
    })
    .catch((err) => console.log(err.message))
  };

  // Handle form submission (i.e submit new book)
  const handleSubmit = (e) => {
    e.preventDefault();
    addBook(title,author,desc);
  }

  // Handle deleting book based on id
  const deleteBook = async (id) => {
    await fetch(`${BASE_API_URL}/book/${id}`, {
      method: 'DELETE',
    })
    .then((response) => {
      if (response.status === 200) {
        setBooks(
          books.filter((book) => {
            return book.id !== id;
          })
        );
        resetStates();
      } else {
        resetStates();
        return;
      }
    })
    .catch((err) => console.log(err.message))
  }

  // Handle updating book based on id
  const updateBook = async (id,title,author,desc) => {    
    await fetch(`${BASE_API_URL}/book/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title: title,
        author: author,
        description: desc,
      }),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    })
    .then((resp) => resp.text())
    .then((data) => {
      // Update books to reflect updated book
      // let index = books.findIndex(book => book.id === id);
      // let newBooks = [...books];
      // newBooks[index] = {title:title,author:author,description:desc};
      // setBooks(newBooks);


      setBooks(prevBooks => {
        return prevBooks.map((book) => {
          if (book.id === id) {
            return { title, author, description: desc }
          }
      
          return book
        }
      )})

      resetStates();
    })
    .catch((err) => console.log(err.message))
  }

  // Handle selecting a book from list
  const selectBook = (id) => {
    setSelected(id);
    let book = books[id];
    setTitle(book.title);
    setAuthor(book.author);
    setDesc(book.description);
    setBookId(book.id);
  }

  // Handle clicking update button
  const clickUpdate = () => {
    setUpdating(true);
    updateBook(bookId,title,author,desc);
  }

  const clickDelete = (ind) => {
    let bookId = books[ind].id;
    deleteBook(bookId);
  }

  const clickCreate = () => {
    setAdding(true);
    addBook(title,author,desc);
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <main className="main">
        <Typography
          variant="h3"
          gutterBottom
        >
          Book collection application
        </Typography>
        <Divider className="divider-thick"/>
        <Grid
          container
          spacing={3}
          direction="row"
          justifyContent="center"
        >
          <Grid item xs={6}>
            <Typography
              variant="h5"
              gutterBottom
              className="subtitle"
            >
              Collection
            </Typography>
            {loading &&
              <>
              <Skeleton animation="wave" height={75}/>
              <Skeleton animation="wave" height={75}/>
              <Skeleton animation="wave" height={75}/>
              <Skeleton animation="wave" height={75}/>
              </>
            }
            {!loading && <Box sx={{ width: '100%', bgcolor: 'background.paper',
              border: 1, borderRadius: 1, borderColor: 'action.disabled',
              marginTop: '15px'}}
              >
            <List component="nav" aria-label="main book titles" disablePadding>
              {books.map((book,ind) =>
                <ListItemButton
                  key={ind}
                  selected={selected === ind}
                  divider={ind < books.length - 1}
                  onClick={(event) => selectBook(ind)}
                >
                <IconButton
                  edge="end"
                  aria-label="delete"
                  className="delete-icon"
                  onClick={(event) => clickDelete(ind)}
                >
                  <DeleteIcon />
                </IconButton>
                <ListItemText
                  primary={book.title}
                  secondary={book.author}/>
                </ListItemButton>
                
              )}
            </List>
            </Box>}
          </Grid>
          <Grid item xs={6}>
            <Typography
              variant="h5"
              gutterBottom
              className="subtitle"
            >
              Book information
            </Typography>
            <Box sx={{
                '& > :not(style)': { m: 1, width: '100%' },
              }}
              component="form"
            >
              <TextField
                id="title"
                label="Title"
                variant="outlined"
                value={title}
                onChange={event => setTitle(event.target.value)}
              />
              <TextField
                id="author"
                label="Author"
                variant="outlined"
                value={author}
                onChange={event => setAuthor(event.target.value)}
              />
              <TextField
                id="description"
                label="Description"
                variant="outlined" 
                multiline
                value={desc || ''}
                onChange={event => setDesc(event.target.value)}
                minRows={3}
                maxRows={6}
              />
              <Stack spacing={2} direction="row" justifyContent="space-between">
                <LoadingButton
                  variant="contained"
                  disabled={selected<0}
                  onClick={clickUpdate}
                  loading={updating}
                >Update</LoadingButton>
                <LoadingButton
                  variant="contained"
                  onClick={clickCreate}
                  loading={adding}
                >Create New</LoadingButton>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </main>
    </ThemeProvider>
  );
}

export default App;