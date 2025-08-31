package com.javabot.E_commerce.dto.address;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AddressDto {
    private Long id;
    private String street;
    private String city;
    private String state;
    private String postalCode;
    private String country;
}
