import app from './app.js';
import databaseConnect from './src/middleware/config.js';

const port = process.env.PORT || 3200;
console.log(`Port: ${port}`);


app.listen(port, (err) => {
  if (err) {
    console.log('Failed to start the server');
  }
  console.log(`Server is running at port ${port}`);
  databaseConnect(); 
});
