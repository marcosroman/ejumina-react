const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');

const CLIENT_PORT = process.env.port || 5173;

require('./config/mongoose.config');

require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({credentials: true, origin: `http://localhost:${CLIENT_PORT}`}));

require('./routes/user.routes')(app);
require('./routes/evento.routes')(app);
require('./routes/invitado.routes')(app);
require('./routes/invitacion.routes')(app);
require('./routes/aggregates.routes')(app);

app.listen(8000, () => {
    console.log("listening...");
})
