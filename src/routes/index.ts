import express from 'express'

const router = express.Router();

router.all('/healthcheck', (req, res) => res.status(200).send({ status: 'OK' }));

export default router;