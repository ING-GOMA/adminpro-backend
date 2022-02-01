/* 
    MEDICO 
    ruta: /api/medico
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { getMedicos, crearMedico, actualizarMedico, borarMedico, getMedicoById } = require('../controllers/medicos');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

router.get('/', validarJWT, getMedicos);

router.post('/', [
        validarJWT,
        check('nombre', 'el nombre es del medico es obligatorio').not().isEmpty(),
        check('hospital', 'el hospital id debe de ser válido').isMongoId(),
        validarCampos
    ],
    crearMedico);

router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre del Medicos es necesario').not().isEmpty(),
        check('hospital', 'El id de hospital debe de ser valido').isMongoId(),
        validarCampos
    ],
    actualizarMedico);

router.delete('/:id', validarJWT,
    borarMedico);

router.get('/:id', validarJWT,
    getMedicoById);



module.exports = router;