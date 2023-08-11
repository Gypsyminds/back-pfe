package com.bezkoder.springjwt.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.Set;


@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Session implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_session ;
    private String link ;
    private Date date_session ;
    private Date time_session ;


    @OneToMany(mappedBy = "session")
    private Set<List_condidat> LIST;

    @ManyToOne
    Profe profe;

    @ManyToOne
    Course course;
}
