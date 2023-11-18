package com.bezkoder.springjwt.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Certification implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_certif;
    private String certif_title ;
    private String description;
    private Long score ;
    private String nomuser;

    @ManyToOne
    @JsonIgnore
    Certif_test certif_test;
    @ManyToOne
    @JsonIgnore
    User condidat ;

}
