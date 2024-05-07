# Akita_web

* `"homepage"` in `package.json` sets the url
* `base` in `vite.config.js` sets the base directory
* `<Route exact path>` in `App.jsx` sets the route path
* in `index.jsx` sets where the request sent
  ```
  setLoading(true);
      const response = await fetch('http://akitaweb.us-east-2.elasticbeanstalk.com/predict-hic', {
        method: 'POST',
        credentials: 'include',
        body: formData, // No need to set Content-Type header when using FormData
      });
  ``` 
 
 
