package com.javabot.E_commerce.repository;

import com.javabot.E_commerce.model.Address;
import com.javabot.E_commerce.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AddressRepository extends JpaRepository<Address, Long> {

    List<Address> findByUser(User user);
}
