import { useState, useEffect } from 'react';
import axios from "axios";
import { Typography, Container, makeStyles, ImageList, ImageListItem, Paper } from '@material-ui/core';
import { lightGreen as green } from '@material-ui/core/colors';
import SelectFilter, { GreenButton } from './components/SelectFilter';
import Image from './img/mars.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
},
  imageList: {
    maxWidth: 1200,
    height: 'auto',
    // Promote the list into its own layer in Chrome. This cost memory, but helps keep FPS high.
    transform: 'translateZ(0)',
  },
  paperContainer: {
    textAlign: 'center',
    background: `url(${Image})`,
    backgroundPosition: 'center center',
    backgroundAttachment: 'fixed',
    // height: '100vh',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    minHeight: '100vh',
}
}))

function App() {

  const styles = useStyles()
  const ItemsPerPage = 25
  const [filter, setFilter] = useState({
    rover: 'spirit',
    camera: 'NAVCAM',
    earth: 'true',
    earth_date: '2004-01-05',
    sol: 1,
  })
  const [page, setPage] = useState(1)
  const [photos, setPhotos] = useState([])
  const [fetching, setFetching] = useState(false)

  // https://api.nasa.gov/mars-photos/api/v1/manifests/Curiosity/?earth_date=2015-6-3&api_key=DEMO_KEY
  useEffect(() => {
    const apiUrl = process.env.REACT_APP_NASA_ENDPOINT + 'mars-photos/api/v1/rovers/' + filter.rover + '/photos'
    setFetching(true)
    axios.get(apiUrl, {
      params: {
        ...{
          camera: filter.camera,
          page: page,
          api_key: process.env.REACT_APP_NASA_API_KEY
        }, ...filter.earth ? ({ earth_date: filter.earth_date }) : ({ sol: filter.sol })
      }
    }
    ).then((resp) => {
      if (resp.data.photos.length) {
        setPhotos(photos => [...photos, ...resp.data.photos]);
        if (resp.data.photos.length < ItemsPerPage) {
          setFetching(false)
        }
      } else {
        setFetching(false)
      }
    })
      .catch(function (error) {
        console.error(error);
      })
  }, [filter, page]);

  return (
    <Paper className={styles.paperContainer}>
    {/* <div className={styles.root}>  */}
        <SelectFilter filter={filter} setFilter={setFilter} resetSearch={() => {
          setPage(1);
          setPhotos([]);
        }} />
        <Container>
        {photos.length ? (<ImageList gap={1} className={styles.imageList} cols={1} rowHeight='auto'>
          {photos.map(item => <ImageListItem key={item.id} >
            <img src={item.img_src} alt={item.id} />
          </ImageListItem>)}
        </ImageList>) :
          <Typography variant="h6" color = {green[500]}>
            Photos not found
          </Typography>
        }
      </Container>
      {fetching && <GreenButton onClick={() => setPage(p => ++p)}>Load more...</GreenButton>}
     {/* </div>  */}
    </Paper>
  );
}

export default App;
