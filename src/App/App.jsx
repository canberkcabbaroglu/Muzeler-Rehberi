import React, { useState, Fragment } from "react";
import myPlaces from '../api/museum.json';
import { useLoadScript, GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import MyImage from '../../public/img/museum.png';
import './App.scss'
 

function App() {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [markerMap, setMarkerMap] = useState({});
  const [center] = useState({ lat: 38.427434515263, lng: 27.143855047384 });
  const [zoom, setZoom] = useState(15);
  const [infoOpen, setInfoOpen] = useState(false);
  const { isLoaded  } = useLoadScript({

    googleMapsApiKey: ""
  });
 
 
 
 
  const markerLoadHandler = (marker, place) => {
    return setMarkerMap(prevState => {
      return { ...prevState, [place.museum_id]: marker };
    });
  };

  const markerClickHandler = (event, place) => {
    setSelectedPlace(place);

    if (infoOpen) {
      setInfoOpen(false);
    }

    setInfoOpen(true);

    if (zoom < 15) {
      setZoom(15);
    }
  };

  const renderMap = () => {
    return (
      <Fragment>
 
        <GoogleMap
          onClick={e => setClickedLatLng(e.latLng.toJSON())}
          center={center}
          zoom={zoom}
          mapContainerStyle={{
            height: "100vh",
            width: "100%"
          }}
        >
          {myPlaces.map(place => (
            <Marker
              key={place.museum_id}
              position={{ lat: place.museum_lat, lng: place.museum_lon }}
              icon={  MyImage } 
              
              onLoad={marker => {
           
              
              
                return markerLoadHandler(marker, place)
              }}
              onClick={event => markerClickHandler(event, place)}
            />
          ))}

          {infoOpen && selectedPlace && (
            <InfoWindow
              anchor={markerMap[selectedPlace.museum_id]}
              onCloseClick={() => setInfoOpen(false)}
            >
              <div>
                <h2 className="title">MÜZE BİLGİSİ</h2>
          
              
                <div className="information">
                  <p className="information-title">MÜZE ADI:</p> 
                  <p className="information-description">{selectedPlace.museum_name}</p>
                </div> 
                <div className="information">
                <p className="information-title">İLÇE ADI:</p> 
                <p className="information-description">{selectedPlace.museum_county}</p>
              </div> 
                <div className="information">
                  <p className="information-title">AÇIKLAMA:</p> 
                  <p className="information-description">{selectedPlace.museum_desc}</p>
                </div> 
                <div className="information">
                <p className="information-title">MAHALLE ADI:</p> 
                <p className="information-description">{selectedPlace.museum_neighborhood}</p>
              </div> 
                <div className="information">
                  <p className="information-title">KOORDİNATLARI:</p> 
                  <p className="information-description">{Number(selectedPlace.museum_lat.toFixed(2))} Kuzey Enlemi - {Number(selectedPlace.museum_lon.toFixed(2))} Doğu Boylamı</p>
                </div> 
             
          
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </Fragment>
    );
  };

  return isLoaded ? renderMap() : null;
}

export { App }; 
