const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');
const { getMenuFrontEnd } = require('../helpers/menu-frontEnd');


const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        //verificar email

        const usuarioDB = await Usuario.findOne({ email });

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }

        //verificar contraseña
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'contraseña no valida'
            });
        }

        //Generar el token-jwt
        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok: true,
            token,
            menu: getMenuFrontEnd(usuarioDB.role)
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const googleSignIn = async(req, res = response) => {

    const googleToken = req.body.token;

    try {

        const { name, email, picture } = await googleVerify(googleToken);

        const usuarioDB = await Usuario.findOne({ email });
        let usuario;

        if (!usuarioDB) {
            //si no existe el usaurio
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });
        } else {
            //existe Usuario
            usuario = usuarioDB;
            usuario.google = true;

        }

        //Guardar en BD
        await usuario.save();

        //Generar el JWT
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            token,
            menu: getMenuFrontEnd(usuario.role)
        });

    } catch (error) {
        console.log(error);
        res.status(401).json({
            ok: false,
            msg: 'Token no es correcto'
        });

    }



}

const renewToken = async(req, res = response) => {

    const uid = req.uid;


    //Generar el JWT
    const token = await generarJWT(uid);

    //Obtener el usuario por uid
    const usuario = await Usuario.findById(uid);

    res.json({
        ok: true,
        token,
        usuario,
        menu: getMenuFrontEnd(usuario.role)
    })
}

module.exports = {
    login,
    googleSignIn,
    renewToken
}