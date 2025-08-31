package com.javabot.E_commerce.dto.auth;

import com.javabot.E_commerce.model.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
@AllArgsConstructor
public class UserDto {

        private Long id;
        private String name;
        private String email;
        private Role role;
}
