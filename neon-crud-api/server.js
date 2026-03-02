const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/regions', require('./routes/regions'));
app.use('/api/countries', require('./routes/countries'));
// app.use('/api/locations', require('./routes/locations'));
// app.use('/api/departments', require('./routes/departments'));
// app.use('/api/jobs', require('./routes/jobs'));
// app.use('/api/employees', require('./routes/employees'));
// app.use('/api/dependents', require('./routes/dependents'));

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});