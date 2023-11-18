package com.bezkoder.springjwt.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Course implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Long id_course ;
    private String courstitel ;
    private String description ;
    private Long prix;
    private Long duree ;
    private String niveaux ;
    private String lien_youtube;
    private Long module ;
    private String langue ;
    private String imagecour;
    Long filepdf;
  //  private File file;

    @OneToMany(mappedBy = "course")
    private Set<Session> sessionSet;

@OneToMany(mappedBy="tests")
private Set<Certif_test> certifs;
   // @OneToMany(mappedBy = "cours")
   // private Set<inscriptioncour> inscrit;

}
