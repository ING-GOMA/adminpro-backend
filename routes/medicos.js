/* 
    MEDICO 
    ruta: /api/medico
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { getMedicos, crearMedico, actualizarMedico, borarMedico } = require('../controllers/medicos');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

router.get('/', getMedicos);

router.post('/', [
        validarJWT,
        check('nombre', 'el nombre es del medico es obligatorio').not().isEmpty(),
        check('hospital', 'el hospital id debe de ser válido').isMongoId(),
        validarCampos
    ],
    crearMedico);

router.put('/:id', [],
    actualizarMedico);

router.delete('/:id',
    borarMedico);



module.exports = router;