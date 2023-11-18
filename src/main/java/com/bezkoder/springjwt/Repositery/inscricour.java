package com.bezkoder.springjwt.Repositery;

import com.bezkoder.springjwt.models.inscriptioncour;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface inscricour extends CrudRepository<inscriptioncour,Long> {
   // SELECT idinscri FROM inscriptioncour ORDER BY idinscri DESC LIMIT 1;

    @Query(value="select * from inscriptioncour order by idinscri desc limit 1",nativeQuery=true)
    inscriptioncour idinscitcour();

    @Query(value="select  cours_id_course from inscriptioncour where user= :user",nativeQuery = true)
    List<Long> CourIds(@Param("user") long user);
}
