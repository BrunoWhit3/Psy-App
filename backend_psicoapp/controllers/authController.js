const User = require('../models/User');

exports.registerUser = async (req, res) => {
    try {
        const { nome, email, senha, tipoUsuario, dataNascimento } = req.body;

        if (!nome || !email || !senha || !tipoUsuario) {
            return res.status(400).json({ message: 'Todos os campos obrigatórios devem ser preenchidos.' });
        }

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'Este e-mail já está em uso.' });
        }

        user = new User({ nome, email, senha, tipoUsuario, dataNascimento });
        await user.save();

        res.status(201).json({
            message: 'Usuário registrado com sucesso!',
            userId: user._id,
            email: user.email,
            tipoUsuario: user.tipoUsuario
        });

    } catch (err) {
        console.error("Erro ao registrar usuário:", err);
        res.status(500).json({ message: 'Erro no servidor.', error: err.message });
    }
};