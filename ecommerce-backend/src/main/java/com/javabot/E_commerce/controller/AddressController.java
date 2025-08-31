package com.javabot.E_commerce.controller;

import com.javabot.E_commerce.dto.address.AddressDto;
import com.javabot.E_commerce.service.AddressService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/address/{userId}")
public class AddressController {

    private final AddressService addressService;

    @GetMapping
    public ResponseEntity<List<AddressDto>> getAddress(@PathVariable Long userId)
    {
        return ResponseEntity.ok(addressService.getAddress(userId));
    }

    @PostMapping
    public ResponseEntity<AddressDto> addAddress(@PathVariable Long userId, @RequestBody AddressDto addressDto)
    {
        return ResponseEntity.ok(addressService.addAddress(userId, addressDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAddress( @PathVariable Long userId, @PathVariable Long id)
    {
        addressService.deleteAddress(id, userId);
        return ResponseEntity.noContent().build();
    }
}
