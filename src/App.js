import './App.css';
import { useState, useEffect } from 'react';
import axios from "axios"
import  { Button, AppBar, Container, IconButton, Toolbar, Typography, makeStyles }  from '@material-ui/core'
// import  MenuIcon  from '@material-ui/icons/Menu'
import SelectFilter from './components/SelectFilter';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(3, 0, 2),
  }
}))

function App() {
  const styles =useStyles()
  const [filter, setFilter] = useState({
    rover: 'curiosity',
    camera: 'FHAZ',
    earth_date: '2015-06-03',  // '2004-01-05',
    page: '1',
    })
  const [photos, setPhotos] = useState([])
//  let loadMore = 1
  
  // https://api.nasa.gov/mars-photos/api/v1/manifests/Curiosity/?earth_date=2015-6-3&api_key=DEMO_KEY
  useEffect(() => {
    const apiUrl = process.env.REACT_APP_NASA_ENDPOINT + 'mars-photos/api/v1/rovers/' + filter.rover + '/photos'  
 //   loadMore = 1
 if (filter.page == '1') {
   setPhotos([])
  }
    axios.get(apiUrl, {
                        params: {
                          earth_date: filter.earth_date,
                          // sol: '1',
                          camera: filter.camera,
                          page: filter.page,
                          api_key: process.env.REACT_APP_NASA_API_KEY,
                        }
  }).then((resp) => {
    // loadMore = resp.data.photos.length
    if(resp.data.photos.length) {
      setPhotos([...photos,...resp.data.photos]);
    }
      console.log(resp.data.photos.length)
    })
    .catch(function (error) {
      console.log(error);
    })
  }, [filter]);


  return (
      <div className="App">
        {/* <header className="App-header"/> */}
        {/* <AppBar position='fixed'>
          <Container fixed>
            <Toolbar>
              <IconButton edge='start' color='inherit' aria-label='menu'></IconButton>
              <Typography variant='h6'>Rower View</Typography>
            </Toolbar>
          </Container>
        </AppBar> */}
        <SelectFilter filter={filter} setFilter={setFilter} />
        <Container>
        {photos && photos.map(item => <img key={item.id} src={item.img_src} alt={""} width="800" height="auto" />
        )}
      <Button onClick={() => { 
          setFilter({...filter, page: ++filter.page
        }); console.log(photos) }}>Load more...</Button>
        </Container>

      </div>
   );
}

export default App;
