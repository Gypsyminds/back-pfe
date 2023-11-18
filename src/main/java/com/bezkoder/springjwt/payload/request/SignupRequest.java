package com.bezkoder.springjwt.payload.request;

import java.util.Date;
import java.util.Set;

import jakarta.validation.constraints.*;

public class SignupRequest {
  @NotBlank
  @Size(min = 3, max = 20)
  private String username;

  @NotBlank
  @Size(max = 50)
  @Email
  private String email;

  private String country;
  private Date birth_date;
  private Set<String> role;

  @NotBlank
  @Size(min = 6, max = 40)
  private String password;

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public Set<String> getRole() {
    return this.role;
  }

  public void setRole(Set<String> role) {
    this.role = role;
  }
  public String getCountry(){return country ;}
  public void setCountry(String country){this.country = country;}
  public Date getBirth_date(){return this.birth_date = birth_date;}
  public void setBirth_date(Date birth_date){this.birth_date =birth_date;}
}
