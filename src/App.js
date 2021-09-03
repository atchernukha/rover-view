import { useState, useEffect } from 'react';
import axios from "axios"
import { Container, makeStyles } from '@material-ui/core'
import SelectFilter, { GreenButton } from './components/SelectFilter';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(3, 0, 2),
    textAlign: 'center',
  },
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
        console.log(error);
      })
  }, [filter, page]);

  return (
    <div className={styles.root}>
      <Container>
        <SelectFilter filter={filter} setFilter={setFilter} resetSearch={() => {
          setPage(1);
          setPhotos([]);
        }} />

        {photos && photos.map(item => <img key={item.id} src={item.img_src} alt={""} width="800" height="auto" />)}


      </Container>
      {fetching && <GreenButton onClick={() => setPage(p => ++p)}>Load more...</GreenButton>}
    </div>
  );
}

export default App;
