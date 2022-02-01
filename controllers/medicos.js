const { response } = require('express');
const Medico = require('../models/medico');


const getMedicos = async(req, res = response) => {

    const medicos = await Medico.find().populate('usuario', 'nombre img')
        .populate('hospital', 'nombre img')
    res.json({
        ok: true,
        medicos
    })

}

const getMedicoById = async(req, res = response) => {

    const id = req.params.id;

    try {
        const medico = await Medico.findById(id).populate('usuario', 'nombre img')
            .populate('hospital', 'nombre img')

        res.json({
            ok: true,
            medico
        })

    } catch (error) {
        console.log(error);
        res.json({
            ok: false,
            msg: 'Hable con el Administrador'
        })
    }



}

const crearMedico = async(req, res = response) => {
    const uid = req.uid;
    const medico = new Medico({
        usuario: uid,
        ...req.body
    });

    try {

        const medicoDB = await medico.save();

        res.json({
            ok: true,
            medico: medicoDB

        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }


}
const actualizarMedico = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.id;


    try {

        const medico = await Medico.findById(id);
        if (!medico) {
            res.status(404).json({
                ok: true,
                msg: 'Medico no encontrado por id',
            });
        }

        cambiosMedicos = {
            ...req.body,
            usuario: uid,

        }

        const medicoActualizado = await Medico.findByIdAndUpdate(id, cambiosMedicos, { new: true });

        res.json({
            ok: true,
            medico: medicoActualizado

        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: true,
            msg: 'Hable con el administrador'

        });

    }

}
const borarMedico = async(req, res = response) => {
    const id = req.params.id;

    try {

        const medico = await Medico.findById(id);

        if (!medico) {
            res.status(404).json({
                ok: true,
                msg: 'Medico no encontrado por id',
            });
        }

        await Medico.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Medico Eliminado'
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrado'
        });
    }


}

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borarMedico,
    getMedicoById
}