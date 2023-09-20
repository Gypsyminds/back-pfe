package com.bezkoder.springjwt.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Blob;
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
  //  private File file;
    @OneToMany(mappedBy = "course")
    private Set<Session> sessionSet;


    public Course(String fileName, String contentType, byte[] bytes) {
    }
}
