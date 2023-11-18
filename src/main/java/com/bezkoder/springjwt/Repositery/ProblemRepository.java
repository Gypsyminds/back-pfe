package com.bezkoder.springjwt.Repositery;

import com.bezkoder.springjwt.models.Problem;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProblemRepository extends CrudRepository<Problem,Long> {
    @Query(value="select count(*) from problem l where l.id_pr= :id_pr",nativeQuery=true)
      long nb_prob(@Param("id_pr") long id_pr);

    @Query(value = "select * from problem where certif_id_test= :certif_id_test  ORDER BY RAND() LIMIT 3", nativeQuery=true)
    List<Problem> findRandom(@Param("certif_id_test") long certif_id_test);

}
