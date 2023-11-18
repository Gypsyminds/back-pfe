package com.bezkoder.springjwt.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
public class User  implements Serializable {
  private static final long serialVersionUID = 1L;
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id_condidat;
  private Date birth_date ;
  private String country ;
  private String name;
  private String type;

  private Long image ;
  @NotBlank
  @Size(max = 20)
  private String username;

  @NotBlank
  @Size(max = 50)
  @Email
  private String email;

  @NotBlank
  @Size(max = 120)
  private String password;

  @ManyToMany(fetch = FetchType.LAZY)
  @JoinTable(  name = "user_roles",
          joinColumns = @JoinColumn(name = "user_id"),
          inverseJoinColumns = @JoinColumn(name = "role_id"))
  private Set<Role> roles = new HashSet<>();

  @OneToMany(mappedBy = "condidat")
  private Set<Certification> certification;


  public User() {
  }

  public User(String username, String email, String password,String country , Date birth_date) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.country = country ;
    this.birth_date = birth_date;
  }

  public User(String username, String email, String encode) {
  }

  public Long getId() {
    return id_condidat;
  }

  public void setId(Long id_condidat) {
    this.id_condidat = id_condidat;
  }

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
  public Date getBirth_date(){ return birth_date;}
  public void setBirth_date(Date birth_date){this.birth_date = birth_date;}
  public void setPassword(String password) {
    this.password = password;
  }

  public Set<Role> getRoles() {
    return roles;
  }

  public void setRoles(Set<Role> roles) {
    this.roles = roles;
  }

}
