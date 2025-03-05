import Voto from '../modelos/voto.js';
import Resena from '../modelos/resena.js';

class votosController{

    async obtenerVotosUsuario(req, res) {
        try {
            const votos = await Voto.find({ usuarioId: req.user.id });
            console.log(votos);
            res.json(votos);
        } catch (error) {
            res.status(204).json({ mensaje: 'Error al obtener votos', error });
        }
    }

    async registrarVoto(req, res) {
        try {
            const { resenaId, tipo } = req.body;

            // Verificar si el usuario ya votó en esta reseña
            const votoExistente = await Voto.findOne({ usuarioId: req.user.id, resenaId });

            if(votoExistente){
                if (votoExistente.tipo === tipo) {
                    return res.status(400).json({ mensaje: 'Ya has votado en esta reseña' });
                }else{
                    await Voto.findByIdAndUpdate(votoExistente._id, { tipo });
                    const campoActualizar = tipo === 'recuentoUtil' ? { $inc: { recuentoUtil: 1, recuentoNoUtil: -1} } : { $inc: { recuentoNoUtil: 1, recuentoUtil: -1}};
                    await Resena.findByIdAndUpdate(resenaId, campoActualizar);
                }
                return res.status(201).json({ mensaje: 'Voto actualizado' });
            }

            // Guardar el nuevo voto
            const nuevoVoto = new Voto({ usuarioId: req.user.id, resenaId, tipo });
            await nuevoVoto.save();

            // Incrementar el recuento en la reseña
            const campoActualizar = tipo === 'recuentoUtil' ? { $inc: { recuentoUtil: 1 } } : { $inc: { recuentoNoUtil: 1 } };
            await Resena.findByIdAndUpdate(resenaId, campoActualizar);

            res.status(201).json({ mensaje: 'Voto registrado' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ mensaje: 'Error al registrar el voto', error });
        }
    }

}

export default new votosController();
