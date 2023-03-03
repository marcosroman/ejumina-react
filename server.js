const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');

const CLIENT_PORT = 5173;

require('./server/config/mongoose.config');

require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({credentials: true, origin: `http://localhost:${CLIENT_PORT}`}));

require('./server/routes/user.routes')(app);
require('./server/routes/evento.routes')(app);
require('./server/routes/invitado.routes')(app);
require('./server/routes/invitacion.routes')(app);

app.listen(8000, () => {
    console.log("listening...");
})
