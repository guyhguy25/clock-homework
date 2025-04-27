const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./database');
require('dotenv').config();
const app = express();

sequelize.sync({ force: true }).then(async () => {
  console.log("Database synced!");
}).catch(err => {
  console.error('Unable to sync database:', err);
});

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth.routes');
const timesheetRoutes = require('./routes/timesheet.routes');
const userRoutes = require('./routes/user.routes');


app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/reports', timesheetRoutes);

app.listen(process.env.REACT_APP_SERVER_PORT, () => {
  console.log(`App server now listening on port ${process.env.REACT_APP_SERVER_PORT}`);
});