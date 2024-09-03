package com.mainproject.admission.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.mainproject.admission.model.AuthRes;
import com.mainproject.admission.model.Records;
import com.mainproject.admission.model.Users;
import com.mainproject.admission.repository.RecordsRepository;
import com.mainproject.admission.repository.UsersRepository;
import com.mainproject.util.JwtUtil;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
public class Routing {

    @Autowired
    private RecordsRepository recordsRepository;

    @Autowired
    private UsersRepository usersRepository;

    JwtUtil jwtUtil = new JwtUtil();

    @GetMapping("/")
    public String hello() {
        return new String("hello world!");
    }

    @GetMapping("/getrecords")
    public ResponseEntity<List<Records>> getRecords(@RequestHeader("Authorization") String token,@RequestParam String email) {
        System.out.println(token);
        if(!jwtUtil.validateToken(token)) return ResponseEntity.status(401).body(null);
        List<Records> result =  recordsRepository.findAllByEmail(email);
        return ResponseEntity.status(200).body(result);
    }

    @GetMapping("/getallrecords")
    public ResponseEntity<List<Records>> getAllRecords(@RequestHeader("Authorization") String token) {
        if(!jwtUtil.validateToken(token)) return ResponseEntity.status(401).body(null);
        List<Records> result =  recordsRepository.findAll();
        return ResponseEntity.status(200).body(result);
    }

    @PostMapping("/insertrecord")
    public ResponseEntity<Records> insertRecord(@RequestHeader("Authorization") String token, @RequestBody Records record) {

        token = token.startsWith("Bearer ") ? token.substring(7) : token;

        System.out.println(token);
        System.out.println(record);

        if(!jwtUtil.validateToken(token)) return ResponseEntity.status(401).body(null);
        Records result  = recordsRepository.save(record);
        return ResponseEntity.status(200).body(result);
    }

    @PostMapping("/updatereview")
    public Records updateReview(@RequestHeader("Authorization") String token, @RequestBody Records record) {
        if(!jwtUtil.validateToken(token)) return null;
        int rating = record.getReview();
        String comment = record.getComment();
        record = recordsRepository.findByEmail(record.getEmail());
        if(record != null){
            record.setReview(rating);
            record.setComment(comment);
            recordsRepository.save(record);
            return record;
        }
        return null;
    }

    @PostMapping("/updatestatus")
    public Records updateStatus(@RequestHeader("Authorization") String token, @RequestBody Records record) {
        if(!jwtUtil.validateToken(token)) return null;

        Records record2 = recordsRepository.findById(record.getId());

        if(record2 != null){
            record2.setStatus(record.getStatus());
            return recordsRepository.save(record2);
        }

        return null;
    }

    @PostMapping("/signup")
    public ResponseEntity<AuthRes> signUp(@RequestBody Users user){

        String username = user.getUsername();
        String email = user.getEmail();
        String password = user.getPassword();

        AuthRes authRes = new AuthRes();

        if(username == null){
            authRes.setStatus("User name is required");
            return ResponseEntity.status(500).body(authRes);
        }

        Users user2 = usersRepository.findByEmail(email);
        
        if(user2 != null){
            authRes.setStatus("This email aldready registered");
            return ResponseEntity.status(500).body(authRes);
        }

        if(password == null){
            authRes.setStatus("Password is missing");
            return ResponseEntity.status(500).body(authRes);
        }

        user.setPassword(password);

        usersRepository.save(user);
        String token = jwtUtil.generateToken(username, "user");
        authRes.setStatus("success");
        authRes.setAccessToken(token);

        return ResponseEntity.status(200).body(authRes);
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthRes> authentication(@RequestBody Users user){

        String email = user.getEmail();
        String password = user.getPassword();

        Users user2 = usersRepository.findByEmail(email);

        AuthRes authRes = new AuthRes();

        if(user2 == null){
            authRes.setStatus("Invalid Credential");
            return ResponseEntity.status(401).body(authRes);
        }

        System.out.println("User found is: "+ user2.getUsername());

        if(user2 == null || !user2.getPassword().equals(password)){
            authRes.setStatus("Invalid Credential");
            return ResponseEntity.status(401).body(authRes);
        }
        
        String token = jwtUtil.generateToken(user2.getUsername(), user2.getType());
        authRes.setStatus("succcess");
        authRes.setAccessToken(token);
        authRes.setUsername(user2.getUsername());
        authRes.setUserType(user2.getType());
        return ResponseEntity.status(201).body(authRes);
    }

    
}
