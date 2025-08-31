package com.javabot.E_commerce.service;

import com.javabot.E_commerce.dto.address.AddressDto;
import com.javabot.E_commerce.exception.BadRequestException;
import com.javabot.E_commerce.exception.ResourceNotFoundException;
import com.javabot.E_commerce.model.Address;
import com.javabot.E_commerce.repository.AddressRepository;
import com.javabot.E_commerce.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AddressService {

    private final AddressRepository addressRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    public AddressDto addAddress(Long userId, AddressDto addressDto)
    {
        Address address=modelMapper.map(addressDto, Address.class);
        address.setUser(userRepository.getReferenceById(userId));
        address=addressRepository.save(address);
        return modelMapper.map(address, AddressDto.class);
    }

    public List<AddressDto> getAddress(Long userId)
    {
        return addressRepository.findByUser(userRepository.getReferenceById(userId))
                .stream()
                .map(address -> modelMapper.map(address, AddressDto.class))
                .toList();
    }

    public void deleteAddress(Long id, Long userId)
    {
        Address address=addressRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("Address not found"));
        if(!address.getUser().getId().equals(userId))
        {
            throw new BadRequestException("User not authorized");
        }

        addressRepository.delete(address);
    }
}
