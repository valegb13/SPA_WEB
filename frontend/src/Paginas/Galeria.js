import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';

export default function Galeria() {
  return (
    <div class="Container">
      <div class="m-0 row justify-content-center">
      <ImageList sx={{ width: 700, height: 530 }}>
      <ImageListItem key="Subheader" cols={2}>
        <ListSubheader component="div">Nuestros clientes disfrutando nuestras instalaciones </ListSubheader>
      </ImageListItem>
      {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <img
            src={`${item.img}?w=248&fit=crop&auto=format`}
            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
          />
          <ImageListItemBar
            title={item.title}
            subtitle={item.author}
            actionIcon={
              <IconButton
                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                aria-label={`info about ${item.title}`}
              >
                <InfoIcon />
              </IconButton>
            }
          />
        </ImageListItem>
      ))}
    </ImageList>
      </div>
        
    </div>
    
  );
}

const itemData = [
  {
    img: 'https://cdn.pixabay.com/photo/2015/04/20/13/44/ferris-wheel-731511_960_720.jpg',
    title: '"Un gran día para la Rueda"',
    author: '@bkristastucchio',
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: 'https://cdn.pixabay.com/photo/2017/08/06/10/26/woman-2591043_960_720.jpg',
    title: '"Have a great day:)"',
    author: '@rollelflex_graphy726',
  },
  {
    img: 'https://cdn.pixabay.com/photo/2017/06/03/23/18/bumper-car-2369930_960_720.jpg',
    title: '"Disfrutando en familia en RisePark!!! Recomendadisimo"',
    author: '@helloimnick',
  },
  {
    img: 'https://cdn.pixabay.com/photo/2017/07/31/18/42/amusement-2559894_960_720.jpg',
    title: '"Playa, brisa y mar"',
    author: '@nolanissac',
    cols: 2,
  },
  {
    img: 'https://cdn.pixabay.com/photo/2016/09/28/18/12/roller-coaster-1701085_960_720.jpg',
    title: '"Superando mi miedo a las alturas""',
    author: '@hjrc33',
    cols: 2,
  },
  {
    img: 'https://images.pexels.com/photos/2896360/pexels-photo-2896360.jpeg?cs=srgb&dl=pexels-ayaka-kato-2896360.jpg&fm=jpg',
    title: '"Feliz"',
    author: '@arwinneil',
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: 'https://cdn.pixabay.com/photo/2018/03/13/15/56/theme-park-3222891_960_720.jpg',
    title: 'Panorámica de mi lugar favorito!',
    author: '@tjdragotta',
  },
  {
    img: 'https://cdn.pixabay.com/photo/2017/06/26/21/14/wisconsin-2445257_960_720.jpg',
    title: '"Cómo los dioses""',
    author: '@katie_wasserman',
  },
];