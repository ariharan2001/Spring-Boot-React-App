package com.mainproject.admission.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mainproject.admission.model.Records;


public interface RecordsRepository extends JpaRepository<Records, Integer> {

    Records findById(int id);

    Records findByEmail(String email);

    List<Records> findAllByEmail(String email);

    Records findByMobile(String mobile);
    
} 