const app = require('./app');
const connectDB = require('./config/db');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

connectDB();

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});