package com.bezkoder.springjwt.Repositery;

import com.bezkoder.springjwt.models.Profe;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfeRepository extends CrudRepository<Profe,Long> {
    @Query(value = "select count(*) from profe;", nativeQuery=true)
    int nubprofs();
}
