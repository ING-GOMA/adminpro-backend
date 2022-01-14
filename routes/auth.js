/*
 Ruta: /api/login
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();

router.post('/', [
        check('email', 'El Email es obligatorio').isEmail(),
        check('password', 'El Password es obligatorio').not().isEmpty(),
        validarCampos

    ],
    login
);
router.post('/google', [
        check('token', 'El Token de Google es obligatorio').not().isEmpty(),
        validarCampos

    ],
    googleSignIn
);

module.exports = router;