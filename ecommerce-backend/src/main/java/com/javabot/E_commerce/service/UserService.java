package com.javabot.E_commerce.service;

import com.javabot.E_commerce.dto.auth.AuthResponse;
import com.javabot.E_commerce.dto.auth.LoginRequest;
import com.javabot.E_commerce.dto.auth.RegisterRequest;
import com.javabot.E_commerce.exception.ResourceNotFoundException;
import com.javabot.E_commerce.model.Role;
import com.javabot.E_commerce.model.User;
import com.javabot.E_commerce.model.UserPrincipal;
import com.javabot.E_commerce.repository.UserRepository;
import com.javabot.E_commerce.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public String register(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("User already exists");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.CUSTOMER);

        userRepository.save(user);
        return "User registered successfully";
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(()->new ResourceNotFoundException("User email not registered"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new BadCredentialsException("Invalid credentials");
        }

        String token = jwtService.generateToken(new UserPrincipal(user));
        return new AuthResponse(token, user.getRole().name());
    }

    public User findByEmail(String username) {
        return userRepository.findByEmail(username).orElseThrow(()->new ResourceNotFoundException("User email not registered"));
    }
}
