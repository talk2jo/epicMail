import express from 'express';
import bodyParser from 'body-parser';
import mailRoutes from '../server/routes/router';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.status(200)
    .json({
      status: 200,
      data: 'Welcome to "Epic Mail". An instant message web app'
    });
});

app.use('/api/v1', mailRoutes);
app.use('*', (req, res) => {
  res.status(404).json({
    status: 404,
    error: 'Page not found'
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
export default app;
