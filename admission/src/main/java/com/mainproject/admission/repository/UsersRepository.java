package com.mainproject.admission.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mainproject.admission.model.Users;


public interface UsersRepository extends JpaRepository<Users, String> {

    Users findByEmail(String email);

} 
