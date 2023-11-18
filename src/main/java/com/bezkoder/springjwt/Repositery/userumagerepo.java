package com.bezkoder.springjwt.Repositery;

import com.bezkoder.springjwt.models.imageuser;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface userumagerepo extends CrudRepository<imageuser,Long> {
    @Query(value = "select id from image_table ORDER BY id DESC LIMIT 1", nativeQuery=true)
    Long idlastimg();
}
