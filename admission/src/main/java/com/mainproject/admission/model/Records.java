package com.mainproject.admission.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="records")
public class Records {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private int id;
    @Column(name="email")
    private String email;
    @Column(name="patientname")
    private String name;
    @Column(name="age")
    private int age;
    @Column(name="mobile")
    private String mobile;
    @Column(name="city")
    private String city;
    @Column(name="admissiondate")
    private String admissiondate;
    @Column(name="slot")
    private String slot;
    @Column(name="review")
    private int review;
    @Column(name="comments")
    private String comment;
    @Column(name="status")
    private String status;

    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getEmail(){
        return email;
    }
    public void setEmail(String email){
        this.email = email;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public int getAge() {
        return age;
    }
    public void setAge(int age) {
        this.age = age;
    }
    public String getMobile() {
        return mobile;
    }
    public void setMobile(String mobile) {
        this.mobile = mobile;
    }
    public String getCity() {
        return city;
    }
    public void setCity(String city) {
        this.city = city;
    }
    public String getAdmissiondate() {
        return admissiondate;
    }
    public void setAdmissiondate(String admissiondate) {
        this.admissiondate = admissiondate;
    }
    public String getSlot() {
        return slot;
    }
    public void setSlot(String slot) {
        this.slot = slot;
    }
    public int getReview() {
        return review;
    }
    public void setReview(int review) {
        this.review = review;
    }
    public void setComment(String comment){
        this.comment = comment;
    }
    public String getComment(){
        return comment;
    }

    
}
