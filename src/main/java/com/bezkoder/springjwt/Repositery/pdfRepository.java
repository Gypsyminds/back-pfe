package com.bezkoder.springjwt.Repositery;

import com.bezkoder.springjwt.models.File;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface pdfRepository extends CrudRepository<File,Long> {
  //  SELECT id FROM file ORDER BY id DESC LIMIT 1;
  @Query(value = " select id from file ORDER BY id DESC LIMIT 1", nativeQuery=true)
  Long idlastf();
}
