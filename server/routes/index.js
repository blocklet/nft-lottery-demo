const router = require('express').Router();
const env = require('../libs/env');

router.get('/did/session', async (req, res) => res.json({ user: req.user }));

router.post('/logout', (req, res) => {
  req.user = null;
  res.json({ user: null });
});

router.get('/env.js', (req, res) => {
  res.type('js');
  res.send(`window.env = ${JSON.stringify(env, null, 2)}`);
});

router.use('/nft', require('./nft'));
router.use('/', (req, res) => res.send('ok'));

module.exports = router;
