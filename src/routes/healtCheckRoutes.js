import express from 'express';

const router = express.Router();

// crear funcion callback  de tipo GET que respoinde un OK
const healtCheck = (req, res) => {
  res.status(200).json({
     status: "OK",
    message: "Server is running",});
}

//endpoint de tipo get
router.get('/healthCheck', healtCheck);

export default router;