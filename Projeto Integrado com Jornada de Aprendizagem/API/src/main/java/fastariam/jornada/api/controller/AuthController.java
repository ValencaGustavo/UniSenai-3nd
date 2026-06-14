package fastariam.jornada.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import fastariam.jornada.api.dto.LoginDTO;
import fastariam.jornada.api.dto.RegistroDTO;
import fastariam.jornada.api.service.UsuarioService;

import javax.validation.Valid;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/registrar")
    public ResponseEntity<String> registrar(@Valid @RequestBody RegistroDTO dto) {

        String resultado = usuarioService.registrar(dto);

        if (resultado.startsWith("ERRO")) {
            return ResponseEntity.badRequest().body(resultado);
        }
        return ResponseEntity.status(201).body(resultado);
    }
    @PostMapping("/login")
    public ResponseEntity<String> login(@Valid @RequestBody LoginDTO dto) {

        String resultado = usuarioService.login(dto);

        if (resultado.startsWith("ERRO")) {
            return ResponseEntity.status(401).body(resultado);
        }
        return ResponseEntity.ok(resultado);
    }
}
