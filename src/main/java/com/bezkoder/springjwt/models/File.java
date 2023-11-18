package com.bezkoder.springjwt.models;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;

@Entity
//@Table(name="image_model")
@AllArgsConstructor
@Data
@NoArgsConstructor
@ToString
public class File implements Serializable  {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")

    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "type")
    private String type;

    @Lob
    @Column(name = "pic")
    private byte[] pic;

    //Custom Construtor
    public File(String name, String type, byte[] pic) {
        this.name = name;
        this.type = type;
        this.pic = pic;
    }
    private String url;


}
