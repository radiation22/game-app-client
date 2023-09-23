import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import "./map2.css";
import icon from "../../assets/mapIcon.png";

const DynamicRouteMap = () => {
  const { user } = useContext(AuthContext);
  const [map, setMap] = useState(null);
  const [latitude, setLatitude] = useState(null); // Initialize as null
  const [longitude, setLongitude] = useState(null); // Initialize as null
  const photoURL = user?.photoURL;
  const apiKey = "AIzaSyB3e1mZXJMeHNS6tjeN9RqLHMyIcRX7EOk"; // Replace with your Google Maps API key

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
    script.async = true;
    script.onload = () => initMap();
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  useEffect(() => {
    // Check if latitude and longitude are valid numbers before initializing the map
    if (latitude !== null && longitude !== null) {
      initMap();
    }
  }, [latitude, longitude]);

  const initMap = () => {
    const defaultCenter = { lat: latitude, lng: longitude };

    const mapInstance = new window.google.maps.Map(
      document.getElementById("map"),
      {
        center: defaultCenter,
        zoom: 16,
      }
    );
    setMap(mapInstance);

    const userMarker = new window.google.maps.Marker({
      map: mapInstance,
      icon: {
        url: icon,
        scaledSize: new window.google.maps.Size(30, 60),
      },
    });

    // Apply the CSS class for the rounded shape
    userMarker.getIcon().className = "rounded-marker-icon";

    const updateLocation = () => {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const userLocation = new window.google.maps.LatLng(latitude, longitude);

        userMarker.setPosition(userLocation);
        mapInstance.setCenter(userLocation);

        // Update the latitude and longitude states
        setLatitude(latitude);
        setLongitude(longitude);
      });
    };

    updateLocation();
    setInterval(updateLocation, 5000);
  };

  return <div className="w-full h-[420px]" id="map"></div>;
};

export default DynamicRouteMap;
