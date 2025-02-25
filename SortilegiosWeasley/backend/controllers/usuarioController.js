import Usuario from '../modelos/usuario.js';

class usuarioController {

    async create(req, res) {
        try {
            const usuario = new Usuario(req.body);
            const nuevoUsuario = await usuario.save();
            console.log("Usuario creado con éxito");
            res.status(201).json(nuevoUsuario);
        } catch (error) {
            console.log("Error creando el usuario");
            res.status(500).json({error: 'Error creando el usuario'});
        }
    }

    async getAll(req, res) {
        try {
            const usuarios = await Usuario.find();
            res.status(200).json(usuarios);
            console.log("Usuarios obtenidos con éxito");
        } catch (error) {
            console.log("Error obteniendo los usuarios");
            res.status(500).json({error: 'Error obteniendo los usuarios'});
        }
    }

    async getOne(req, res) {
        try {
            const { id } = req.params;
            const usuario = await Usuario.findById(id);
            if (usuario) {
                res.status(200).json(usuario);
                console.log("Usuario obtenido con éxito");
            } else {
                console.log("Usuario no encontrado");
                res.status(404).json({error: 'Usuario no encontrado'});
            }
        }
        catch (error) {
            console.log("Error obteniendo el usuario");
            res.status(500).json({error: 'Error obteniendo el usuario'});
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const usuario = await Usuario.findByIdAndUpdate(id, req.body, { new: true });

            if (usuario) {
                res.status(200).json(usuario);
                console.log("Usuario actualizado con éxito");
            } else {
                console.log("Usuario no encontrado");
                res.status(404).json({error: 'Usuario no encontrado'});
            }
        }
        catch (error) {
            console.log("Error actualizando el usuario");
            res.status(500).json({error: 'Error actualizando el usuario'});
        }
    }

    async delete(req, res) {
        try { 
            const { id } = req.params;
            const usuario = await Usuario.findByIdAndDelete(id);

            if (usuario) {
                res.status(200).json(usuario);
                console.log("Usuario eliminado con éxito");
            } else {
                console.log("Usuario no encontrado");
                res.status(404).json({error: 'Usuario no encontrado'});
            }
        }
        catch (error) {
            console.log("Error eliminando el usuario");
            res.status(500).json({error: 'Error eliminando el usuario'});
        }
    }
}
export default new usuarioController();
