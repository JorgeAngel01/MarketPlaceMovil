import React, { useState, useEffect } from "react";
import { View } from "react-native";
import * as Location from "expo-location";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";

const MapComponent = ({ mapLatitude, mapLongitude, markerLatitude, markerLongitude }) => {
  Location.setGoogleApiKey("AIzaSyBTGC06eNFYSdCSrrg7xwNMG0IkBiNmG7c");

  const [mapRegion, setMapRegion] = useState({
    latitude: mapLatitude ? mapLatitude : 19.6917087,
    longitude: mapLongitude ? mapLongitude : -101.2206798,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [markerCoordinate, setMarkerCoordinate] = useState({
    latitude: markerLatitude ? markerLatitude : 19.6917087,
    longitude: markerLongitude ? markerLongitude : -101.2206798,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    setMapRegion({
      latitude: mapLatitude ? mapLatitude : 19.6917087,
      longitude: mapLongitude ? mapLongitude : -101.2206798,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });

    setMarkerCoordinate({
      latitude: markerLatitude ? markerLatitude : 19.6917087,
      longitude: markerLongitude ? markerLongitude : -101.2206798,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  }, [mapLatitude, mapLongitude, markerLatitude, markerLongitude]);

  return (
    <MapView style={{ flex: 1, width: "100%", borderRadius: 10 }} region={mapRegion}>
      {markerCoordinate && (
        <Marker
          coordinate={markerCoordinate}
          title="Current Location"
          description="This is your current location"
        />
      )}
    </MapView>
  );
};

export default MapComponent;
