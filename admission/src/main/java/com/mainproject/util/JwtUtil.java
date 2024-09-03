package com.mainproject.util;

import java.util.Date;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtUtil {

    private String SECRET_KEY = "JkdHGDlwJhndm_kuen9038$%$@8399KGJjkdJK";
    private String ISSUER = "auth.springjwt.com";
    public String generateToken(String username, String userType){

        // Date issuedAt = new Date();
        // Claims claims = Jwts.claims().setIssuer(username).setIssuedAt(issuedAt).setExpiration(new Date(System.currentTimeMillis() * 1000 * 60 * 60));
        // claims.put("userType", userType);

        // return Jwts.builder().setClaims(claims).signWith(SignatureAlgorithm.HS512, SECRET_KEY).compact();

        System.out.println(username + " "+ userType);

        Claims claims = Jwts.claims().setSubject(username);
        claims.put("userType", userType); // Add userType to the token claims

        return Jwts.builder()
                .setClaims(claims)
                .setIssuer(ISSUER)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() * 1000 * 60 * 60))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
        
    }

    public String extractUserName(String token){
        final Claims claims = extractallClaims(token);
        return claims.getIssuer();
    }

    public String extractUserType(String token) {
        Claims claims = Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
        return claims.get("userType", String.class);
    }

    public Claims extractallClaims(String token){
        return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token);
            System.out.println(extractallClaims(token));
            return true;
        } catch (Exception e) {
            System.out.println(e);
            return false;
        }
    }

    // public Claims validateToken(String token) {
    //     System.out.println(token);
    //     return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
    // }

    // public Boolean authValidation(String token){
    //     try {
    //     // Validate the token
    //     Claims claims = validateToken(token);
    //     System.out.println("Token is valid. Claims: " + claims);
    //     } catch (io.jsonwebtoken.ExpiredJwtException e) {
    //         System.out.println("JWT token is expired");
    //         return false;
    //     } catch (Exception e) {
    //         System.out.println(e + "Invalid JWT token");
    //         return false;
    //     }

    //     return true;
    //  }
}

