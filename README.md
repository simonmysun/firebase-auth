# firebase-auth
Static auth page for Firebase authentication

## How to use
1. Clone or download this repo. 

2. Fill in your firebase keys in `/src/firebase.config.js` like this:
```js
const config = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  storageBucket: '',
  messagingSenderId: '',
};

export default config;
```

They can be found in `Firebase Console > Overview > Add Firebase to your web app.`. Remenber to adjust them into ES2015 style in order to pass the ESLint.

3. Run `npm run build`. The results will be found in '/dist';

## Support this project and its author

You can:

* [Report issues](https://github.com/simonmysun/tid/issues)
* [Fork the Github Repo](https://github.com/simonmysun/tid) and pull request
* [Buy me a coffee](https://paypal.me/simonmysun/5)