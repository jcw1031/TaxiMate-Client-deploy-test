const getCurrentLocation = async (): Promise<{
  lat: number;
  lng: number;
}> => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          console.log(
            'Geolocation returned: ' + JSON.stringify(currentLocation)
          );
          resolve(currentLocation);
        },
        (error) => {
          alert('Unable to retrieve your location.' + error.message);
          resolve({
            lat: 37.5665462356,
            lng: 127.345623453
          });
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
      reject(new Error('Geolocation is not supported by this browser.'));
    }
  });
};

export default getCurrentLocation;
