package com.bezkoder.springjwt.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Question_qcm implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
   private Long id_qs_qcm;
   private String question ;


   private Reponse1 rep1 ;

   private Reponse2  rep2 ;

   private Reponse3 rep3 ;

   private Reponse4 rep4 ;

   private Long score ;

@ManyToOne
@JsonIgnore
 Certif_test  certif ;
}
