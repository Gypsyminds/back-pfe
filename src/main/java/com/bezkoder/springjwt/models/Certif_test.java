package com.bezkoder.springjwt.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Certif_test implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Long id_test ;
    private String test_title ;
    private Long numero_qcm;

    @OneToMany(mappedBy = "certif_test")
    private Set<Certification> certificationSet;

    @OneToMany(mappedBy = "certif_tes")
   private Set<Problem>  prob ;


    @OneToMany(mappedBy = "certif")
    @JsonIgnore
    private Set<Question_qcm> certif_testSet;

}
