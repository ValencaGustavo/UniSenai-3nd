package fastariam.jornada.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fastariam.jornada.api.dto.LoginDTO;
import fastariam.jornada.api.dto.RegistroDTO;
import fastariam.jornada.api.model.Usuario;
import fastariam.jornada.api.repository.UsuarioRepository;

import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public String registrar(RegistroDTO dto) {

        if (usuarioRepository.existsByEmail(dto.getEmail())) {
            return "ERRO: Já existe um usuário cadastrado com esse email.";
        }

        Usuario novoUsuario = new Usuario(
                dto.getNomeCompleto(),
                dto.getEmail(),
                dto.getSenha()
        );

        usuarioRepository.save(novoUsuario);

        return "Usuário registrado com sucesso!";
    }

    public String login(LoginDTO dto) {

        Optional<Usuario> usuarioOpt = usuarioRepository.findByEmail(dto.getEmail());

        if (!usuarioOpt.isPresent()) {
            return "ERRO: Email ou senha incorretos.";
        }

        Usuario usuario = usuarioOpt.get();

        if (!usuario.getSenha().equals(dto.getSenha())) {
            return "ERRO: Email ou senha incorretos.";
        }
        return "Login realizado com sucesso! Bem-vindo, " + usuario.getNomeCompleto() + "!";
    }
}
