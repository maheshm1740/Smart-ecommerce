package com.javabot.E_commerce.controller;

import com.javabot.E_commerce.dto.auth.AuthResponse;
import com.javabot.E_commerce.dto.auth.LoginRequest;
import com.javabot.E_commerce.dto.auth.RegisterRequest;
import com.javabot.E_commerce.dto.auth.UserDto;
import com.javabot.E_commerce.model.User;
import com.javabot.E_commerce.model.UserPrincipal;
import com.javabot.E_commerce.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
        String message = userService.register(request);
        return ResponseEntity.ok(message);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(userService.login(request));
    }

    @GetMapping("/me")
    public ResponseEntity<UserDto> getCurrentUser(@AuthenticationPrincipal UserPrincipal principal) {
        User user = principal.getUser();

        UserDto dto = new UserDto(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole()
        );
        return ResponseEntity.ok(dto);
    }

}
